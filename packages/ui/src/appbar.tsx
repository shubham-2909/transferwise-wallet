import Link from 'next/link'
import { useState } from 'react'

interface AppbarProps {
  user?: {
    name?: string | null
  }
  onSignin: () => Promise<void>
  onSignout: () => Promise<void>
}

// Icon components as plain JSX
const UserCircleIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-8 h-8 text-gray-600'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.5 18a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V18z'
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-5 h-5 text-gray-600'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
    />
  </svg>
)

const LogoutIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-5 h-5 text-red-600'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12h-6m3 3l3-3m-3-3l3 3'
    />
  </svg>
)

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='flex justify-between border-b px-4'>
      <Link
        href={`/`}
        className='text-3xl text-[#6a51a6] flex flex-col justify-center font-bold px-2 py-3'
      >
        TransferWise
      </Link>
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='flex items-center space-x-2 focus:outline-none'
          >
            <UserCircleIcon />
            <ChevronDownIcon />
          </button>

          {isOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
              <div className='py-1'>
                <div className='px-4 py-2 text-sm text-gray-700 flex items-center'>
                  <span>Logged in as</span>
                  <span className='ml-2 font-bold'>{user?.name}</span>
                </div>
                <button
                  onClick={onSignout}
                  className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  <LogoutIcon />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
