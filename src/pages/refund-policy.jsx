import Head from 'next/head'
import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";

const RefundPolicy = () => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setContentIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current)

    if (contentIsVisible) {
      document.querySelector(".page-content").style = "opacity: 1;"
    }
    else {
      document.querySelector(".page-content").style = "opacity: 0;"
    }
  }, [contentIsVisible])

  return (
    <>
      <Layout>
        <Head>
          <title>Refund Policy | Art by Abby</title>
        </Head>
        <main ref={myRef} className='page-content'>

          <div className="body-color" style={{ paddingTop: `100px` }}>

            <br />
            <br />
            <br />
            <br />
          </div>

        </main>
      </Layout >
    </>
  )
}

export default RefundPolicy;