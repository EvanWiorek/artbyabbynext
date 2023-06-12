import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CreatePostForm from "../components/CreatePostForm";
import UpdatePostForm from "../components/UpdatePostForm";
import { connectMongoDB } from "../libs/MongoConnect";
import AbbyPost from "../models/post.model";

export const getServerSideProps = async () => {
  try {
    await connectMongoDB();
    const allPosts = await AbbyPost.find();
    return {
      props: {
        allPosts: JSON.parse(JSON.stringify(allPosts))
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

const AdminPage = ({ allPosts }) => {
  const myRef = useRef();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState("");
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [updateFormOpen, setUpdateFormOpen] = useState(false)
  const [postTitleError, setPostTitleError] = useState("");
  // const adminPassword = ""
  const [postTypeError, setPostTypeError] = useState("");
  const [onePost, setOnePost] = useState();

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

  const deletePost = async (postId) => {
    const response = await fetch(`/api/posts/delete/${postId}`, {
      method: 'DELETE'
    })
    const data = await response.json();
    console.log(data);
    router.replace(router.asPath);
  }

  const handleUpdateFormOpen = async (postId) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'GET'
    })
    const data = await response.json();
    console.log(data);
    setOnePost(data)
    document.querySelector(".admin-page-dark").style =
    "opacity: 1; display: block"
    setUpdateFormOpen(true)
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
          <div className="form-container box-shadow p-3 m-auto col-lg-9">
            <div className="right-side create-post form-body box-shadow">
              <h3 className="display-6">Manage Posts</h3>
              <div className="horizontal-line"></div>
              <div className="col-lg-9 m-auto">
                <div className="d-flex justify-content-center">
                  <button onClick={handleCreateFormOpen} className="btn-site-blue d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-plus-circle" style={{ fontSize: `1.3rem` }}></i>
                    <p style={{ marginBottom: 0 }}>New Post</p>
                  </button>
                </div>
                <div className="form-body all-posts-list-container box-shadow">
                  <table className="table table-sm m-auto">
                    <thead>
                      <tr>
                        <th scope="col">Post Title</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPosts.map((p) => {
                        let postType = "";
                        if (p.isLesson === true) {
                          postType = "Art Lesson"
                        }
                        else if (p.isUpdate === true) {
                          postType = "News/Update"
                        }
                        return (
                          <tr>
                            <td>{p.postTitle}</td>
                            <td>{postType}</td>
                            <td>
                              <div className="d-flex justify-content-center gap-1">
                                <button className="btn-site-blue table-button-small" onClick={() => handleUpdateFormOpen(p._id)}>Edit</button>

                                <button className="btn-site-cancel table-button-small" onClick={() => deletePost(p._id)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
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
              postTitleError={postTitleError}
              postTypeError={postTypeError} />}
            {updateFormOpen && <UpdatePostForm 
            setUpdateFormOpen={setUpdateFormOpen} setPostTitleError={setPostTitleError} setPostTypeError={setPostTypeError}
              postTitleError={postTitleError}
              postTypeError={postTypeError}
              onePost={onePost} />}
          </div>
        )}

      </main>
    </>
  );
};

export default AdminPage;
