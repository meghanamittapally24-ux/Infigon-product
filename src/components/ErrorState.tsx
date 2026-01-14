interface Props {
  message: string
}

export default function ErrorState({ message }: Props) {
  return (
    <p className="text-center text-red-600 py-6">{message}</p>
  )
}
