import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

declare type globalThis = any
declare var global: any
var global: any;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
