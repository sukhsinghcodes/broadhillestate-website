'use client'

import { useState } from 'react'
import { H1 } from '../components/typography'
import { ContactForm } from './contact-form'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { SendIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false)

  return (
    <div className="flex flex-col md:flex-row items-center grow p-4 md:p-8 gap-8 container max-w-screen-lg">
      <div className="w-full basis-1/2">
        <H1 className="mb-6">Contact</H1>
        <p>
          Let us know your property requirements and a member of the team will
          be in touch.
        </p>
      </div>
      <div className="w-full basis-1/2">
        {isSuccess ? (
          <Alert variant="default">
            <SendIcon className="h-4 w-4 stroke-green-600" />
            <AlertTitle>Sent</AlertTitle>
            <AlertDescription>
              We will get back to you shortly.
            </AlertDescription>
            <Button variant="link" onClick={() => setIsSuccess(false)}>
              Send another
            </Button>
          </Alert>
        ) : (
          <ContactForm onSuccess={() => setIsSuccess(true)} />
        )}
      </div>
    </div>
  )
}
