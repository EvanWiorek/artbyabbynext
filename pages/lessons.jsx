import Head from 'next/head'
import Layout from '@/components/Layout'

const Lessons = () => {

  return (
    <Layout home>
      <Head>
        <title>Virtual Art Lessons | Art by Abby</title>
      </Head>
      <main>

        <div className="body-white" style={{ paddingTop: `100px` }}>
          <h1>Virtual Art Lessons</h1>
        </div>

      </main>
    </Layout >
  )

}

export default Lessons;