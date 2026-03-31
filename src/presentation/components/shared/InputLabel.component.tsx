import { useId, type ComponentProps } from "react"

import { Input } from "@/presentation/components/ui/input"
import { Label } from "@/presentation/components/ui/label"

type InputLabelComponentProps = ComponentProps<typeof Input> & {
  errorMessage?: string
  label?: string
}

export function InputLabelComponent({
  errorMessage,
  label,
  ref,
  id: idProp,
  ...props
}: InputLabelComponentProps) {
  const genId = useId()
  const id = idProp ?? genId
  const errorId = `${id}-error`

  return (
    <div>
      {label && (
        <Label htmlFor={id} className="mb-0.5 text-sm font-medium text-muted">
          {label}
        </Label>
      )}
      <Input
        ref={ref}
        {...props}
        id={id}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
      />
      {errorMessage && (
        <span id={errorId} role="alert" className="text-xs text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
