import Head from 'next/head'
import Layout from '@/components/Layout'
import { useState, useRef, useMemo, useEffect } from 'react';


export default function Home() {
  const myRef = useRef();
  const [isVisible, setIsVisible] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current)
  }, [isVisible])



  return (
    <Layout isVisible={isVisible} setIsVisible={setIsVisible}>
      <Head>
        <title>Home | Art by Abby</title>
      </Head>
      <main>
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
