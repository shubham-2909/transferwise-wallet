'use client'
import React, { useState } from 'react'
import { Input } from '@repo/ui/text-input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
export default function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleEmailChange = (value: string) => {
    setPhone(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = await signIn('credentials', {
      phone,
      password,
      redirect: false, // Prevents auto-redirect
    })
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Signed in successfully')
      router.push('/dashboard')
    }
  }
  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-lg h-max'>
        <form
          className='bg-white shadow-md rounded p-10 mb-4'
          onSubmit={handleSubmit}
        >
          <h2
            className='text-center text-purple-600 font-normal text-2xl mb-6'
            style={{ fontFamily: 'sans-serif' }}
          >
            Transferwise
          </h2>

          <h2
            className='text-center font-semibold text-2xl mb-6'
            style={{ fontFamily: 'sans-serif' }}
          >
            Login
          </h2>

          <Input
            label='Email, mobile, or username'
            type='text'
            placeholder='Enter mobile'
            onChange={handleEmailChange}
          />

          <Input
            label='Password'
            type='password'
            placeholder='Enter your password'
            onChange={handlePasswordChange}
          />

          <button className='bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-8'>
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
