import { Button } from './button'

interface AppbarProps {
  user?: {
    name?: string | null
  }
  // TODO: can u figure out what the type should be here?
  onSignin: any
  onSignout: any
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-3xl text-[#6a51a6] flex flex-col justify-center font-bold px-2">
        TransferWise
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  )
}
