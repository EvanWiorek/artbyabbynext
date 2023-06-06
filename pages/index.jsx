import Head from 'next/head'
import Layout from '@/components/Layout'
import { useState, useRef, useMemo, useEffect } from 'react';
import $ from "jquery";
import HeaderOne from '../components/HeaderOne'


export default function Home() {

  useEffect(() => {
    let elems

    if (typeof window !== 'undefined') {
      const M = require('materialize-css');
      elems = document.querySelectorAll('.parallax');
      M.Parallax.init(elems);
    }

  }, [])

  return (
    <Layout home>
      <Head>
        <title>Art By Abby | Home</title>
      </Head>
      <main>
        <div className="navbar-white"></div>

        <HeaderOne />

        <div className="body-white border-on-top">
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
