'use client'

interface InputProps {
  label: string
  type: string
  placeholder: string
  onChange: (_value: string) => void
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2'>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className='shadow appearance-none border rounded w-full block py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-purple-500 focus:border-purple-500 '
      />
    </div>
  )
}
