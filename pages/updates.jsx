import Head from 'next/head'
import Layout from '@/components/Layout'

const Updates = () => {

  return (
    <Layout home>
      <Head>
        <title>Updates & News | Art by Abby</title>
      </Head>
      <main>

        <div className="body-white" style={{ paddingTop: `100px` }}>
          <h1>News & Updates</h1>
        </div>

      </main>
    </Layout >
  )

}

export default Updates;