'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EmailForm } from '../types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useMutation } from '@tanstack/react-query'
import { Spinner } from '../components/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { OctagonAlertIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().min(1, 'Email is required'),
  phone: z.string().regex(phoneRegex, 'Phone number is invalid'),
  reason: z.string().min(1, 'Reason is required'),
  message: z.string().min(1, 'Message is required'),
})

export type ContactFormProps = {
  onSuccess: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [error, setError] = useState<Error | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      reason: '',
      message: '',
    },
    mode: 'all',
  })

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['email'],
    mutationFn: async (data: EmailForm) => {
      setError(null)
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()

      if (result.error) {
        setError(new Error(result.error))
      } else {
        toast.success('Message sent')
        form.reset()
        form.resetField('reason')
        onSuccess()
      }
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    return await mutateAsync(data)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-stretch"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Phone" {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Looking to rent (tenant)">
                        Looking to rent (tenant)
                      </SelectItem>
                      <SelectItem value="Looking to rent (landlord)">
                        Looking to rent (landlord)
                      </SelectItem>
                      <SelectItem value="Looking to sell (book a valuation)">
                        Looking to sell (book a valuation)
                      </SelectItem>
                      <SelectItem value="Looking to buy">
                        Looking to buy a property
                      </SelectItem>
                      <SelectItem value="General enquiries">
                        General enquiries
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter your message..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <Alert variant="default">
            <OctagonAlertIcon className="h-4 w-4 stroke-red-600" />
            <AlertTitle className="text-red-600">Error</AlertTitle>
            <AlertDescription>Something went wrong</AlertDescription>
          </Alert>
        )}
        <Button type="submit" disabled={isPending}>
          Send {isPending && <Spinner className="ml-2" />}
        </Button>
      </form>
    </Form>
  )
}
