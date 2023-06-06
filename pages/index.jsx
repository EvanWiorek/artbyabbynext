import Head from 'next/head'
import Layout from '@/components/layout'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useInView } from '@react-spring/web'
import { useState, useRef, useMemo, useEffect } from 'react'

export default function Home() {
  // const myRef = useRef(null);
  const [ref, inView] = useInView();

  useEffect(() => {
    // const observer = new IntersectionObserver((entries) => {
    //   const entry = entries[0];
    //   console.log('entry', entry);
    // })
    // return observer.observe(myRef.current);
  }, [])
  
  return (
    <Layout home>
      <Head>
        <title>Art By Abby | Home</title>
      </Head>
      <main>
        <Parallax pages={3}>
          <ParallaxLayer offset={0} speed={.4} factor={2}>
            <div className="hero-header"></div>
          </ParallaxLayer>

          <ParallaxLayer offset={.5}
            speed={0.05} className='text-center'>
            <h1 className='display-4'>Welcome to Art By Abby</h1>
          </ParallaxLayer>

          <ParallaxLayer offset={0} style={{ backgroundColor: `white`, height: `129px`, width: `110vw` }}>
          </ParallaxLayer>

          <ParallaxLayer offset={.9}
            speed={0.05}>
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

              <div ref={ref}>
                <h1>{inView ? 'Hello World' : 'TEST'}</h1>
              </div>
            </div>
          </ParallaxLayer>

        </Parallax>
      </main>
    </Layout>
  )
}
