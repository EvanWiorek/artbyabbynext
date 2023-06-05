import Head from 'next/head'
import Layout from '@/components/layout'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useState, useRef, useMemo, useEffect } from 'react'

export default function Home() {
  const targetRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = entries => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: `0px`,
      threshold: 0.3
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const currentTarget = targetRef.current;
    if(currentTarget) {
      observer.observe(currentTarget); 
    };

    if(isVisible) {
      document.querySelector(".logo-img").style = "transform: scale(.7);"
    }
    else if(!isVisible) {
      document.querySelector(".logo-img").style = "transform: scale(1);"
    }

    return () => {
      if(currentTarget) {
        observer.unobserve(currentTarget); 
      }
    }
  }, [targetRef, options])

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
              <h1 ref={targetRef}>TEST</h1>
            </div>
          </ParallaxLayer>

        </Parallax>
      </main>
    </Layout>
  )
}
