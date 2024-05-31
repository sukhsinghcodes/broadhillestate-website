import { Input } from '@/components/ui/input'
import { H1 } from '../components/typography'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectResetButton } from '../components/select-reset-button'

export default function Contact() {
  return (
    <div className="flex flex-col md:flex-row items-center grow p-4 md:p-8 gap-8">
      <div className="w-full basis-1/2">
        <H1 className="mb-6">Contact</H1>
        <p>
          Let us know your property requirements and a member of the team will
          be in touch.
        </p>
      </div>
      <div className="w-full basis-1/2">
        <div className="flex flex-col gap-4 items-stretch">
          <Input name="name" placeholder="Name" type="text" />
          <Input name="email" placeholder="Email" type="email" />
          <Input name="phone" placeholder="Phone" type="tel" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="viewing">Arrange a viewing</SelectItem>
                <SelectItem value="valuation">Book a valuation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea
            name="message"
            placeholder="Enter your message..."
            className="min-h-[150px]"
          />
          <Button type="submit" disabled>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
