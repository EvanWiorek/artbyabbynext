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
import allproducts from "./allproducts";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false);
  const [createProductFormOpen, setCreateProductFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateProductFormOpen, setUpdateProductFormOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const passwordString = "ArtByAbby63Df"

  //AbbyPost
  const [postTitleError, setPostTitleError] = useState("");
  const [postTypeError, setPostTypeError] = useState("");
  const [allLessons, setAllLessons] = useState([]);
  const [allUpdates, setAllUpdates] = useState([]);
  const [onePost, setOnePost] = useState();

  //Products
  const [productNameError, setProductNameError] = useState();
  const [productImagesError, setProductImagesError] = useState();
  const [productSlugError, setProductSlugError] = useState();
  const [productShippingCostError, setProductShippingCostError] = useState();
  const [productCategoryError, setProductCategoryError] = useState();
  const [productCountInStockError, setProductCountInStockError] = useState();
  const [productPriceOptionsError, setProductPriceOtionsError] = useState();
  const [oneProduct, setOneProduct] = useState();
  const [activeProducts, setActiveProducts] = useState(allProducts.filter((prod) => prod.countInStock > 0))
  const [outOfStockProducts, setUutOfStockProducts] = useState(allProducts.filter((prod) => prod.countInStock === 0))

  //Admin Views
  const [postsViewActive, setPostsViewActive] = useState(true);
  const [productsViewActive, setProductsViewActive] = useState(false);
  const [ordersViewActive, setOrdersViewActive] = useState(false);
  // const [settingsViewActive, setSettingsViewActive] = useState(false);

  //Orders
  const [selectedOrdersList, setSelectedOrdersList] = useState(
    allOrders.filter((order) => order.isShipped === false)
  );
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingNumberError, setTrackingNumberError] = useState("");
  const [deleteOrderModalOpen, setDeleteOrderModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState();

  const [changesMade, setChangesMade] = useState(false);

  let orderTrackingValid = false;
  orderTrackingValid = trackingNumberError === null;

  let loginIsValid = false;
  loginIsValid = adminPasswordError === null;

  useEffect(() => {
    setAllLessons(allPosts.filter((p) => p.isLesson === true));
    setAllUpdates(allPosts.filter((p) => p.isUpdate === true));

    console.log('cookies out: ', Cookies.get('loggedIn'));

    if (Cookies.get('loggedIn') != undefined) {
      setLoggedIn(true)
    }
  }, [changesMade]);

  const handleAdminPassword = (e) => {
    setAdminPassword(e.target.value)
    console.log(e.target.value);
    if (e.target.value !== passwordString) {
      setAdminPasswordError("Password is incorrect.")
    }
    else {
      setAdminPasswordError(null)
    }
  }

  const handleLogin = () => {
    if (loginIsValid === true) {
      setLoggedIn(true);

      Cookies.set('loggedIn', true)
    }
    else {
      setAdminPasswordError("Password is incorrect.")
    }
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
    router.reload(window.location.pathname)
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
    if (adminView === "posts") {
      setPostsViewActive(true);
      setProductsViewActive(false);
      setOrdersViewActive(false);
      // setSettingsViewActive(false);

      document
        .getElementById("postsView")
        .classList.add("manage-button-active");
      document
        .getElementById("productsView")
        .classList.remove("manage-button-active");
      document
        .getElementById("ordersView")
        .classList.remove("manage-button-active");
      // document
      //   .getElementById("settingsView")
      //   .classList.remove("manage-button-active");
    }
    if (adminView === "products") {
      setPostsViewActive(false);
      setProductsViewActive(true);
      setOrdersViewActive(false);
      // setSettingsViewActive(false);

      document
        .getElementById("postsView")
        .classList.remove("manage-button-active");
      document
        .getElementById("productsView")
        .classList.add("manage-button-active");
      document
        .getElementById("ordersView")
        .classList.remove("manage-button-active");
      // document
      //   .getElementById("settingsView")
      //   .classList.remove("manage-button-active");
    }
    if (adminView === "orders") {
      setPostsViewActive(false);
      setProductsViewActive(false);
      setOrdersViewActive(true);
      // setSettingsViewActive(false);

      document
        .getElementById("postsView")
        .classList.remove("manage-button-active");
      document
        .getElementById("productsView")
        .classList.remove("manage-button-active");
      document
        .getElementById("ordersView")
        .classList.add("manage-button-active");
      // document
      //   .getElementById("settingsView")
      //   .classList.remove("manage-button-active");
    }
    // if (adminView === "settings") {
    //   setPostsViewActive(false);
    //   setProductsViewActive(false);
    //   setOrdersViewActive(false);
    //   setSettingsViewActive(true);

    //   document
    //     .getElementById("postsView")
    //     .classList.remove("manage-button-active");
    //   document
    //     .getElementById("productsView")
    //     .classList.remove("manage-button-active");
    //   document
    //     .getElementById("ordersView")
    //     .classList.remove("manage-button-active");
    //   document
    //     .getElementById("settingsView")
    //     .classList.add("manage-button-active");
    // }

    if (document.querySelector(".screen-darken").style.display === "block") {
      handleCloseMenu();
    }
  };

  const changeOrdersView = (bool) => {
    setSelectedOrdersList(
      allOrders.filter((order) => order.isShipped === bool)
    );

    document
      .getElementById(`${bool}IsShipped`)
      .classList.add("orders-list-active");

    document
      .getElementById(`${!bool}IsShipped`)
      .classList.remove("orders-list-active");
  };

  const handleCloseMenu = () => {
    document.querySelector(".admin-side-bar-body").style =
      "display: block; left: -100%";
    document.querySelector(".admin-side-bar-content").style = "opacity: 0;";
    document.querySelector(".admin-side-bar-mobile-button").style =
      "display: block; opacity: 0";

    setTimeout(
      () =>
      (document.querySelector(".admin-side-bar-body").style =
        "display: none;"),
      600
    );

    setTimeout(
      () =>
      (document.querySelector(".admin-side-bar-content").style =
        "display: none;"),
      600
    );

    setTimeout(
      () =>
      (document.querySelector(".admin-side-bar-mobile-button").style =
        "display: block; opacity: 1"),
      200
    );

    setTimeout(
      () =>
      (document.querySelector(".screen-darken").style =
        "left: -100%; display: block; transition: .2s"),
      200
    );

    setTimeout(
      () => (document.querySelector(".screen-darken").style = "display: none"),
      600
    );
  };

  const handleOpenMenu = () => {
    document.querySelector(".admin-side-bar-body").style =
      "display: block; left: -100%;";
    document.querySelector(".admin-side-bar-content").style = "display: block;";
    document.querySelector(".admin-side-bar-mobile-button").style =
      "opacity: 0";
    document.querySelector(".screen-darken").style =
      "display: block; left: -100%;";

    setTimeout(
      () =>
      (document.querySelector(".screen-darken").style =
        "display: block; left: 0"),
      100
    );

    setTimeout(
      () =>
      (document.querySelector(".admin-side-bar-body").style =
        "display: block; left: 0; backdrop-filter: blur(25px) brightness(115%)"),
      1
    );

    setTimeout(
      () =>
      (document.querySelector(".admin-side-bar-mobile-button").style =
        "display: none"),
      200
    );
  };

  const openDeleteOrderModal = (orderId) => {
    setOrderToDelete(orderId)
    document.querySelector(".admin-page-dark").style = "display: block;";
    setTimeout(
      () =>
      (document.querySelector(".admin-page-dark").style =
        "opacity: 1; display: block;"),
      1
    );

    setDeleteOrderModalOpen(true);
  }

  const handleCloseDeleteOrderModal = () => {
    document.querySelector(".admin-page-dark").style = "opacity: 0";
    setTimeout(
      () =>
      (document.querySelector(".admin-page-dark").style =
        "opacity: 0; display: none"),
      600
    );

    setDeleteOrderModalOpen(false);
  }

  const handleTrackingNumber = (e) => {
    setTrackingNumber(e.target.value)
    if (e.target.value.length < 5) {
      setTrackingNumberError("Please add a valid tracking number.")
    }
    else if (e.target.value === "") {
      setTrackingNumberError("Please add a valid tracking number.")
    }
    else {
      setTrackingNumberError(null)
    }
  }

  const updateOrder = (order) => {
    console.log(order);
    if (orderTrackingValid === true) {
      axios.post(`/api/orders/update/${order._id}`, {
        isShipped: true,
        trackingNumber: trackingNumber
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

        const completedOrder = order._id

        setSelectedOrdersList(selectedOrdersList.filter((order) => order._id !== completedOrder))

        router.replace(router.asPath);

        setTrackingNumber("");
        setTrackingNumberError("");


      Email.send({
        Host: "smtp.elasticemail.com",
        Username: 'artbyabbystore@gmail.com',
        Password: "7C3910F614C948FBFB64543DB30349BCF6FB",
        To: `${order.customerInfo.email}`,
        From: 'artbyabbystore@gmail.com',
        Subject: `Your order has shipped! - Art By Abby - ${order._id}`,
        Body: `
        <div style="width: 40%; margin: 0 auto; font-family: Trebuchet MS; font-size: 1rem; font-weight: 100;">
        <div style="text-align: center;">
          <img src="https://ci3.googleusercontent.com/proxy/ISWk4XgrVMPDFscKfJjxO1J3oDT2yV7SnOOFO3o-aSMOwz2HY-bemqhUBwb3mWOA5zg=s0-d-e1-ft#https://i.imgur.com/7ueOWLt.png" alt="logo" style="width: 80px;">
          <h2 style="font-weight: 100;">Shipping Confirmation</h2>
        </div>
        <div style="height: .5px; width: 100%; background-color: rgba(0,0,0,.1); margin-top: 10px; margin-bottom: 10px;">
        </div>
        <h3 style="font-weight: 100;">Hi ${order.customerInfo.fullName},</h3>
        <h2 style="text-align: center; font-weight: 100;">Your order has shipped!</h2>
        <h4>
          <span style="color: rgba(0,0,0,.5)">Order ID:</span>
          <a href="https://artbyabby.app/orders${order._id}"
            style="color: rgb(206, 139, 139); text-decoration: none;">${order._id}</a>
        </h4>
        <h4 style="font-weight: 100;"><span style="color: rgba(0,0,0,.5)">Tracking Number:</span> ${trackingNumber}
        </h4>
        <br>
        <div style="width: 100%; padding: 10px 0px; border: 0; background-color: rgb(206, 139, 139); text-align: center;">
          <a href="https://google.com/search?q=${trackingNumber}" style="color: white; text-decoration: none; font-weight: 100;">Track
            Order</a>
        </div>
        <br>
        <h4 style="text-align: center; font-weight: 100;">Thank you again for your order, and we hope to see you again soon!</h4>
        <br>
        <br>
      </div>
          `
      })
        .then(
          message => {
            if (message === 'OK') {
              toast.success(`Shipping notification sent to ${order.customerInfo.email}`)
            }
            else {
              toast.error(message)
            }
          }
        )

    }
    else {
      setTrackingNumberError("Please add a valid tracking number.")
    }
  }

  const deleteOrder = () => {
    axios
      .post(`/api/orders/delete/${orderToDelete}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleCloseDeleteOrderModal()

    setSelectedOrdersList(selectedOrdersList.filter((order) => order._id !== orderToDelete))

    router.replace(router.asPath);
  };

  return (
    <>
      <Head>
        <title>Admin Page | Art by Abby</title>
      </Head>
      <main ref={myRef}>

        <div className="admin-page-dark" style={{ display: `none` }}></div>
        {loggedIn === false ?
          (<div>
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
                    value={adminPassword}
                    onChange={handleAdminPassword}
                    placeholder="p"
                    className="form-control thin-control"
                  />
                  <label htmlFor="adminPassword">Password</label>
                  {adminPasswordError ? (
                    <p style={{ color: "rgb(206, 139, 139)" }} className="mt-1">
                      {adminPasswordError}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="btn-site-blue roboto mt-3"
                  style={{ width: `100%` }}
                  onClick={handleLogin}
                >
                  Access Page
                </button>
              </div>
            </div>
          </div>)
          : ("")
        }

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
                  <h5 className="roboto p-3" style={{ marginBottom: 0 }}>
                    Admin Page
                  </h5>
                  <p
                    onClick={handleCloseMenu}
                    className="desktop-hide"
                    style={{
                      marginTop: `-22px`,
                      marginLeft: `10px
                  `,
                      marginRight: `10px`,
                      cursor: `pointer`,
                    }}
                  >
                    <i
                      className="bi bi-x-lg close-cart-menu"
                      style={{ color: `rgb(124, 126, 128)` }}
                    ></i>
                  </p>
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
                {/* <div
                  className="manage-button settings-button"
                  onClick={() => changeAdminView("settings")}
                  id="settingsView"
                >
                  <span>
                    <i className="bi bi-nut-fill"></i>
                  </span>{" "}
                  Settings
                </div> */}
              </div>
            </div>
            <div
              className="admin-side-bar-mobile-button box-shadow"
              onClick={handleOpenMenu}
            >
              <i className="bi bi-sliders"></i>
            </div>
            <div className="pt-4 roboto manage-views-container col-lg-10">
              <div className="manage-views-content">
                {postsViewActive && (
                  <div className="create-post mt-3 mb-5">
                    <h2 className="text-center roboto mb-4">Manage Posts</h2>
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

                        <div className="art-lessons-table col-11 justify-content-center m-auto">
                          <div className="d-flex justify-content-between">
                            <h5 className="roboto">Post Title</h5>
                            <h5 className="roboto" style={{ marginRight: `50px` }}>Actions</h5>
                          </div>
                        </div>

                        {allLessons.length < 1
                        ? (<p className="text-center">No lessons to display.</p>)
                        : allLessons.map((p) => {
                          return (
                            <div className="col-11 m-auto">
                              <div className="horizontal-line-gray" style={{ marginBottom: `5px`, marginTop: `5px` }}></div>

                              <div className="d-flex justify-content-between gap-1">
                                <div className="left-side">
                                  <p>{p.postTitle}</p>
                                </div>
                                <div className="right-side">
                                  <div className="d-flex gap-3">
                                    <button
                                      className="btn-site-blue roboto table-button-small"
                                      onClick={() =>
                                        handleUpdateFormOpen(p._id)
                                      }
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
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="form-body all-posts-list-container box-shadow-2 mt-3 mb-3">
                        <h4 className="text-center roboto mt-2">
                          News & Updates
                        </h4>
                        <div className="horizontal-line-gray"></div>

                        <div className="updates-table col-11 justify-content-center m-auto">
                          <div className="d-flex justify-content-between">
                            <h5 className="roboto">Post Title</h5>
                            <h5 className="roboto" style={{ marginRight: `50px` }}>Actions</h5>
                          </div>
                        </div>

                        {allUpdates.length < 1
                        ? (<p className="text-center">No updates to display.</p>)
                        : allUpdates.map((p) => (
                          <div className="col-11 m-auto">
                            <div className="horizontal-line-gray" style={{ marginBottom: `5px`, marginTop: `5px` }}></div>

                            <div className="d-flex justify-content-between gap-2">
                              <div className="left-side">
                                <p>{p.postTitle}</p>
                              </div>
                              <div className="right-side">
                                <div className="d-flex gap-3">
                                  <button
                                    className="btn-site-blue roboto table-button-small"
                                    onClick={() =>
                                      handleUpdateFormOpen(p._id)
                                    }
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
                              </div>
                            </div>

                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                )}
                {productsViewActive && (
                  <div className="manage-products mt-3 mb-5">
                    <h2 className="text-center roboto mb-4">Manage Products</h2>
                    <div className="col-lg-9 m-auto">
                      <div className="" style={{ width: `100vw` }}></div>
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
                        <h4 className="text-center roboto mt-2">
                          Active Products
                        </h4>
                        <div className="horizontal-line-gray"></div>

                        <div className="products-table col-11 justify-content-center m-auto">
                          <div className="d-flex justify-content-between">
                            <h5 className="roboto">Product Name</h5>
                            <h5 className="roboto" style={{ marginRight: `50px` }}>Actions</h5>
                          </div>
                          { activeProducts.length < 1 
                          ? (<p className="text-center">No products to display.</p>)
                          : activeProducts.map((prod) => (
                            <div className="">
                              <div className="horizontal-line-gray" style={{ marginBottom: `5px`, marginTop: `5px` }}></div>
                              <div className="d-flex justify-content-between">
                                <div className="left-side">
                                  <p>{prod.name}</p>
                                </div>
                                <div className="right-side">
                                  <div className="d-flex gap-3">
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
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="form-body all-posts-list-container box-shadow-2 mb-3">
                        <h4 className="text-center roboto mt-2">
                          Out of Stock
                        </h4>
                        <div className="horizontal-line-gray"></div>

                        <div className="products-table col-11 justify-content-center m-auto">
                          <div className="d-flex justify-content-between">
                            <h5 className="roboto">Product Name</h5>
                            <h5 className="roboto" style={{ marginRight: `50px` }}>Actions</h5>
                          </div>
                          {outOfStockProducts.length < 1
                          ? (<p className="text-center">No products out of stock.</p>) 
                          : outOfStockProducts.map((prod) => (
                            <div className="">
                              <div className="horizontal-line-gray" style={{ marginBottom: `5px`, marginTop: `5px` }}></div>
                              <div className="d-flex justify-content-between">
                                <div className="left-side">
                                  <p>{prod.name}</p>
                                </div>
                                <div className="right-side">
                                  <div className="d-flex gap-3">
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
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {ordersViewActive && (
                  <div
                    className="manage-orders mt-3 mb-5"
                  >
                    <h2 className="text-center roboto mb-4">Manage Orders</h2>
                    <div className="col-lg-9 m-auto">

                      <div className="orders-list form-body box-shadow-2 mb-3 p-2">
                        <div className="d-flex gap-1 orders-list-menu">
                          <p
                            className="orders-list-active d-flex align-items-center gap-2"
                            id="falseIsShipped"
                            onClick={() => changeOrdersView(false)}
                          >
                            New{" "}
                            <span>
                              {
                                allOrders.filter(
                                  (order) => order.isShipped === false
                                ).length
                              }
                            </span>
                          </p>
                          <p
                            className="d-flex align-items-center gap-2"
                            id="trueIsShipped"
                            onClick={() => changeOrdersView(true)}
                          >
                            Completed{" "}
                            <span>
                              {
                                allOrders.filter(
                                  (order) => order.isShipped === true
                                ).length
                              }
                            </span>
                          </p>
                        </div>
                        <div className="orders-list-view">
                          {selectedOrdersList.length > 0 ? (
                            selectedOrdersList.map((order, idx) => (
                              <div key={idx}>
                                <div className="card mb-2 orders-list-order">
                                  <div className="card-header">
                                    <div className="d-flex gap-large flex-column-small">
                                      <div className="order-info d-flex-small gap-small">
                                        <p
                                          style={{
                                            fontSize: `.9rem`,
                                            marginBottom: 0,
                                          }}
                                        >
                                          Order Placed
                                        </p>
                                        <p
                                          style={{
                                            color: `rgba(0,0,0,.5)`,
                                            fontSize: `.8rem`,
                                            marginBottom: 0,
                                          }}
                                        >
                                          {dayjs(order.createdAt).format(
                                            "MMMM D, YYYY"
                                          )}
                                        </p>
                                      </div>
                                      <div className="order-info d-flex-small gap-small">
                                        <p
                                          style={{
                                            fontSize: `.9rem`,
                                            marginBottom: 0,
                                          }}
                                        >
                                          Total
                                        </p>
                                        <p
                                          style={{
                                            color: `rgba(0,0,0,.5)`,
                                            fontSize: `.8rem`,
                                            marginBottom: 0,
                                          }}
                                        >
                                          ${order.cartTotal}
                                        </p>
                                      </div>
                                      <div className="order-info d-flex-small flex-column-small">
                                        <p
                                          style={{
                                            fontSize: `.9rem`,
                                            marginBottom: 0,
                                          }}
                                        >
                                          Order ID
                                        </p>
                                        <p
                                          style={{
                                            color: `rgba(0,0,0,.5)`,
                                            fontSize: `.8rem`,
                                            marginBottom: 0,
                                          }}
                                        >
                                          {order._id}
                                        </p>
                                      </div>
                                      <p className="mobile-hide tablet-show delete-order-desktop" onClick={() => openDeleteOrderModal(order._id)}><i class="bi bi-trash-fill" ></i> Delete Order</p>

                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <div className="order-info-body d-flex flex-column-small gap-small">
                                      <div className="order-list">
                                        {order.orderItems.map((orderItem, idx) => (
                                          <div className="order-items d-flex gap-3 mb-3" key={idx}>
                                            <img
                                              src={orderItem.productImage}
                                              alt={orderItem.productName}
                                            />
                                            <div>
                                              <p>Quantity: {orderItem.quantity}</p>
                                              <p>{orderItem.additionalOption.optionName === undefined ? "" : `${orderItem.additionalOption.optionType}: ${orderItem.additionalOption.optionName}`}</p>
                                              <p>{orderItem.productPriceOption.optionName === undefined ? "" : `${orderItem.productPriceOption.optionType}: ${orderItem.productPriceOption.optionName}`}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="order-shipping-info">
                                        <div className="">
                                          <p><b>Shipping to:</b></p>
                                          <p>{order.customerInfo.fullName}</p>
                                          <p>{order.customerInfo.address}</p>
                                          <p>{order.customerInfo.city}, {order.customerInfo.userState} {order.customerInfo.postalCode}</p>
                                        </div>
                                        <div className="mt-3 mb-2">
                                          <p><b>Contact Info:</b></p>
                                          <p>{order.customerInfo.email}</p>
                                          <p>{order.customerInfo.phoneNumber}</p>
                                        </div>
                                      </div>
                                      <div className="order-actions">

                                        {order.isShipped === false ? (
                                          <div>
                                            <div className="form-floating thin-floating">
                                              <input type="text" placeholder="p" name="trackingNumber" value={trackingNumber}
                                                onChange={handleTrackingNumber} className="form-control thin-control square-control" />
                                              <label htmlFor="trackingNumber">Tracking Number:</label>
                                              {trackingNumberError ? (
                                                <p style={{ color: `rgb(206, 139, 139)`, marginBottom: 0 }} className="mt-1">
                                                  {trackingNumberError}
                                                </p>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <button type="button" className="btn-site-blue roboto mt-3" style={{ width: `100%` }} onClick={() => updateOrder(order)}>Add Tracking Number</button>
                                          </div>
                                        ) : (
                                          <div className="tracking-info">
                                            <p><b>Tracking Number:</b></p>
                                            <p>{order.trackingNumber}</p>
                                            <br />
                                            <p><b>Order Completed:</b></p>
                                            <p>{dayjs(order.updatedAt).format("MMM DD, YYYY")}</p>
                                          </div>
                                        )}



                                        <div className="desktop-hide">
                                          <div className="horizontal-line-gray"></div>
                                          <button className="roboto btn-site-cancel" style={{ width: `100%` }} onClick={() => openDeleteOrderModal(order._id)}><i class="bi bi-trash-fill"></i> Delete Order</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center">No orders to display.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* {settingsViewActive && <div></div>} */}
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
                  productShippingCostError={productShippingCostError}
                  setProductShippingCostError={setProductShippingCostError}
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
                  productShippingCostError={productShippingCostError}
                  setProductShippingCostError={setProductShippingCostError}
                />
              )}

              {deleteOrderModalOpen && (
                <div>
                  <div className="admin-page-dark"></div>
                  <div className="admin-card box-shadow roboto small-card">
                    <div className="admin-card-header text-center roboto p-3">
                      <h3 className="roboto">Delete Order</h3>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="admin-card-body p-4">
                      <div className="text-center">
                        <p>Are you sure you want to delete this order?</p>
                        <p style={{ fontSize: `1.2rem` }}><b>You will also need to refund the customer on Paypal's end.</b></p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn-site-cancel roboto mt-3"
                          style={{ width: `45%` }}
                          onClick={handleCloseDeleteOrderModal}
                        >
                          Cancel
                        </button>
                        <div style={{ width: `5%` }}></div>
                        <button
                          className="btn-site-blue roboto mt-3"
                          style={{ width: `45%` }}
                          onClick={deleteOrder}
                        >
                          Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default AdminPage;
