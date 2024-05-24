import { Input } from '@/components/ui/input'
import { H1 } from '../components/typography'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <div className="flex flex-col md:flex-row items-center grow">
      <div className="basis-1/2">
        <H1 className="mb-6">Contact</H1>
        <p>
          Let us know your property requirements and a member of the team will
          be in touch.
        </p>
      </div>
      <div className="basis-1/2">
        <div className="flex flex-col gap-4 w-[60%]">
          <Input name="name" placeholder="Name" type="text" />
          <Input name="email" placeholder="Email" type="email" />
          <Input name="phone" placeholder="Phone" type="tel" />
          <Textarea name="message" placeholder="Enter your message..." />
          <Button type="submit" disabled>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
