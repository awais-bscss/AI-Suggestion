import * as React from 'react'
import { Sun, Moon } from 'lucide-react'
import { AISuggestionDemo } from './pages/AISuggestionDemo'

export default function App(): React.ReactElement {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false)

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-canvas text-text-primary font-sans">
      {/* Top Application Header */}
      <header className="border-b border-border-default bg-surface sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            AISuggestion
          </h1>

          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2 rounded-md border border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer"
          >
            {isDarkMode ? (
              <Moon size={18} aria-hidden="true" />
            ) : (
              <Sun size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8">
        <AISuggestionDemo />
      </main>
    </div>
  )
}
