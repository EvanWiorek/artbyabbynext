import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const QuillComponent = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: {
    container: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: [] },
      ],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    handlers: {
      image: imageHandler
    }
  }
}

const formats = [
  'header',
  'font',
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

export default function CreatePostForm({ setCreateFormOpen, setPostTitleError, setPostTypeError, postTitleError, postTypeError }) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [postType, setPostType] = useState("");
  const router = useRouter();


  let formIsValid = false;
  formIsValid = postTitleError === null && postTypeError === null;


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
      handleFormClose();
    }
  };

  const handleFormClose = () => {
    setCreateFormOpen(false);
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
            <label className="thin-label">Post Title</label>
            {postTitleError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {postTitleError}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-2 " style={{ backgroundColor: `white`, padding: `10px`, borderRadius: `5px` }}>
            <label>Post Content</label>
            <QuillComponent
              modules={modules} formats={formats} theme="snow" value={postContent} onChange={setPostContent} style={{ backgroundColor: `white` }} />
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
            <input type="radio" name="isOption" value="isLesson" id="isLesson" onChange={handlePostType} />
            <label htmlFor="isLesson">&nbsp; This is an art lesson</label>
            <br />
            <input type="radio" name="isOption" value="isUpdate" id="isUpdate" onChange={handlePostType} />
            <label htmlFor="isUpdate">&nbsp; This is news/an update</label>
            {postTypeError ? (
              <p style={{ color: "tomato" }} className="mt-2">
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