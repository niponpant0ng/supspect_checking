import Document, { Head, Main, NextScript } from 'next/document'
import Layout from "../components/Layout"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>

          <title>ระบบสถิติข้อมูลยานพาหนะย้อนหลัง</title>
        </head>
        <body>
          <Layout>
            <Main />
          </Layout>
          <NextScript />
        </body>
      </html>
    )
  }
}