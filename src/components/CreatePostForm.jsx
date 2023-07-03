import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(
  async () => {
    const { default: Quill } = await import("react-quill");
    return function forwardRef({ forwardedRef, ...props }) {
      return <Quill ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  }
)

const modules = {
  toolbar: {
    container: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      [{ 'color': [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: [] },
      ],
      ['link', 'image', 'clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    handlers: {
      image: imageHandler
    },
  }
}

const formats = [
  'header',
  'font',
  'color',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
]

function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt('Please enter the image URL:');
  if (value) {
    this.quill.insertEmbed(range.index, 'image', value);
  }
}

export default function CreatePostForm({ setCreatePostFormOpen, setPostTitleError, setPostTypeError, postTitleError, postTypeError }) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImageError, setPostImageError] = useState("");
  const [postVideoError, setPostVideoError] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [postType, setPostType] = useState("");
  const router = useRouter();


  let formIsValid = false;
  formIsValid = postTitleError === null && postTypeError === null && postImageError === null && postVideoError === null;


  const handlePostType = (e) => {
    setPostType(e.target.value)
    setPostTypeError(null)
    console.log(e.target.value);
    if(e.target.value === 'isUpdate') {
      setPostVideoError(null)
      if (imageURL.length < 1) {
        setPostImageError("")
      }
      else {
        setPostImageError(null)
      }
    }
    if(e.target.value === 'isLesson') {
      setPostImageError(null)
      if (videoURL.length < 1) {
        setPostVideoError("")
      }
      else {
        setPostVideoError(null)
      }
    }
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

  const handlePostImage = (e) => {
    setImageURL(e.target.value)
    if (e.target.value.length < 1 || !e.target.value.includes("http")) {
      setPostImageError("Invalid image URL.")
    }
    else {
      setPostImageError(null)
    }
  }

  const handlePostVideo = (e) => {
    setVideoURL(e.target.value)
    if (e.target.value.length < 1 || !e.target.value.includes("http")) {
      setPostVideoError("Invalid video URL.")
    }
    else {
      setPostVideoError(null)
    }
  }

  const handleCreatePost = (e) => {
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
      axios.post('/api/posts/create', {
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
      router.reload(window.location.pathname)
      handleFormClose();
    }
  };

  const handleFormClose = () => {
    setCreatePostFormOpen(false);
    document.querySelector(".admin-page-dark").style = "opacity: 0";
    setTimeout(
      () =>
      (document.querySelector(".admin-page-dark").style =
        "opacity: 0; display: none"),
      600
    );
    setPostTitle("");
    setPostTitleError("");
    setPostContent("");
    setVideoURL("");
    setImageURL("");
    setPostType("");
    setPostTypeError("");
  }

  return (
    <div className="admin-card box-shadow roboto">
      <div className="admin-card-header text-center p-3 d-flex justify-content-between align-items-center">
        <div className="empty-div"><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(124, 126, 128,0)` }}></i></div>
        <h3 style={{ marginBottom: 0 }}>Create New Post</h3>
        <div className='d-flex justify-content-end'>
          <p onClick={handleFormClose}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(255,255,255,1)`, cursor: `pointer` }}></i></p>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="admin-card-body p-4">

        <form onSubmit={handleCreatePost} method="POST" className="col-lg-11 m-auto">
          <div className="form-floating">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={postTitle}
              onChange={handlePostTitle}
            />
            <label className="thin-label">Post Title <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {postTitleError ? (
              <p style={{ color: "rgb(206, 139, 139)" }} className="mt-1">
                {postTitleError}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-2 " style={{ backgroundColor: `white`, padding: `10px`, borderRadius: `5px` }}>
            <label>Post Content <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            <ReactQuill
              modules={modules} formats={formats} theme="snow" value={postContent} onChange={setPostContent} style={{ backgroundColor: `white` }} />
          </div>

          {postType === 'isLesson' 
          ? (
            <div className="form-floating mt-2">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={videoURL}
              onChange={handlePostVideo}
            />
            <label className="thin-label">Video URL <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {postVideoError ? (
              <p style={{ color: "rgb(206, 139, 139)" }} className="mt-1">
                {postVideoError}
              </p>
            ) : (
              ""
            )}
          </div>
          )
          : (
            <div className="form-floating">
            <input
              type="text"
              placeholder="p"
              className="form-control mt-2"
              value={imageURL}
              onChange={handlePostImage}
              
            />
            <label className="thin-label" id="postImageInput">Image URL <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {postImageError ? (
              <p style={{ color: "rgb(206, 139, 139)" }} className="mt-1">
                {postImageError}
              </p>
            ) : (
              ""
            )}
          </div> 
          )
          }



          <div className="radio-options mt-3">
            <h5>What kind of post is this?</h5>
            <input type="radio" name="isOption" value="isLesson" id="isLesson" onChange={handlePostType} />
            <label htmlFor="isLesson">&nbsp; This is an art lesson</label>
            <br />
            <input type="radio" name="isOption" value="isUpdate" id="isUpdate" onChange={handlePostType} />
            <label htmlFor="isUpdate">&nbsp; This is news/an update</label>
            {postTypeError ? (
              <p style={{ color: "rgb(206, 139, 139)" }} className="mt-2">
                {postTypeError}
              </p>
            ) : (
              ""
            )}
          </div>
          <br />
          <div className="d-flex gap-3 justify-content-end">
            <button className="btn-site-cancel roboto" onClick={handleFormClose}>Cancel</button>
            <button type="submit" className={`roboto btn-site-blue ${formIsValid ? "" : "disabled"}`}>Create Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}