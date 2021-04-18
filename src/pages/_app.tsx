import Head from 'next/head'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS Boilerplate With TailwindCSS</title>
        <link rel="shortcut icon" href="/tailwindcss.png" />
        <link rel="apple-touch-icon" href="/tailwindcss.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="NextJS Boilerplate with TailwindCSS"
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
