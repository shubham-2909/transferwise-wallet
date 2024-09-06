type Props = {
  title: string
  children: React.ReactNode
}

export function Card({ title, children }: Props) {
  return (
    <div className="border p-4">
      <h1 className="text-xl border-b p-2 font-semibold tracking-tight">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  )
}
