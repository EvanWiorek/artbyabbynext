import Head from 'next/head'
import Layout from '@/components/Layout'
import { useState, useRef, useMemo, useEffect } from 'react';


export default function Home() {
  const myRef = useRef();
  const [headerIsVisible, setHeaderIsVisible] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setHeaderIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current)

    if(headerIsVisible) {
      document.querySelector(".page-content").style = "opacity: 1;"
    }
    else {
      document.querySelector(".page-content").style = "opacity: 0;"
    }
  }, [headerIsVisible])



  return (
    <Layout headerIsVisible={headerIsVisible}>
      <Head>
        <title>Home | Art by Abby</title>
      </Head>
      <main className='page-content'>
        <div className="navbar-white"></div>

        <div className="parallax-container" ref={myRef}>
          <video src="/static/videos/header-one.mp4" autoPlay muted loop></video>
        </div>

        <div className="body-white">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

      </main>
    </Layout >
  )
}
