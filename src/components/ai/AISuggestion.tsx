import * as React from 'react'
import {
  Sparkles,
  Check,
  X,
  RefreshCw,
  Pencil,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from '../primitives/Button'
import { Textarea } from '../primitives/Textarea'
import { Spinner } from '../primitives/Spinner'
import { Card } from '../composites/Card'
import { Alert } from '../composites/Alert'

export type AISuggestionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; text: string }
  | { status: 'editing'; originalText: string; draftText: string }
  | { status: 'error'; errorMessage: string }

export interface AISuggestionProps {
  generate: () => Promise<string>
  onAccept: (text: string) => void
  onReject: () => void
  title?: string
  className?: string
}

export const AISuggestion: React.FC<AISuggestionProps> = ({
  generate,
  onAccept,
  onReject,
  title = 'AI Suggestion',
  className,
}) => {
  const [state, setState] = React.useState<AISuggestionState>({ status: 'idle' })

  // Focus management refs
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const editButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const generateButtonRef = React.useRef<HTMLButtonElement | null>(null)

  // Focus textarea when entering editing mode
  React.useEffect(() => {
    if (state.status === 'editing') {
      const timer = setTimeout(() => {
        textareaRef.current?.focus()
        textareaRef.current?.select()
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [state.status])

  const handleGenerate = async () => {
    setState({ status: 'loading' })
    try {
      const result = await generate()
      setState({ status: 'ready', text: result })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate suggestion'
      setState({ status: 'error', errorMessage: message })
    }
  }

  const handleAccept = (textToAccept: string) => {
    onAccept(textToAccept)
    setState({ status: 'idle' })
    setTimeout(() => {
      generateButtonRef.current?.focus()
    }, 10)
  }

  const handleReject = () => {
    onReject()
    setState({ status: 'idle' })
    setTimeout(() => {
      generateButtonRef.current?.focus()
    }, 10)
  }

  const handleStartEdit = (currentText: string) => {
    setState({
      status: 'editing',
      originalText: currentText,
      draftText: currentText,
    })
  }

  const handleCancelEdit = (originalText: string) => {
    setState({ status: 'ready', text: originalText })
    setTimeout(() => {
      editButtonRef.current?.focus()
    }, 10)
  }

  return (
    <Card className={cn('relative w-full border border-border-default shadow-xs transition-all', className)}>
      <Card.Header>
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-subtle text-accent-text border border-accent-muted">
            <Sparkles size={15} aria-hidden="true" />
          </div>
          <Card.Title>{title}</Card.Title>
        </div>

        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-md text-[13px] font-medium tracking-wide uppercase border select-none',
            state.status === 'idle'
              ? 'bg-surface-subtle text-text-muted border-border-default'
              : state.status === 'loading'
              ? 'bg-accent-subtle text-accent-text border-accent-muted'
              : state.status === 'ready'
              ? 'bg-success-subtle text-success border-success/30'
              : state.status === 'editing'
              ? 'bg-warning-subtle text-warning border-warning/30'
              : 'bg-destructive-subtle text-destructive border-destructive/30',
          )}
        >
          {state.status}
        </span>
      </Card.Header>

      <Card.Body>
        {state.status === 'idle' && (
          <div className="flex flex-col items-start gap-4">
            <p className="text-[15px] text-text-secondary leading-relaxed">
              Generate intelligent suggestions using the configured prompt or model parameters. Click below to begin.
            </p>
            <Button
              ref={generateButtonRef}
              variant="primary"
              size="md"
              onClick={handleGenerate}
              leftIcon={<Sparkles size={15} aria-hidden="true" />}
            >
              Generate Suggestion
            </Button>
          </div>
        )}

        {state.status === 'loading' && (
          <div
            aria-live="polite"
            className="flex flex-col items-center justify-center gap-3 py-6 text-center"
          >
            <div className="sr-only">Generating suggestion, please wait...</div>
            <Spinner size="lg" variant="accent" label="Generating suggestion" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-text-primary">Generating suggestion...</p>
              <p className="text-sm text-text-muted">Formulating recommendations from context</p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="secondary" size="sm" disabled>
                Accept
              </Button>
              <Button variant="outline" size="sm" disabled>
                Edit
              </Button>
              <Button variant="ghost" size="sm" disabled>
                Reject
              </Button>
            </div>
          </div>
        )}

        {state.status === 'ready' && (
          <div className="space-y-4">
            <div
              tabIndex={0}
              aria-label="Suggestion preview"
              className="rounded-md border border-border-default bg-surface-subtle p-3.5 text-[15px] text-text-primary leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
            >
              <div className="text-[13px] font-medium uppercase tracking-wider text-text-muted mb-1.5 select-none">
                Preview
              </div>
              <p className="whitespace-pre-wrap">{state.text}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border-subtle">
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAccept(state.text)}
                  leftIcon={<Check size={14} aria-hidden="true" />}
                >
                  Accept
                </Button>

                <Button
                  ref={editButtonRef}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartEdit(state.text)}
                  leftIcon={<Pencil size={13} aria-hidden="true" />}
                >
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReject}
                  leftIcon={<X size={14} aria-hidden="true" />}
                >
                  Reject
                </Button>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerate}
                leftIcon={<RefreshCw size={13} aria-hidden="true" />}
              >
                Regenerate
              </Button>
            </div>
          </div>
        )}

        {state.status === 'editing' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="ai-suggestion-edit-textarea"
                className="text-[13px] font-medium uppercase tracking-wider text-text-muted select-none"
              >
                Editing Suggestion
              </label>
              <Textarea
                ref={textareaRef}
                id="ai-suggestion-edit-textarea"
                rows={4}
                value={state.draftText}
                onChange={(e) =>
                  setState({
                    status: 'editing',
                    originalText: state.originalText,
                    draftText: e.target.value,
                  })
                }
                placeholder="Modify suggestion text..."
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCancelEdit(state.originalText)}
                leftIcon={<X size={13} aria-hidden="true" />}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAccept(state.draftText)}
                disabled={state.draftText.trim().length === 0}
                leftIcon={<Check size={14} aria-hidden="true" />}
              >
                Accept Edits
              </Button>
            </div>
          </div>
        )}

        {state.status === 'error' && (
          <div className="space-y-4">
            <Alert variant="destructive" title="Generation Error">
              {state.errorMessage}
            </Alert>

            <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setState({ status: 'idle' })}
              >
                Dismiss
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleGenerate}
                leftIcon={<RefreshCw size={13} aria-hidden="true" />}
              >
                Retry
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
