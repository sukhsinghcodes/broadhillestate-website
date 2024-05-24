import { Button } from '@/components/ui/button'

export type SelectResetButtonProps = {
  setFn: (value: string) => void
}

export function SelectResetButton({ setFn }: SelectResetButtonProps) {
  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={(e) => {
        e.stopPropagation()
        setFn('')
      }}
      type="reset"
    >
      Clear
    </Button>
  )
}
