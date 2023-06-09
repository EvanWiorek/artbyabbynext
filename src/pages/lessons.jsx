import Head from 'next/head'
import Layout from '../components/Layout'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';

const Lessons = () => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const [allLessons, setAllLessons] = useState([]);

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

    //get all posts
    axios.get('/api/get/allposts').then((res) => {
      setAllLessons(res.data);
      console.log(res);
    })
  }, [contentIsVisible])

  const getTrueURL = (videoURL) => {
    if (videoURL.length > 28) {
      const stepOne = videoURL.split("v=")[1];
      const stepTwo = stepOne.split("&")[0]
      return stepTwo;
    }
    else {
      const stepOne = videoURL.split("e/")[1];
      return stepOne;
    }
  }

  return (
    <Layout home>
      <Head>
        <title>Virtual Art Lessons | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>

        <div className="body-color" style={{ paddingTop: `100px` }}>
          <h1 className='text-center mt-3 mb-0 site-font'>Virtual Art Lessons</h1>
          <br />
          <div className="lesson-post-list col-7 m-auto">

            {allLessons.map((lesson) => (
              <div key={lesson._id} className='m-auto mt-3'>
                  <div className="d-flex gap-3 card-body">
                    <img src={`http://img.youtube.com/vi/${getTrueURL(lesson.videoURL)}/0.jpg`} alt="Thumbnail" />
                    <div>
                      <h5 className='site-font'>                          <Link href={`/lessons/${lesson._id}`}>{lesson.postTitle}</Link></h5>
                      <div className='d-flex gap-2 text-secondary site-font'>
                        <p>{dayjs(lesson.createdAt).format('MMMM D, YYYY')}</p>
                        <p>•</p>
                        <p>By Abby</p>
                      </div>
                      <p>{lesson.postContent.slice(0, 200)}...</p>
                      <div className="d-flex justify-content-end">
                        <div className="d-flex flex-column align-items-center read-more">
                          <Link href={`/lessons/${lesson._id}`} style={{ fontSize: `.8rem` }}>R E A D &nbsp; M O R E</Link>
                          <div className="read-more-line"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                <div className="horizontal-line-dark"></div>
                </div>
            ))}
                {/* <div className="horizontal-line-dark"></div> */}
                <br />
              </div>
        </div>

      </main>
    </Layout >
  )

}

export default Lessons;