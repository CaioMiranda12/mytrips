'use client'

import clsx from 'clsx'

type TabItem<T extends string> = {
  key: T
  label: string
  badge?: number
  disabled?: boolean
}

type TabsProps<T extends string> = {
  tabs: TabItem<T>[]
  activeTab: T
  onChange: (tab: T) => void
}

export function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
}: TabsProps<T>) {
  return (
    <div className="flex gap-2 border-b border-gray-200">
      {tabs.map(tab => {
        const isActive = tab.key === activeTab

        return (
          <button
            key={tab.key}
            disabled={tab.disabled}
            onClick={() => onChange(tab.key)}
            className={clsx(
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
              isActive
                ? 'border-cyan-500 text-cyan-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.label}

            {typeof tab.badge === 'number' && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
