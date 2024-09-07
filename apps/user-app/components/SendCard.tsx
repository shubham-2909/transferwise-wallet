'use client'

import { p2pTransfer } from '@/lib/actions/p2pTransfer'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { Center } from '@repo/ui/center'
import { TextInput } from '@repo/ui/text-input'
import { useState } from 'react'

export function SendCard() {
  const [amount, setAmount] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={'Phone No.'}
              label="Number"
              onChange={(value) => {
                setPhoneNumber(value)
              }}
            />
            <TextInput
              placeholder={'Amount'}
              label="Amount"
              onChange={(value) => {
                setAmount(Number(value))
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2pTransfer(amount * 100, phoneNumber)
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  )
}
