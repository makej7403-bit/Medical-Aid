import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Medical Aid</title>
        <meta name="description" content="Medical Aid — your trusted health companion" />
      </Head>
      <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
