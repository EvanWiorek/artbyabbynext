import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';

const AdminPage = ({ isVisible }) => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
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

  const handlePassword = () => {
    document.querySelector(".admin-page-dark").style = "opacity: 0"
    setTimeout(() => document.querySelector(".admin-page-dark").style = "opacity: 0; display: none", 600)
    document.querySelector(".admin-card").style = "opacity: 0"
    setTimeout(() => document.querySelector(".admin-card").style = "opacity: 0; display: none", 600)
  }

  const backToHome = () => {
    router.push("/")
  }


  return (
    <>
      <Head>
        <title>Admin Page | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>

        <div className="admin-page-dark">
        </div>
        <div className="admin-card box-shadow site-font">
          <div className="admin-card-header text-center p-3"><h3>Admin Page</h3></div>
          <div className="horizontal-line"></div>
          <div className="admin-card-body p-4">
            <p>To access this page, enter the password below:</p>
            <div className="form-floating">
              <input type="password" name="adminPassword" id="adminPassword" placeholder='p' className='form-control' />
              <label htmlFor="adminPassword">Password</label>
            </div>
            <button className='view-cart mt-3' style={{ width: `100%` }} onClick={handlePassword}>Access Page</button>
          </div>
        </div>

        {/* background animation */}
        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div >
        <button className='view-cart mt-3 mb-4 site-font' style={{ position: `relative`, zIndex: `200`, marginLeft: `20px` }} onClick={backToHome}>Back to Home</button>
        <div className="form-container box-shadow site-font p-3">
          <div className="forms d-flex justify-content-around">
            <div className="left-side manage-products form-body box-shadow">
              <h3 className='display-6'>Manage Products</h3>
              <div className="horizontal-line"></div>
              <ul>
                <li>View list of all products</li>
                <li>Change price of a product</li>
                <li>Add/remove a discount price for all products</li>
                <li>Delete a product</li>
                <li>Add a product</li>
                <li>Edit a product</li>
              </ul>
              <button className='view-cart mt-3' style={{ width: `100%` }}>Update Products</button>
            </div>
            <div className="right-side create-post form-body box-shadow">
              <h3 className='display-6'>Manage Posts</h3>
              <div className="horizontal-line"></div>
              <ul>
                <li>View list of posts</li>
                <li>Add a new post, indicate if it is a lesson, or update/news</li>
                <li>If lesson, allow for video embedding (likely from YouTube)</li>
                <li>Delete a post</li>
                <li>Edit an existing post</li>
                <br />
              </ul>
              <button className='view-cart mt-3' style={{ width: `100%` }}>Update Posts</button>
            </div>
          </div>

        </div>

      </main>
    </ >
  )

}

export default AdminPage;