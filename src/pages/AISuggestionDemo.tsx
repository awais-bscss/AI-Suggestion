import * as React from 'react'
import { AISuggestion } from '../components/ai/AISuggestion'

const mockSuggestions = [
  'Refactored data synchronization layer to leverage optimistic UI updates with automatic rollback on network failure.',
  'Implemented intelligent debounce algorithm reducing search API load by 68% during rapid keystroke intervals.',
  'Migrated authentication token storage to httpOnly secure session cookies to mitigate cross-site scripting exposure.',
  'Enhanced responsive table component with virtualized scrolling for rendering datasets up to 100,000 rows at 60fps.',
]

interface DemoCardProps {
  title: string
  description: string
  suggestionTitle: string
  generate: () => Promise<string>
}

function DemoCard({ title, description, suggestionTitle, generate }: DemoCardProps): React.ReactElement {
  const [lastAction, setLastAction] = React.useState<string | null>(null)

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <p className="text-[15px] text-text-secondary mt-1 leading-relaxed">{description}</p>
      </div>

      <AISuggestion
        title={suggestionTitle}
        generate={generate}
        onAccept={(text) => setLastAction(`Accepted: "${text}"`)}
        onReject={() => setLastAction('Rejected')}
      />

      <div className="text-sm text-text-muted font-mono px-0.5">
        {lastAction ? (
          <span className="text-text-secondary">{lastAction}</span>
        ) : (
          <span>No action taken yet.</span>
        )}
      </div>
    </section>
  )
}

export const AISuggestionDemo: React.FC = () => {
  const counterRef = React.useRef<number>(0)

  const generateSuccess = React.useCallback(async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 750))
    const text = mockSuggestions[counterRef.current % mockSuggestions.length]
    counterRef.current += 1
    return text
  }, [])

  const generateFailure = React.useCallback(async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 750))
    throw new Error('Inference request failed: upstream service connection timed out (504 Gateway Timeout).')
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <DemoCard
        title="Example 1: Dynamic Suggestions (Succeeds)"
        description="Generates a new suggestion on each call. Test the preview, edit, accept, reject, and regenerate flows."
        suggestionTitle="Copilot Code Assistant"
        generate={generateSuccess}
      />

      <DemoCard
        title="Example 2: Error Handling (Fails)"
        description="Simulates network/inference failure. Test the error alert, role=&quot;alert&quot;, and retry behavior."
        suggestionTitle="Document Summarizer (Simulated Failure)"
        generate={generateFailure}
      />
    </div>
  )
}
