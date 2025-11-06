'use client'

import { Plus, X } from 'lucide-react'
import { useMintStore } from '@/stores/mintStore'

export function AttributeEditor() {
  const { attributes, addAttribute, removeAttribute, updateAttribute } = useMintStore()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-semibold text-gray-200">
          Attributes
        </label>
        <button
          onClick={addAttribute}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Attribute
        </button>
      </div>

      <div className="space-y-3">
        {attributes.length === 0 ? (
          <div className="text-center py-8 glass rounded-xl">
            <p className="text-gray-400">No attributes yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Click "Add Attribute" to get started
            </p>
          </div>
        ) : (
          attributes.map((attr, index) => (
            <div
              key={index}
              className="glass-strong rounded-xl p-4 flex gap-3 items-start"
            >
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Trait (e.g. Background)"
                  value={attr.trait_type}
                  onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                  className="input-primary"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. Purple)"
                  value={attr.value}
                  onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                  className="input-primary"
                />
              </div>
              
              <button
                onClick={() => removeAttribute(index)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {attributes.length > 0 && (
        <p className="text-xs text-gray-500 mt-3">
          {attributes.length} attribute{attributes.length !== 1 ? 's' : ''} added
        </p>
      )}
    </div>
  )
}