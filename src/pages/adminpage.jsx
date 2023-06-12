import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CreatePostForm from "../components/CreatePostForm";

const AdminPage = () => {
  const myRef = useRef();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState("");
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [postTitleError, setPostTitleError] = useState("");
  // const adminPassword = ""
  const [postTypeError, setPostTypeError] = useState("");

  let formIsValid = false;
  formIsValid = postTitleError === null && postTypeError=== null;

  const handlePassword = () => {
    setLoggedIn(true);
    document.querySelector(".admin-page-dark").style = "opacity: 0";
    setTimeout(
      () =>
      (document.querySelector(".admin-page-dark").style =
        "opacity: 0; display: none"),
      600
    );
    document.querySelector(".admin-card").style = "opacity: 0";
    setTimeout(
      () =>
      (document.querySelector(".admin-card").style =
        "opacity: 0; display: none"),
      600
    );
  };

  const backToHome = () => {
    router.push("/");
  };


  const handleCreateFormOpen = () => {
    document.querySelector(".admin-page-dark").style =
      "opacity: 1; display: block"
    setCreateFormOpen(true);
  }

  return (
    <>
      <Head>
        <title>Admin Page | Art by Abby</title>
      </Head>
      <main ref={myRef}>
        <div className="admin-page-dark"></div>
        <div className="admin-card box-shadow site-font">
          <div className="admin-card-header text-center p-3">
            <h3>Admin Page</h3>
          </div>
          <div className="horizontal-line"></div>
          <div className="admin-card-body p-4">
            <p>To access this page, enter the password below:</p>
            <div className="form-floating thin-floating">
              <input
                type="password"
                name="adminPassword"
                id="adminPassword"
                placeholder="p"
                className="form-control thin-control"
              />
              <label htmlFor="adminPassword">Password</label>
            </div>
            <button
              className="btn-site-blue mt-3"
              style={{ width: `100%` }}
              onClick={handlePassword}
            >
              Access Page
            </button>
          </div>
        </div>

        {/* background animation */}
        <div className="area">
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
        </div>
        <button
          className="btn-site-blue mt-3 mb-4 site-font"
          style={{ position: `relative`, zIndex: `200`, marginLeft: `20px` }}
          onClick={backToHome}
        >
          Back to Home
        </button>

        {loggedIn && (
          <div className="form-container box-shadow site-font p-3 m-auto col-lg-9">
            <div className="right-side create-post form-body box-shadow">
              <h3 className="display-6">Manage Posts</h3>
              <div className="horizontal-line"></div>
              <ul>
                <li>View list of posts</li>
                <li style={{ textDecoration: `line-through` }}>
                  Add a new post, indicate if it is a lesson, or update/news
                </li>
                <li style={{ textDecoration: `line-through` }}>
                  If lesson, allow for video embedding (likely from YouTube)
                </li>
                <li>Delete a post</li>
                <li>Edit an existing post</li>
                <br />
                <button onClick={handleCreateFormOpen} className="btn-site-blue d-flex align-items-center gap-2" style={{ borderRadius: `10px` }}>
                  <i class="bi bi-plus-circle" style={{ fontSize: `1.3rem` }}></i>
                  <p style={{ marginBottom: 0 }}>New Post</p>
                </button>
              </ul>
            </div>
            <div className="left-side manage-products form-body box-shadow mt-4 mb-5">
              <h3 className="display-6">Manage Products</h3>
              <div className="horizontal-line"></div>
              <ul>
                <li>View list of all products</li>
                <li>Change price of a product</li>
                <li>Add/remove a discount price for all products</li>
                <li>Delete a product</li>
                <li>Add a product</li>
                <li>Edit a product</li>
              </ul>
              <button className="btn-site-blue mt-3" style={{ width: `100%` }}>
                Update Products
              </button>
            </div>
            {createFormOpen && <CreatePostForm setCreateFormOpen={setCreateFormOpen} setPostTitleError={setPostTitleError} setPostTypeError={setPostTypeError}
            formIsValid={formIsValid}
            postTitleError={postTitleError}
            postTypeError={postTypeError} />}
          </div>
        )}

      </main>
    </>
  );
};

export default AdminPage;
