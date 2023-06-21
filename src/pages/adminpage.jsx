import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CreatePostForm from "../components/CreatePostForm";
import UpdatePostForm from "../components/UpdatePostForm";
import { connectMongoDB } from "../libs/MongoConnect";
import AbbyPost from "../models/post.model";
import CreateProductForm from "../components/CreateProductForm";
import UpdateProductForm from "../components/UpdateProductForm";
import Product from "../models/product.model";
import axios from "axios";

export const getServerSideProps = async () => {
  try {
    await connectMongoDB();
    const allPosts = await AbbyPost.find();
    const allProducts = await Product.find();
    return {
      props: {
        allPosts: JSON.parse(JSON.stringify(allPosts)),
        allProducts: JSON.parse(JSON.stringify(allProducts))
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

const AdminPage = ({ allPosts, allProducts }) => {
  const myRef = useRef();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState("");
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false)
  const [createProductFormOpen, setCreateProductFormOpen] = useState(false)
  const [updateFormOpen, setUpdateFormOpen] = useState(false)
  const [updateProductFormOpen, setUpdateProductFormOpen] = useState(false)

  //AbbyPost
  const [postTitleError, setPostTitleError] = useState("");
  // const adminPassword = ""
  const [postTypeError, setPostTypeError] = useState("");
  const [allLessons, setAllLessons] = useState([]);
  const [allUpdates, setAllUpdates] = useState([]);
  const [onePost, setOnePost] = useState();

  //Products
  const [productNameError, setProductNameError] = useState();
  const [productImagesError, setProductImagesError] = useState();
  const [productSlugError, setProductSlugError] = useState();
  const [productCategoryError, setProductCategoryError] = useState();
  const [productCountInStockError, setProductCountInStockError] = useState();
  const [productPriceOptionsError, setProductPriceOtionsError] = useState();
  const [oneProduct, setOneProduct] = useState();

  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    setAllLessons(allPosts.filter((p) => p.isLesson === true))
    setAllUpdates(allPosts.filter((p) => p.isUpdate === true))
  }, [changesMade])

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

  const handleCreatePostFormOpen = () => {
    document.querySelector(".admin-page-dark").style =
      "opacity: 1; display: block"
    setCreatePostFormOpen(true);
  }

  const handleCreateProductFormOpen = () => {
    document.querySelector(".admin-page-dark").style =
      "opacity: 1; display: block"
    setCreateProductFormOpen(true);
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

  const handleOpenProductEditForm = (productId) => {
    axios.get(`/api/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        setOneProduct(res.data)
        document.querySelector(".admin-page-dark").style =
          "opacity: 1; display: block"
        setUpdateProductFormOpen(true)
      })
      .catch((err) => console.log(err));

  }

  const deleteProduct = (productId) => {
    axios.post(`/api/products/delete/${productId}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    router.replace(router.asPath);
  }

  return (
    <>
      <Head>
        <title>Admin Page | Art by Abby</title>
      </Head>
      <main ref={myRef}>
        <div className="admin-page-dark"></div>
        <div className="admin-card box-shadow roboto small-card">
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
              className="btn-site-blue roboto mt-3"
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
          className="btn-site-blue roboto mt-3 mb-4"
          style={{ position: `relative`, zIndex: `200`, marginLeft: `20px` }}
          onClick={backToHome}
        >
          Back to Home
        </button>

        {loggedIn && (
          <div className="form-container box-shadow p-3 m-auto col-lg-7 roboto">
            <div className="right-side create-post form-body box-shadow">
              <h3 className="text-center">Manage Posts</h3>
              <div className="horizontal-line-gray"></div>
              <div className="col-lg-9 m-auto">
                <div className="d-flex justify-content-center">
                  <button onClick={handleCreatePostFormOpen} className="btn-site-blue roboto d-flex align-items-center justify-content-center gap-2 mb-3" style={{ width: `100%` }}>
                    <i className="bi bi-plus-circle" style={{ fontSize: `1.3rem` }}></i>
                    <p style={{ marginBottom: 0 }}>New Post</p>
                  </button>
                </div>
                <div className="form-body all-posts-list-container box-shadow">
                  <h4 className="text-center mt-2">Art Lessons</h4>
                  <div className="horizontal-line-gray"></div>
                  <table className="table table-sm m-auto">
                    <thead>
                      <tr>
                        <th scope="col">Post Title</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allLessons.map((p) => {
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
                            <td>
                              <div className="d-flex justify-content-center gap-1">
                                <button className="btn-site-blue roboto table-button-small" onClick={() => handleUpdateFormOpen(p._id)}>Edit</button>

                                <button className="btn-site-cancel roboto table-button-small" onClick={() => deletePost(p._id)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="form-body all-posts-list-container box-shadow mt-3">
                  <h4 className="text-center mt-2">News & Updates</h4>
                  <div className="horizontal-line-gray"></div>
                  <table className="table table-sm m-auto">
                    <thead>
                      <tr>
                        <th scope="col">Post Title</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUpdates.map((p) => {
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
                            <td>
                              <div className="d-flex justify-content-center gap-1">
                                <button className="btn-site-blue roboto table-button-small" onClick={() => handleUpdateFormOpen(p._id)}>Edit</button>
                                <button className="btn-site-cancel roboto table-button-small" onClick={() => deletePost(p._id)}>Delete</button>
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
              <h3 className="text-center">Manage Products</h3>
              <div className="horizontal-line-gray"></div>

              <div className="col-lg-9 m-auto">
                <ul>
                  <li><s>View list of all products</s></li>
                  <li>Add/remove a discount price for all products</li>
                  <li>Create discount codes that when used lower the price on the cart menu?</li>
                  <li><s>Delete a product</s></li>
                  <li><s>Add a product</s></li>
                  <li><s>Edit a product</s></li>
                </ul>

                <div className="d-flex justify-content-center mt-3">
                  <button onClick={handleCreateProductFormOpen} className="btn-site-blue roboto d-flex align-items-center justify-content-center gap-2 mb-3" style={{ width: `100%` }}>
                    <i className="bi bi-plus-circle" style={{ fontSize: `1.3rem` }}></i>
                    <p style={{ marginBottom: 0 }}>New Product</p>
                  </button>
                </div>
                
                <div className="form-body all-posts-list-container box-shadow">
                  <h4 className="text-center mt-2">All Products</h4>
                  <div className="horizontal-line-gray"></div>
                  <table className="table table-sm m-auto">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts.map((prod) => {
                        return (
                          <tr>
                            <td>{prod.name}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <button className="btn-site-blue roboto table-button-small" onClick={() => handleOpenProductEditForm(prod._id)}>Edit</button>
                                <button className="btn-site-cancel roboto table-button-small" onClick={() => deleteProduct(prod._id)}>Delete</button>
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



            {createPostFormOpen && <CreatePostForm setCreatePostFormOpen={setCreatePostFormOpen} setPostTitleError={setPostTitleError} setPostTypeError={setPostTypeError}
              postTitleError={postTitleError}
              postTypeError={postTypeError} />}

            {updateFormOpen && <UpdatePostForm
              setUpdateFormOpen={setUpdateFormOpen} setPostTitleError={setPostTitleError} setPostTypeError={setPostTypeError}
              postTitleError={postTitleError}
              postTypeError={postTypeError}
              onePost={onePost} setChangesMade={setChangesMade} />}

            {createProductFormOpen && <CreateProductForm
              setCreateProductFormOpen={setCreateProductFormOpen}

              productNameError={productNameError}
              productImagesError={productImagesError}
              productSlugError={productSlugError}
              productCategoryError={productCategoryError}
              productCountInStockError={productCountInStockError}
              productPriceOptionsError={productPriceOptionsError}

              setProductNameError={setProductNameError}
              setProductImagesError={setProductImagesError}
              setProductSlugError={setProductSlugError}
              setProductCategoryError={setProductCategoryError}
              setProductCountInStockError={setProductCountInStockError}
              setProductPriceOtionsError={setProductPriceOtionsError}
            />}

            {updateProductFormOpen && <UpdateProductForm
              setUpdateProductFormOpen={setUpdateProductFormOpen}

              productNameError={productNameError}
              productImagesError={productImagesError}
              productSlugError={productSlugError}
              productCategoryError={productCategoryError}
              productCountInStockError={productCountInStockError}
              productPriceOptionsError={productPriceOptionsError}

              setProductNameError={setProductNameError}
              setProductImagesError={setProductImagesError}
              setProductSlugError={setProductSlugError}
              setProductCategoryError={setProductCategoryError}
              setProductCountInStockError={setProductCountInStockError}
              setProductPriceOtionsError={setProductPriceOtionsError}

              oneProduct={oneProduct}
            />}


          </div>
        )}

      </main>
    </>
  );
};

export default AdminPage;
