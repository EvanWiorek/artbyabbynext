import Head from 'next/head'
import Layout from '../components/Layout'
import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';
import Link from 'next/link';
import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export const getServerSideProps = async () => {
  try {
    await connectMongoDB();
    const allUpdates = await AbbyPost.find({ isUpdate: true });
    return {
      props: {
        allUpdates: JSON.parse(JSON.stringify(allUpdates))
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

const Lessons = ({ allUpdates }) => {
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
    <Layout home>
      <Head>
        <title>Virtual Art Lessons | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>

        <div className="body-color" style={{ paddingTop: `100px` }}>
          <h1 className='text-center mt-3 mb-0 site-font'>News & Updates</h1>
          <br />
          <div className="update-post-list col-7 m-auto">

            {allUpdates.map((update) => (
              <div key={update._id} className='m-auto mt-3'>

                <div className="d-flex justify-content-center mb-2"><img src={`${update.imageURL}`} alt="Thumbnail" className='desktop-hide' /></div>
                <div className="d-flex gap-3 card-body">
                  <img src={`${update.imageURL}`} alt="Thumbnail" className='mobile-hide' />
                  <div style={{ width: `100%` }}>
                    <div style={{ minHeight: `180px` }}>
                      <h5 className='site-font'>                          <Link href={`/updates/${update._id}`}>{update.postTitle}</Link></h5>
                      <div className='d-flex gap-2 text-secondary site-font'>
                        <p>{dayjs(update.createdAt).format('MMMM D, YYYY')}</p>
                        <p>•</p>
                        <p>By Abby</p>
                      </div>
                      <p>{update.postContent.slice(0, 200)}...</p>
                    </div>
                    <div className="d-flex read-more-flex">
                      <div className="d-flex flex-column align-items-center read-more">
                        <Link href={`/updates/${update._id}`} style={{ fontSize: `.8rem` }}>R E A D &nbsp; M O R E</Link>
                        <div className="read-more-line"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="horizontal-line-dark"></div>
              </div>
            ))}
            <br />
          </div>
        </div>

      </main>
    </Layout >
  )

}

export default Lessons;
