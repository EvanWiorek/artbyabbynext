import Head from 'next/head'
import Layout from '@/components/Layout'

const allproducts = () => {

  return (
    <Layout home>
      <Head>
        <title>All Products | Art by Abby</title>
      </Head>
      <main>

        <div className="body-white" style={{ paddingTop: `100px` }}>
          <h1>All Products</h1>
        </div>
        
      </main>
    </Layout >
  )

}

export default allproducts;