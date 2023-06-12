import Head from 'next/head'
import Layout from '../../components/Layout'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export const getServerSideProps = async (context) => {
  const routeId = context.params.id
  try {
    // console.log(routeId, 'FROM [id].jsx PAGE');
    await connectMongoDB();
    const oneLesson = await AbbyPost.findOne({ _id: routeId });
    // console.log(oneLesson);
    return {
      props: {
        oneLesson: JSON.parse(JSON.stringify(oneLesson))
      }
    }
  }
  catch (err) {
    console.log(err);
    return {
      notFound: true
    }
  }
}
const OneLesson = ({ isVisible, oneLesson }) => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
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
    router.push("/updates")
  }

  return (
    <Layout home isVisible={isVisible}>
      <Head>
        <title>All Products | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>

        <div className="body-white" style={{ paddingTop: `100px` }}>
          <div className='col-lg-8 m-auto mt-3 one-lesson-container'>
            <div className="links mb-3" style={{ marginLeft: `10px` }} onClick={handleGoBack}>
              <p><i class="bi bi-arrow-left" style={{ fontSize: `.9rem` }}></i> Back to News & Updates</p>
            </div>
            <div className="header-container" style={{ backgroundImage: `url(${oneLesson.imageURL})` }}>
              <div className="header-background-filter"></div>
              <div className="text-center header-text-body">
                <h1 style={{ marginTop: `10px` }}>{oneLesson.postTitle}</h1>
                <p style={{ marginBottom: 0 }}>{dayjs(oneLesson.createdAt).format('MMMM D, YYYY')}</p>
              </div>
            </div>
            <div className='post-content m-auto site-font'>
              <h5 style={{ whiteSpace: `pre-wrap` }} className='mt-3 m-auto'>{oneLesson.postContent}</h5>
            </div>
            <br />
          </div>
        </div>

      </main>
    </Layout >
  )
}

export default OneLesson;

