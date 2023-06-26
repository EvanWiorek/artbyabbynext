import Head from 'next/head'
import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';

const ContactPage = () => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();
  const [userMessage, setUserMessage] = useState();
  const [userEmailError, setUserEmailError] = useState();
  const [userNameError, setUserNameError] = useState();
  const [userMessageError, setUserMessageError] = useState();

  let formIsValid = false;
  formIsValid =
    userEmailError === null
    && userNameError === null
    && userMessageError === null

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

  const handleUserName = (e) => {
    setUserName(e.target.value)
    if (e.target.value.length < 1) {
      setUserNameError("Name cannot be blank.")
    }
    else {
      setUserNameError(null)
    }
  }

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value)
    if (e.target.value.length < 1) {
      setUserEmailError("Email cannot be blank.")
    }
    else {
      setUserEmailError(null)
    }
  }

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value)
    if (e.target.value.length < 1) {
      setUserMessageError("Message cannot be blank.")
    }
    else {
      setUserMessageError(null)
    }
  }

  const sendEmail = (e) => {
    e.preventDefault();

    // console.log(userName);
    // console.log(userEmail);
    // console.log(userMessage);

    Email.send({
      // Host: "smtp.elasticemail.com",
      Host: "smtp.elasticemail.com",
      Username: 'wiorek.evan@gmail.com',
      Password: "33BCE3F0F2479D1EA6B49B489186D0E71057",
      // To: 'evan.wiorek.pitchblu@gmail.com',
      To: 'wiorek.evan@gmail.com',
      From: 'wiorek.evan@gmail.com',
      Subject: `New Contact Form - ${userName} - Art By Abby`,
      Body: `
      <div style="background-color: rgba(206,139,139, .8); color: white; width: 70%; margin: 0 auto; border-radius: 5px; padding: 15px; font-family: Trebuchet MS; font-size: 1rem; font-weight: 100">
        <h3 style="text-align: center; font-weight: 100">Hi Abby! You've receieved a new message from the Contact Us page:</h3>
        <p><b>Customer Name:</b> ${userName}</p>
        <p style="color: white !important; text-decoration: none"><b>Customer Email:</b> ${userEmail}</p>
        <p><b>Customer Message:</b></p>
        <div style="border: 1px solid rgba(255,255,255,.5); padding: 10px; background-color: rgba(206,139,139, .7);"><p>${userMessage}</p></div>
      </div>
      `
    })
      .then(
        message => {
          if (message === 'OK') {
            toast.success(`Email sent successfully.
          ${' '}
          We will be in touch with you soon.`, { position: 'top-center' })
          }
          else {
            // alert(message)
            toast.error(message)
          }
        }
      )
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Contact Us | Art by Abby</title>
        </Head>
        <main ref={myRef} className='page-content'>

          <div className="body-color" style={{ paddingTop: `100px` }}>

            <form onSubmit={sendEmail} className='col-lg-4 m-auto'>

              <div className="form-floating thin-floating mt-3">
                <input
                  type="text"
                  placeholder="p"
                  className="form-control thin-control square-control"
                  value={userName}
                  onChange={handleUserName}
                />
                <label className="thin-label">Name <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
                {userNameError ? (
                  <p style={{ color: `rgb(206, 139, 139)` }} className="mt-1">
                    {userNameError}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-floating thin-floating mt-3">
                <input
                  type="text"
                  placeholder="p"
                  className="form-control thin-control square-control"
                  value={userEmail}
                  onChange={handleUserEmail}
                />
                <label className="thin-label">Email <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
                {userEmailError ? (
                  <p style={{ color: `rgb(206, 139, 139)` }} className="mt-1">
                    {userEmailError}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-floating thin-floating mt-3">
                <input
                  type="text"
                  placeholder="p"
                  className="form-control thin-control square-control"
                  value={userMessage}
                  onChange={handleUserMessage}
                />
                <label className="thin-label">Message <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
                {userMessageError ? (
                  <p style={{ color: `rgb(206, 139, 139)` }} className="mt-1">
                    {userMessageError}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <button type="submit" className='btn-site-pink roboto mt-3' style={{ width: `100%` }}>Send</button>

            </form>
            <div className="div" style={{ backgroundColor: `rgba(206,139,139, .1)`, display: `flex`, justifyContent: `center`, flexDirection: `column`, alignItems: `center` }}>
                <p>TEST</p>
                <p>TEST</p>
                <p>TEST</p>
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>

        </main>
      </Layout >
    </>
  )
}

export default ContactPage;