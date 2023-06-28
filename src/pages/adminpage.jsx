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
import Order from "../models/order.model";

export const getServerSideProps = async () => {
  try {
    await connectMongoDB();
    const allPosts = await AbbyPost.find();
    const allProducts = await Product.find();
    const allOrders = await Order.find();
    return {
      props: {
        allPosts: JSON.parse(JSON.stringify(allPosts)),
        allProducts: JSON.parse(JSON.stringify(allProducts)),
        allOrders: JSON.parse(JSON.stringify(allOrders)),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const AdminPage = ({ allPosts, allProducts, allOrders }) => {
  const myRef = useRef();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState("");
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false);
  const [createProductFormOpen, setCreateProductFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateProductFormOpen, setUpdateProductFormOpen] = useState(false);

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

  //Admin Views
  const [postsViewActive, setPostsViewActive] = useState(true);
  const [productsViewActive, setProductsViewActive] = useState(false);
  const [ordersViewActive, setOrdersViewActive] = useState(false);
  const [settingsViewActive, setSettingsViewActive] = useState(false);

  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    setAllLessons(allPosts.filter((p) => p.isLesson === true));
    setAllUpdates(allPosts.filter((p) => p.isUpdate === true));
  }, [changesMade]);

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
      "opacity: 1; display: block";
    setCreatePostFormOpen(true);
  };

  const handleCreateProductFormOpen = () => {
    document.querySelector(".admin-page-dark").style =
      "opacity: 1; display: block";
    setCreateProductFormOpen(true);
  };

  const deletePost = async (postId) => {
    const response = await fetch(`/api/posts/delete/${postId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    router.replace(router.asPath);
  };

  const handleUpdateFormOpen = async (postId) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setOnePost(data);
    document.querySelector(".admin-page-dark").style =
      "opacity: 1; display: block";
    setUpdateFormOpen(true);
  };

  const handleOpenProductEditForm = (productId) => {
    axios
      .get(`/api/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        setOneProduct(res.data);
        document.querySelector(".admin-page-dark").style =
          "opacity: 1; display: block";
        setUpdateProductFormOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (productId) => {
    axios
      .post(`/api/products/delete/${productId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    router.replace(router.asPath);
  };

  const changeAdminView = (adminView) => {
    if(adminView === 'posts') {
      setPostsViewActive(true)
      setProductsViewActive(false)
      setOrdersViewActive(false)
      setSettingsViewActive(false)

      document.getElementById("postsView").classList.add("manage-button-active")
      document.getElementById("productsView").classList.remove("manage-button-active")
      document.getElementById("ordersView").classList.remove("manage-button-active")
      document.getElementById("settingsView").classList.remove("manage-button-active")
    }
    if(adminView === 'products') {
      setPostsViewActive(false)
      setProductsViewActive(true)
      setOrdersViewActive(false)
      setSettingsViewActive(false)

      document.getElementById("postsView").classList.remove("manage-button-active")
      document.getElementById("productsView").classList.add("manage-button-active")
      document.getElementById("ordersView").classList.remove("manage-button-active")
      document.getElementById("settingsView").classList.remove("manage-button-active")
    }
    if(adminView === 'orders') {
      setPostsViewActive(false)
      setProductsViewActive(false)
      setOrdersViewActive(true)
      setSettingsViewActive(false)

      document.getElementById("postsView").classList.remove("manage-button-active")
      document.getElementById("productsView").classList.remove("manage-button-active")
      document.getElementById("ordersView").classList.add("manage-button-active")
      document.getElementById("settingsView").classList.remove("manage-button-active")
    }
    if(adminView === 'settings') {
      setPostsViewActive(false)
      setProductsViewActive(false)
      setOrdersViewActive(false)
      setSettingsViewActive(true)

      document.getElementById("postsView").classList.remove("manage-button-active")
      document.getElementById("productsView").classList.remove("manage-button-active")
      document.getElementById("ordersView").classList.remove("manage-button-active")
      document.getElementById("settingsView").classList.add("manage-button-active")
    }

    if(document.querySelector(".screen-darken").style.display === "block") {
      handleCloseMenu();
    }
  };

  const handleCloseMenu = () => {
    document.querySelector(".admin-side-bar-body").style = "display: block; left: -100%"
    document.querySelector(".admin-side-bar-content").style = "opacity: 0;"
    document.querySelector(".admin-side-bar-mobile-button").style = "display: block; opacity: 0"
    
    setTimeout(() => document.querySelector(".admin-side-bar-body").style = "display: none;", 600)

    setTimeout(() => document.querySelector(".admin-side-bar-content").style = "display: none;", 600)
    
    setTimeout(() => document.querySelector(".admin-side-bar-mobile-button").style = "display: block; opacity: 1", 200)

    setTimeout(() => document.querySelector(".screen-darken").style = "left: -100%; display: block; transition: .2s", 200)

    setTimeout(() => document.querySelector(".screen-darken").style = "display: none", 600)
  }

  const handleOpenMenu = () => {
    document.querySelector(".admin-side-bar-body").style = "display: block; left: -100%;"
    document.querySelector(".admin-side-bar-content").style = "display: block;"
    document.querySelector(".admin-side-bar-mobile-button").style = "opacity: 0"
    document.querySelector(".screen-darken").style = "display: block; left: -100%;"

    setTimeout(() => document.querySelector(".screen-darken").style = "display: block; left: 0", 100)

    setTimeout(() => document.querySelector(".admin-side-bar-body").style = "display: block; left: 0; backdrop-filter: blur(25px) brightness(115%)", 1)

    setTimeout(() => document.querySelector(".admin-side-bar-mobile-button").style = "display: none", 200)
  }

  return (
    <>
      <Head>
        <title>Admin Page | Art by Abby</title>
      </Head>
      <main ref={myRef}>
        <div className="admin-page-dark"></div>
        <div className="admin-card box-shadow roboto small-card">
          <div className="admin-card-header text-center roboto p-3">
            <h3 className="roboto">Admin Page</h3>
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

        {loggedIn && (
          <div>
            <div className="screen-darken" onClick={handleCloseMenu}></div>
            <div className="admin-side-bar-body box-shadow col-lg-2">
              <div className="admin-side-bar-content">
                <div
                  className="d-flex align-items-center mt-2"
                  style={{ marginLeft: `10px` }}
                >
                  <img
                    src={"/static/images/square-logo.png"}
                    alt="Logo"
                    style={{ width: `40px` }}
                    className="box-shadow-2 rounded"
                  />
                  <h5 className="roboto p-3" style={{ marginBottom: 0}}>
                    Admin Page
                  </h5>
                  <p onClick={handleCloseMenu} className="desktop-hide" style={{ marginTop: `-22px`, marginLeft: `10px
                  `, marginRight: `10px`, cursor: `pointer` }}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgb(124, 126, 128)` }}></i></p>
                </div>
                <div className="horizontal-line-gray"></div>
                <div
                  className="manage-button manage-button-active"
                  onClick={() => changeAdminView("posts")}
                  id="postsView"
                >
                  <span>
                    <i className="bi bi-blockquote-left"></i>
                  </span>{" "}
                  Posts
                </div>
                <div
                  className="manage-button"
                  onClick={() => changeAdminView("products")}
                  id="productsView"
                >
                  <span className="">
                    <i className="bi bi-shop"></i>
                  </span>{" "}
                  Products
                </div>
                <div
                  className="manage-button"
                  onClick={() => changeAdminView("orders")}
                  id="ordersView"
                >
                  <span>
                    <i className="bi bi-box-seam"></i>
                  </span>{" "}
                  Orders
                </div>
                <div
                  className="manage-button back-home-button"
                  onClick={backToHome}
                >
                  <span>
                    <i className="bi bi-house-fill"></i>
                  </span>{" "}
                  Back to Home
                </div>
                <div 
                className="manage-button settings-button"
                onClick={() => changeAdminView("settings")}
                id="settingsView"
                
                >
                  <span>
                    <i
                      className="bi bi-nut-fill"
                    ></i>
                  </span>{" "}
                  Settings
                </div>
              </div>
            </div>
            <div className="admin-side-bar-mobile-button box-shadow" onClick={handleOpenMenu}>
            <i className="bi bi-sliders"></i>
            </div>
            <div className="pt-4 roboto manage-views-container col-lg-10">
              <div className="manage-views-content">
                {postsViewActive && <div className="create-post form-body box-shadow-2 mt-3 mb-5">
                  <h3 className="text-center roboto">Manage Posts</h3>
                  <div className="horizontal-line-gray"></div>
                  <div className="col-lg-9 m-auto">
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={handleCreatePostFormOpen}
                        className="btn-site-blue roboto d-flex align-items-center justify-content-center gap-2 mb-3"
                        style={{ width: `100%` }}
                      >
                        <i
                          className="bi bi-plus-circle"
                          style={{ fontSize: `1.3rem` }}
                        ></i>
                        <p style={{ marginBottom: 0 }}>New Post</p>
                      </button>
                    </div>
                    <div className="form-body all-posts-list-container box-shadow-2">
                      <h4 className="text-center roboto mt-2">Art Lessons</h4>
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
                              postType = "Art Lesson";
                            } else if (p.isUpdate === true) {
                              postType = "News/Update";
                            }
                            return (
                              <tr>
                                <td>{p.postTitle}</td>
                                <td>
                                  <div className="d-flex justify-content-center gap-1">
                                    <button
                                      className="btn-site-blue roboto table-button-small"
                                      onClick={() => handleUpdateFormOpen(p._id)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn-site-cancel roboto table-button-small"
                                      onClick={() => deletePost(p._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="form-body all-posts-list-container box-shadow-2 mt-3 mb-3">
                      <h4 className="text-center roboto mt-2">News & Updates</h4>
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
                              postType = "Art Lesson";
                            } else if (p.isUpdate === true) {
                              postType = "News/Update";
                            }
                            return (
                              <tr>
                                <td>{p.postTitle}</td>
                                <td>
                                  <div className="d-flex justify-content-center gap-1">
                                    <button
                                      className="btn-site-blue roboto table-button-small"
                                      onClick={() => handleUpdateFormOpen(p._id)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn-site-cancel roboto table-button-small"
                                      onClick={() => deletePost(p._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>}
                {productsViewActive && <div className="manage-products form-body box-shadow-2 mt-3 mb-5">
                  <h3 className="text-center roboto">Manage Products</h3>
                  <div className="horizontal-line-gray"></div>
                  <div className="col-lg-9 m-auto">
                    <ul>
                      <li>Add/remove a discount price for all products</li>
                      <li>
                        Create discount codes that when used lower the price on
                        the cart menu?
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        onClick={handleCreateProductFormOpen}
                        className="btn-site-blue roboto d-flex align-items-center justify-content-center gap-2 mb-3"
                        style={{ width: `100%` }}
                      >
                        <i
                          className="bi bi-plus-circle"
                          style={{ fontSize: `1.3rem` }}
                        ></i>
                        <p style={{ marginBottom: 0 }}>New Product</p>
                      </button>
                    </div>
                    <div className="form-body all-posts-list-container box-shadow-2 mb-3">
                      <h4 className="text-center roboto mt-2">All Products</h4>
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
                                    <button
                                      className="btn-site-blue roboto table-button-small"
                                      onClick={() =>
                                        handleOpenProductEditForm(prod._id)
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn-site-cancel roboto table-button-small"
                                      onClick={() => deleteProduct(prod._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>}
                {ordersViewActive && <div className="manage-products form-body box-shadow-2 mt-3 mb-5">
                  <h3 className="text-center roboto">Manage Orders</h3>
                  <div className="horizontal-line-gray"></div>
                  <div className="col-lg-9 m-auto">
                    <ul>
                      <li>Add tracking number to orders</li>
                      <li>When order is checked completed, notify customer</li>
                      <li>Refund/cancel orders here?</li>
                    </ul>
                    <div className="form-body all-posts-list-container box-shadow-2 mb-3">
                      <h4 className="text-center roboto mt-2">Open Orders</h4>
                      <div className="horizontal-line-gray"></div>
                      
                    </div>
                    <div className="form-body all-posts-list-container box-shadow-2 mt-4 mb-3">
                      <h4 className="text-center roboto mt-2">Completed Orders</h4>
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
                                    <button
                                      className="btn-site-blue roboto table-button-small"
                                      onClick={() =>
                                        handleOpenProductEditForm(prod._id)
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn-site-cancel roboto table-button-small"
                                      onClick={() => deleteProduct(prod._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>}
                {settingsViewActive && <div>
                
                  </div>}
              </div>
              {createPostFormOpen && (
                <CreatePostForm
                  setCreatePostFormOpen={setCreatePostFormOpen}
                  setPostTitleError={setPostTitleError}
                  setPostTypeError={setPostTypeError}
                  postTitleError={postTitleError}
                  postTypeError={postTypeError}
                />
              )}
              {updateFormOpen && (
                <UpdatePostForm
                  setUpdateFormOpen={setUpdateFormOpen}
                  setPostTitleError={setPostTitleError}
                  setPostTypeError={setPostTypeError}
                  postTitleError={postTitleError}
                  postTypeError={postTypeError}
                  onePost={onePost}
                  setChangesMade={setChangesMade}
                />
              )}
              {createProductFormOpen && (
                <CreateProductForm
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
                />
              )}
              {updateProductFormOpen && (
                <UpdateProductForm
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
                />
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default AdminPage;
