import { appWithTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import 'hover.css';
// dynamic(() =>
//   import('../node_modules/hover.css').then((mod) => mod.Hello)
// )

declare type globalThis = any
declare var global: any
var global: any;

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ req }: any) => {
  const deviceAgent = req?.headers["user-agent"];
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(deviceAgent)
  // console.log('deviceAgent123', deviceAgent);
  return { isMobile }
}

export default appWithTranslation(MyApp)
