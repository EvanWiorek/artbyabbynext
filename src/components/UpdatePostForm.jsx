import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreatePostForm({ setUpdateFormOpen, setPostTitleError, setPostTypeError, postTitleError, onePost }) {
  const [postTitle, setPostTitle] = useState(onePost.postTitle);
  const [postContent, setPostContent] = useState(onePost.postContent);
  const [videoURL, setVideoURL] = useState(onePost.videoURL);
  const [imageURL, setImageURL] = useState(onePost.imageURL);
  const [postType, setPostType] = useState("");
  const [postId, setPostId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setPostId(onePost._id);
    if(onePost.isLesson === true) {
      setPostType("isLesson")
    } else if (onePost.isUpdate === true) {
      setPostType("isUpdate")
    }
  })

  let formIsValid = false;
  formIsValid = postTitleError === null;

  const handlePostType = (e) => {
    setPostType(e.target.value)
    setPostTypeError(null)
  }

  const handlePostTitle = (e) => {
    setPostTitle(e.target.value);
    if (e.target.value.length < 1) {
      setPostTitleError("Post title cannot be blank.")
    }
    else {
      setPostTitleError(null)
    }
  }

  const handleUpdatePost = (e) => {
    e.preventDefault();
    let isLessonCheck = false;
    let isUpdateCheck = false;
    if (postType == "isLesson") {
      isLessonCheck = true;
      isUpdateCheck = false;
    }
    else if (postType == "isUpdate") {
      isUpdateCheck = true;
      isLessonCheck = false;
    }
    if (formIsValid === true) {
      axios.post(`/api/posts/update/${postId}`, {
        postTitle,
        postContent,
        videoURL,
        imageURL,
        isLesson: isLessonCheck,
        isUpdate: isUpdateCheck
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      router.replace(router.asPath);
      handleFormClose();
    }
  };

  const handleFormClose = () => {
    setUpdateFormOpen(false);
    document.querySelector(".admin-page-dark").style = "opacity: 0";
    setTimeout(
      () =>
      (document.querySelector(".admin-page-dark").style =
        "opacity: 0; display: none"),
      600
    );
  }

  return (
    <div className="admin-card box-shadow roboto">
      <div className="admin-card-header text-center p-3 d-flex justify-content-between align-items-center">
        <div className="empty-div"><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(124, 126, 128,0)` }}></i></div>
        <h3 style={{ marginBottom: 0 }}>Edit: {postTitle.slice(0, 20)}...</h3>
        <div className='d-flex justify-content-end'>
          <p onClick={handleFormClose}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(255,255,255,1)`, cursor: `pointer` }}></i></p>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="admin-card-body p-4">

        <form onSubmit={handleUpdatePost} method="POST" className="col-lg-11 m-auto">
          <div className="form-floating">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={postTitle}
              onChange={handlePostTitle}
            />
            <label className="thin-label">Post Title</label>
            {postTitleError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {postTitleError}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating mt-2">
            <textarea
              type="text"
              placeholder="p"
              className="form-control"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)} style={{ minHeight: `200px` }}/>
            <label className="thin-label">Post Content</label>
          </div>
          <div className="form-floating mt-2">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <label className="thin-label">Video URL (Optional)</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              placeholder="p"
              className="form-control mt-2"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <label className="thin-label">Image URL (Optional)</label>
          </div>
          <div className="radio-options mt-3">
            <h5>What kind of post is this?</h5>
            {postType === 'isLesson'? <input type="radio" name="isOption" value="isLesson" id="isLesson" onChange={handlePostType} checked /> : <input type="radio" name="isOption" value="isLesson" id="isLesson" onChange={handlePostType} />}
            <label htmlFor="isLesson">&nbsp; This is an art lesson</label>
            <br />
            {postType === 'isUpdate' ? <input type="radio" name="isOption" value="isUpdate" id="isUpdate" onChange={handlePostType} checked /> : <input type="radio" name="isOption" value="isUpdate" id="isUpdate" onChange={handlePostType} />}
            <label htmlFor="isUpdate">&nbsp; This is news/an update</label>
          </div>
          <br />
          <div className="d-flex gap-3 justify-content-end">
            <button className="btn-site-cancel roboto" onClick={handleFormClose}>Cancel</button>
            <button type="submit" className="btn-site-blue roboto">Update Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}