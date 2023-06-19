import { useEffect, useState } from "react";
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

export default function UpdatePostForm({ setUpdateFormOpen, setPostTitleError, setPostTypeError, postTitleError, onePost, setChangesMade }) {
  const [postTitle, setPostTitle] = useState(onePost.postTitle);
  const [postContent, setPostContent] = useState(onePost.postContent);
  const [videoURL, setVideoURL] = useState(onePost.videoURL);
  const [imageURL, setImageURL] = useState(onePost.imageURL);
  const [postType, setPostType] = useState("");
  const [postId, setPostId] = useState("");
  const [isLesson, setIsLesson] = useState(onePost.isLesson);
  const [isUpdate, setIsUpdate] = useState(onePost.isUpdate);
  const router = useRouter();


  useEffect(() => {
    setPostTitleError(null)
    setPostId(onePost._id);
  })

  let formIsValid = false;
  formIsValid = postTitleError === null;

  const handleIsLesson = (e) => {
    setIsLesson(true)
    setIsUpdate(false)
    console.log('HANDLE LESSON TEST');
    console.log('isLesson', isLesson);
    console.log('isUpdate', isUpdate);
  }
  
  const handleIsUpdate = (e) => {
    setIsLesson(false)
    setIsUpdate(true)
    console.log('HANDLE UPDATE TEST');
    console.log('isLesson', isLesson);
    console.log('isUpdate', isUpdate);
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
    if (formIsValid === true) {
      axios.post(`/api/posts/update/${postId}`, {
        postTitle,
        postContent,
        videoURL,
        imageURL,
        isLesson: isLesson,
        isUpdate: isUpdate
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      setChangesMade(true)
      // router.replace(router.asPath);
      router.reload(window.location.pathname)
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
          <div className="mt-2 " style={{ backgroundColor: `white`, padding: `10px`, borderRadius: `5px` }}>
            <label>Post Content</label>
            <ReactQuill
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
            {isLesson === true ? <input type="radio" value={isLesson} name="isOption" id="isLesson" onChange={handleIsLesson} checked /> : <input type="radio" value={isLesson} name="isOption" id="isLesson" onChange={handleIsLesson} /> }
            <label htmlFor="isLesson">&nbsp; This is an art lesson</label>
            <br />
            {isUpdate === true ? <input type="radio" value={isUpdate} name="isOption" id="isUpdate" onChange={handleIsUpdate} checked /> :
            <input type="radio" value={isUpdate} name="isOption" id="isUpdate" onChange={handleIsUpdate} />}
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