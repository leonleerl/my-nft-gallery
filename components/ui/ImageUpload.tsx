'use client'

import { useCallback, useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: File | null
  onChange: (file: File | null) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // 处理文件选择
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB 限制
      alert('File size must be less than 10MB')
      return
    }

    onChange(file)
    
    // 创建预览
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [onChange])

  // 拖拽事件
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  // 文件输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  // 移除图片
  const handleRemove = () => {
    onChange(null)
    setPreview(null)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-200 mb-3">
        NFT Image *
      </label>
      
      {preview ? (
        // 预览状态
        <div className="relative aspect-square rounded-2xl overflow-hidden glass-strong group">
          <Image
            src={preview}
            alt="NFT Preview"
            fill
            className="object-cover"
          />
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleRemove}
              className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          {value && (
            <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-lg p-3">
              <p className="text-sm text-white truncate">{value.name}</p>
              <p className="text-xs text-gray-400">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      ) : (
        // 上传状态
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative aspect-square rounded-2xl border-2 border-dashed transition-all ${
            isDragging
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
              isDragging ? 'bg-purple-500' : 'bg-white/10'
            }`}>
              {isDragging ? (
                <Upload className="w-8 h-8 text-white" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            
            <p className="text-lg font-semibold text-white mb-2">
              {isDragging ? 'Drop your image here' : 'Upload NFT Image'}
            </p>
            
            <p className="text-sm text-gray-400 mb-4">
              Drag and drop or click to browse
            </p>
            
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  )
}