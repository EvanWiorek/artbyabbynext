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

    if (isVisible) {
      document.querySelector(".logo-img").style = "width: 200px; margin-top: 0;"
      document.querySelector(".abby-name").style = "font-size: 1rem;"
    }
    else {
      document.querySelector(".logo-img").style = "width: 130px;"
      document.querySelector(".abby-name").style = "font-size: .6rem; margin-bottom: 4px;"
    }
  }, [isVisible])

  console.log(isVisible);



  return (
    <Layout home>
      <Head>
        <title>Home | Art by Abby</title>
      </Head>
      <main>
        <div className="navbar-white"></div>

        <div className="parallax-container" ref={myRef}>
          <video src="/static/videos/header-one.mp4" autoPlay muted loop controls></video>
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
          <div>
            <h1>TEST</h1>
          </div>

        </div>

      </main>
    </Layout >
  )
}
