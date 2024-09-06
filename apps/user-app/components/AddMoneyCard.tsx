'use client'
import { createOnRampTransaction } from '@/lib/actions/createOnRampTxn'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { Select } from '@repo/ui/select'
import { TextInput } from '@repo/ui/text-input'
import { useState } from 'react'

const SUPPORTED_BANKS = [
  {
    name: 'HDFC Bank',
    redirectUrl: 'https://netbanking.hdfcbank.com',
  },
  {
    name: 'Axis Bank',
    redirectUrl: 'https://www.axisbank.com/',
  },
]
export function AddMoney() {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  )
  const [amount, setAmount] = useState(0)
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || '')
  return (
    <Card title="Add Money">
      <div className="w-full ">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(value) => {
            setAmount(Number(value))
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((bank) => bank.redirectUrl === value)
                ?.redirectUrl || ''
            )
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ''
            )
          }}
          options={SUPPORTED_BANKS.map((bank) => {
            return { key: bank.name, value: bank.name }
          })}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(amount * 100, provider)
              window.location.href = redirectUrl || ''
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  )
}
