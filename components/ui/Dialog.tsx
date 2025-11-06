'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title?: string
}

export function Dialog({ open, onOpenChange, children, title }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>

            {/* Content */}
            <DialogPrimitive.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.95, y: '-48%' }}
                animate={{ opacity: 1, scale: 1, y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, y: '-48%' }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative glass-strong rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto mx-4">
                  {title ? (
                    <DialogPrimitive.Title className="text-2xl font-bold text-white mb-6">
                      {title}
                    </DialogPrimitive.Title>
                  ) : (
                    <VisuallyHiddenPrimitive.Root>
                      <DialogPrimitive.Title>Dialog</DialogPrimitive.Title>
                    </VisuallyHiddenPrimitive.Root>
                  )}
                  {children}
                  
                  <DialogPrimitive.Close className="absolute right-6 top-6 rounded-lg p-2 hover:bg-white/10 transition-colors">
                    <X className="h-5 w-5 text-gray-400" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}