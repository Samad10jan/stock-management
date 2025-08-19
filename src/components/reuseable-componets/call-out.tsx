import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Callout } from "@radix-ui/themes"

export default function CallOutMessage({ message }: { message: string }) {
  if (!message || message.trim().length === 0) return null

  return (
    <Callout.Root variant="outline" mt="5">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  )
}
