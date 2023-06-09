import Head from 'next/head'
import Layout from '../../components/Layout'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import dayjs from 'dayjs';

const OneLesson = ({ isVisible }) => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const [oneLesson, setOneLesson] = useState();
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

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

    const routeId = router.asPath.split("ns/")[1];
    // console.log(routeId);
    // console.log(router.asPath.split("ns/")[1]);

    // axios.get(`/api/get/onepost/${routeId}`, routeId).then((res) => {
    //   setOneLesson(res.data);
    //   setLoaded(true);
    // })
    axios.get('/api/get/allposts').then((res) => {
      const oneLesson = res.data.filter(lesson => lesson._id == routeId);
      // console.log(routeId);
      // console.log(oneLesson);
      setOneLesson(oneLesson[0]);
      setLoaded(true);
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

  const handleGoBack = () => {
    router.push("/lessons")
  }

  return (
    <Layout home isVisible={isVisible}>
      <Head>
        <title>All Products | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>



        <div className="body-white" style={{ paddingTop: `100px` }}>
          {loaded &&
            <div className='col-lg-5 m-auto mt-3 one-lesson-container'>
              <div className="links mb-3" style={{ marginLeft: `10px` }} onClick={handleGoBack}>
                <p><i class="bi bi-arrow-left" style={{ fontSize: `.9rem` }}></i> Back to Lessons</p>
              </div>
              <h2 className='site-font text-center'>{oneLesson.postTitle}</h2>
              <div className='d-flex gap-3 justify-content-center text-secondary site-font'>
                <p>By Abby</p>
                <p>|</p>
                <p>{dayjs(oneLesson.createdAt).format('MMMM D, YYYY')}</p>
              </div>
              <div className="d-flex justify-content-center">
                <iframe src={`https://www.youtube.com/embed/${getTrueURL(oneLesson.videoURL)}`} className='one-lesson-video'>
                </iframe>
              </div>
              <div className='post-content m-auto'>
                <p style={{ whiteSpace: `pre-wrap` }} className='mt-3 m-auto'>{oneLesson.postContent}</p>
              </div>
              <br />
            </div>}
        </div>

      </main>
    </Layout >
  )
}

export default OneLesson;