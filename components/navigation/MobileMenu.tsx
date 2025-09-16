"use client"

import { useState, useEffect } from 'react'
import { X, ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLongPress } from '@/hooks/useLongPress'

interface NavItem {
  name: string
  href: string
  sections: { name: string; href: string }[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  pathname: string
}

export default function MobileMenu({ isOpen, onClose, navItems, pathname }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [frozenLinks, setFrozenLinks] = useState<Set<string>>(new Set())
  const [menuPosition, setMenuPosition] = useState<'left' | 'right'>('right')
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  const longPressHandlers = useLongPress((element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const tooltipText = element.getAttribute('data-tooltip') || ''
    setTooltip({
      text: tooltipText,
      x: rect.left + rect.width / 2,
      y: rect.bottom + 8
    })
  }, () => {
    setTooltip(null)
  })

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem('mobileMenuPosition') as 'left' | 'right'
    if (savedPosition) {
      setMenuPosition(savedPosition)
    }
  }, [])

  const togglePosition = () => {
    const newPosition = menuPosition === 'right' ? 'left' : 'right'
    setMenuPosition(newPosition)
    localStorage.setItem('mobileMenuPosition', newPosition)
  }

  const handleMainLinkClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault()
    
    if (frozenLinks.has(item.href)) return

    if (expandedItem === item.name) {
      // Second click - navigate
      setFrozenLinks(prev => new Set(prev).add(item.href))
      setTimeout(() => {
        onClose()
        window.location.href = item.href
      }, 100)
    } else {
      // First click - expand
      setExpandedItem(item.name)
    }
  }

  const handleSectionClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    
    if (frozenLinks.has(href)) return
    
    setFrozenLinks(prev => new Set(prev).add(href))
    setTimeout(() => {
      onClose()
      window.location.href = href
    }, 100)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFrozenLinks(new Set())
    }, 1000)
    return () => clearTimeout(timer)
  }, [frozenLinks])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`fixed top-0 ${menuPosition === 'right' ? 'right-0' : 'left-0'} h-full w-30  border-${menuPosition === 'right' ? 'l' : 'r'} z-50 lg:hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : menuPosition === 'right' ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          {/* <h2 className="text-lg font-semibold">Navigation</h2> */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePosition}
              {...longPressHandlers}
              data-tooltip="Toggle menu position between left and right"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              {...longPressHandlers}
              data-tooltip="Close navigation menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${frozenLinks.has(item.href) ? 'click-freeze' : ''} ${
                  pathname === item.href ? 'bg-accent' : ''
                }`}
                onClick={(e) => handleMainLinkClick(item, e)}
                {...longPressHandlers}
                data-tooltip={`Navigate to the ${item.name} page`}
              >
                {item.name}
              </Button>
              
              {expandedItem === item.name && item.sections.length > 0 && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.sections.map((section) => (
                    <Button
                      key={section.href}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start text-sm ${
                        frozenLinks.has(section.href) ? 'click-freeze' : ''
                      }`}
                      onClick={(e) => handleSectionClick(section.href, e)}
                      {...longPressHandlers}
                      data-tooltip={`Navigate to ${section.name} of the ${item.name} page`}
                    >
                      {section.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] bg-background border rounded-md shadow-lg px-2 py-1 text-sm pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  )
}
