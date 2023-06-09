import Head from 'next/head'
import Layout from '../components/Layout'

const Cart = () => {

  return (
    <Layout home>
      <Head>
        <title>Shopping Cart | Art by Abby</title>
      </Head>
      <main>

        <div className="body-white" style={{ paddingTop: `100px` }}>
          <h1>Shopping Cart</h1>
        </div>
        
      </main>
    </Layout >
  )

}

export default Cart;