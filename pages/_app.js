import React from 'react';
import Head from 'next/head'
import ProtectedRoutes from "../lib/ProtectedRoute";
import '../styles/globals.css'

export default function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>eyos connect 360</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <ProtectedRoutes router={router}>
        <Component {...pageProps} />
      </ProtectedRoutes>
    </>
  )
}



