import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import '../styles/globals.css'

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
