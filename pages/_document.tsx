import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getLocaleAttributes } from '@/constants/locales';

export default class SiteDocument extends Document {
  render() {
    const attributes = getLocaleAttributes(this.props.__NEXT_DATA__.locale);

    return (
      <Html lang={attributes.lang} dir={attributes.dir}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
