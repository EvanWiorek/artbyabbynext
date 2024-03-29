import Head from "next/head";
import Layout from "@/src/components/Layout";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import data from "@/src/utils/data";
import { Store } from "@/src/utils/Store";
import { Flip, toast } from "react-toastify";
import ReactImageMagnify from "react-image-magnify";
import axios from "axios";

import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from "@/src/models/product.model";

export const getServerSideProps = async (context) => {
  const routeId = context.params.productId
  try {
    await connectMongoDB();
    const productData = await Product.findOne({ _id: routeId });
    return {
      props: {
        productData: JSON.parse(JSON.stringify(productData))
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

const ProductDetails = ({ productData }) => {
  // const { query } = useRouter();
  // const { _id } = query;
  // const productData = data.products.find((p) => p._id === _id);
  const { state, dispatch } = useContext(Store);
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const [productDataLoaded, setProductDataLoaded] = useState(false);
  const [productName, setProductName] = useState(productData.name);
  const [productPrice, setProductPrice] = useState(productData.priceOptions[0].price);
  const [shippingCost, setShippingCost] = useState(productData.shippingCost)
  const [productPriceOption, setProductPriceOption] = useState('');
  const [additionalOption, setAdditionalOption] = useState('');
  const [productPriceOptionError, setProductPriceOptionError] = useState('');
  const [additionalOptionError, setAdditionalOptionError] = useState('');
  const [productImage, setProductImage] = useState(productData.images[0]);
  const [mainImage, setMainImage] = useState(productData.images[0]);

  let formIsValid = false;
  formIsValid = productPriceOptionError === null && additionalOptionError === null;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setContentIsVisible(entry.isIntersecting);
    });
    observer.observe(myRef.current);

    if (contentIsVisible) {
      document.querySelector(".page-content").style = "opacity: 1;";
    } else {
      document.querySelector(".page-content").style = "opacity: 0;";
    }

    if (productData) {
      const hasPriceOptions = productData.priceOptions.length > 1
      const hasAdditionalOptions = productData.additionalOptions.length > 0

      if (hasPriceOptions && hasAdditionalOptions) {
        setProductPriceOptionError("Select a price")
        setAdditionalOptionError("Select an option")
      }
      if (hasPriceOptions && !hasAdditionalOptions) {
        setProductPriceOptionError("Select a price")
        setAdditionalOptionError(null)
      }
      if (!hasPriceOptions && hasAdditionalOptions) {
        setProductPriceOptionError(null)
        setAdditionalOptionError("Select an option")
      }
      if (!hasPriceOptions && !hasAdditionalOptions) {
        setProductPriceOptionError(null)
        setAdditionalOptionError(null)
      }


      setProductDataLoaded(true);
      const imagesArray = document.querySelectorAll(".side-images-img");
      for (let i = 1; i < imagesArray.length; i++) {
        document.getElementById(`${imagesArray[0].id}`).classList.add('img-active')
        document.getElementById(`${imagesArray[i].id}`).style = "opacity: .5"
      }
    }

    if (!productData) {
      setProductDataLoaded(false);
    }

  }, [contentIsVisible]);


  const handlePriceOptions = (e) => {
    const priceOptionName = e.target.value;
    const selectedPriceOption = productData.priceOptions.filter((po) => po.optionName === priceOptionName)[0]
    setProductPriceOption(selectedPriceOption);
    setProductPrice(selectedPriceOption.price)
    const optionImg = selectedPriceOption.images[0]
    if (productData.priceOptions[0].images.length > 0) {
      changeMainPicture(optionImg)
    }
    setProductPriceOptionError(null)
  };

  const handleAdditionalOption = (e) => {
    const optionTwoName = e.target.value;
    const selectedAdditionalOption = productData.additionalOptions.filter((ao) => ao.optionName === optionTwoName)[0]
    setAdditionalOption(selectedAdditionalOption)
    // console.log(selectedAdditionalOption);
    const optionImg = selectedAdditionalOption.images[0]
    if (productData.additionalOptions[0].images.length > 0) {
      changeMainPicture(optionImg)
    }
    setAdditionalOptionError(null)
  }

  const changeMainPicture = (imgUrl) => {
    setMainImage(imgUrl)
    const imagesArray = document.querySelectorAll(".side-images-img");
    for (let i = 0; i < imagesArray.length; i++) {
      document.getElementById(`${imagesArray[i].id}`).classList.remove('img-active')
      document.getElementById(`${imagesArray[i].id}`).style = "opacity: .5"
    }
    document.getElementById(`${imgUrl}`).classList.add('img-active')
  };

  const handleOpenCartDesktop = () => {
    document.querySelector(".cart-menu-body").style = "width: 20%;"
    document.querySelector(".screen-darken").style = "display: block"
    setTimeout(() => document.querySelector(".screen-darken").style = "display: block; opacity: 1", 100)
    setTimeout(() => document.querySelector(".cart-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".cart-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 20%;", 200)
  }

  const handleOpenCartMobile = () => {
    document.querySelector(".mobile-menu-content").style = "display: none"
    document.querySelector(".cart-menu-body").style = "width: 80vw;"
    document.querySelector(".screen-darken").style = "display: block"
    setTimeout(() => document.querySelector(".screen-darken").style = "display: block; opacity: 1", 100)
    setTimeout(() => document.querySelector(".cart-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".cart-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 80vw;", 200)
  }

  const handleAddToCart = (e, mediaType) => {
    e.preventDefault();
    const compiledProduct = {
      productName: productName,
      productImage: productImage,
      originalId: productData._id,
      tempId: `${productData._id}-${productPriceOption.optionName}-${additionalOption.optionName}`,
      productPriceOption: productPriceOption,
      shippingCost: shippingCost,
      countInStock: productData.countInStock,
      additionalOption: additionalOption,
      productPrice: productPrice
    }

    if (formIsValid === true) {
      const existItem = state.cart.cartItems.find(
        (product) => product.tempId === compiledProduct.tempId
      );
      const quantity = existItem ? existItem.quantity + 1 : 1;

      if (productData.countInStock < quantity) {
        toast(`Sorry, ${productName} is out of stock.`);
        return;
      }

      dispatch({ type: "CART_ADD_ITEM", payload: { ...compiledProduct, quantity } });

      if (mediaType === 'desktop') {
        handleOpenCartDesktop();
      }
      else if (mediaType === 'mobile') {
        handleOpenCartMobile();
      }
    }

    else if (formIsValid !== true) {
      if (formIsValid !== true) {
        toast(`Please select the required options.`)
      }
    }

  };

  return (
    <Layout>
      <Head>{/* <title>{product.name} | Art by Abby</title> */}</Head>
      <main ref={myRef} className="page-content">
        {productDataLoaded && (
          <div className="body-color" style={{ paddingTop: `100px` }}>
            <div className="product-details-container mt-3 pb-5 m-auto">
              <form onSubmit={(e) => handleAddToCart(e)} className="roboto">
                <div className="d-flex gap-3 flex-column-small">

                  <img src={mainImage} alt={productData._id} className="desktop-hide mobile-main-image" />

                  <div className="images-viewer d-flex-alt">
                    <div
                      className="side-images d-flex flex-column-large gap-2"
                      style={{ marginRight: `5px` }}
                    >
                      {productData.images.map((image, idx) => (
                        <img src={image} alt={productData.name} key={idx} id={image} onMouseOver={() => changeMainPicture(image)} className="side-images-img" />
                      ))}
                      {productData.priceOptions.length > 1
                        ? productData.priceOptions.map((option) =>
                          option.images.map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt={option.optionName}
                              id={image}
                              onMouseOver={() => changeMainPicture(image)}
                              className="side-images-img"
                            />
                          ))
                        )
                        : ""}

                      {productData.additionalOptions.length > 1
                        ? productData.additionalOptions.map((option) =>
                          option.images.map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt={option.optionName}
                              id={image}
                              onMouseOver={() => changeMainPicture(image)}
                              className="side-images-img"
                            />
                          ))
                        )
                        : ""}
                    </div>
                    <div className="main-image mobile-hide">
                      <ReactImageMagnify {...{
                        smallImage: {
                          alt: productData._id,
                          isFluidWidth: true,
                          src: mainImage
                        },
                        largeImage: {
                          src: mainImage,
                          width: 850,
                          height: 1000
                        }
                      }} />
                    </div>
                  </div>
                  <div className="product-page-middle">
                    <h1 className="roboto" style={{ fontWeight: `100`, marginBottom: 0 }}>
                      {productData.name}
                    </h1>

                    <br />
                    {productData.priceOptions.length > 1
                      ? (
                        <div className="form-group">
                          <label htmlFor="productPriceOption">
                            {productData.priceOptions[0].optionType} <span style={{ color: `rgb(206, 139, 139)` }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            id="priceOptions"
                            onChange={handlePriceOptions}
                            style={{ fontWeight: 300 }}
                          >
                            <option hidden disabled selected value="">
                              Select an option
                            </option>
                            {productData.priceOptions.map((po, idx) => (
                              <option
                                value={po.optionName}
                                key={idx}
                                style={{ fontWeight: 300 }}
                              >
                                {po.optionName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )
                      : ("")
                    }

                    {productData.additionalOptions.length > 1
                      ? (
                        <div className="form-group mt-3">
                          <label htmlFor="productPriceOption">
                            {productData.additionalOptions[0].optionType} <span style={{ color: `rgb(206, 139, 139)` }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            id="additionalOption"
                            onChange={handleAdditionalOption}
                            style={{ fontWeight: 300 }}
                          >
                            <option hidden disabled selected value="">
                              Select an option
                            </option>
                            {productData.additionalOptions.map((po, idx) => (
                              <option
                                value={po.optionName}
                                key={idx}
                                style={{ fontWeight: 300 }}
                              >
                                {po.optionName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )
                      : ("")
                    }
                    <div className="horizontal-line-gray"></div>
                    <div className="description-container">
                      <h5 className="roboto" style={{ fontWeight: `300` }}>
                        Details
                      </h5>
                      <p className="roboto" style={{ fontWeight: `300` }}>
                        {productData.description}
                      </p>
                    </div>
                  </div>
                  <div className="right add-to-cart-container col-lg-2 mobile-hide">
                    <h2 className="roboto" style={{ fontWeight: `100` }}>
                      {
                        isNaN(productPrice) ? `$${productPrice}.00` : `$${productPrice.toFixed(2)}`
                      }
                    </h2>
                    <button
                      className="btn-site-blue roboto"
                      style={{ width: `100%` }}
                      onClick={(e) => handleAddToCart(e, 'desktop')}
                    >Add to Cart</button>
                  </div>

                  <div className="add-to-cart-container desktop-hide">
                    <button
                      className="btn-site-blue roboto"
                      style={{ width: `100%`, fontSize: `1.4rem`, fontWeight: `100` }}
                      onClick={(e) => handleAddToCart(e, 'mobile')}
                    >Add to Cart - 
                      {
                        isNaN(productPrice) ? `$${productPrice}.00` : `$${productPrice.toFixed(2)}`
                      }
                      </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ProductDetails;
