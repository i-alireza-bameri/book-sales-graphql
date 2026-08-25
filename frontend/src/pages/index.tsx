import { useQuery, gql } from '@apollo/client'

const HELLO_QUERY = gql`
  query {
    hello
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(HELLO_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Sales Store</h1>
      <p className="text-xl text-gray-600">{data?.hello}</p>
    </div>
  )
}
