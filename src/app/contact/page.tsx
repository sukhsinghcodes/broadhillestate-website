'use client'

import { Input } from '@/components/ui/input'
import { H1 } from '../components/typography'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useMutation } from '@tanstack/react-query'
import { Spinner } from '../components/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { OctagonAlertIcon } from 'lucide-react'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().min(1, 'Email is required'),
  phone: z.string().min(10, 'Phone number is invalid'),
  reason: z.string().min(1, 'Reason is required'),
  message: z.string().min(1, 'Message is required'),
})

export default function Contact() {
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
  })

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['email'],
    mutationFn: async (data: EmailForm) => {
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
      }
    },
  })

  console.log(error)

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    return await mutateAsync(data)
  }

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
                          <SelectItem value="viewing">
                            Arrange a viewing
                          </SelectItem>
                          <SelectItem value="valuation">
                            Book a valuation
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
              <Alert className="text-red-600" variant="default">
                <OctagonAlertIcon className="h-4 w-4 stroke-red-600" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={isPending}>
              Send {isPending && <Spinner className="ml-2" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
