import Head from "next/head";
import Layout from "@/src/components/Layout";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import data from "@/src/utils/data";
import { Store } from "@/src/utils/Store";
import { toast } from "react-toastify";

// import { connectMongoDB } from "@/src/libs/MongoConnect";
// import AbbyPost from "@/src/models/post.model";

// export const getServerSideProps = async () => {
//   try {
//     console.log('FROM lessons.jsx PAGE');
//     await connectMongoDB();
//     const allLessons = await AbbyPost.find({ isLesson: true });
//     return {
//       props: {
//         allLessons: JSON.parse(JSON.stringify(allLessons))
//       }
//     }
//   }
//   catch (err) {
//     console.log(err);
//     return {
//       notFound: true
//     }
//   }
// }

const ProductDetails = () => {
  const { state, dispatch } = useContext(Store);
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const { query } = useRouter();
  const { slug } = query;
  const productData = data.products.find((p) => p.slug === slug);
  const [productDataLoaded, setProductDataLoaded] = useState();
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productPriceOption, setProductPriceOption] = useState();
  const [productOptionTwo, setProductOptionTwo] = useState();
  const [productImage, setProductImage] = useState();
  const [mainImage, setMainImage] = useState();

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
      setProductDataLoaded(true);
      const imagesArray = document.querySelectorAll(".side-images-img");
      for(let i = 1; i<imagesArray.length; i++) {
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
    const optionImg = selectedPriceOption.images[0]
    changeMainPicture(optionImg)
  };

  const changeMainPicture = (imgUrl) => {
    setMainImage(imgUrl)
    const imagesArray = document.querySelectorAll(".side-images-img");
    for(let i = 0; i<imagesArray.length; i++) {
      document.getElementById(`${imagesArray[i].id}`).classList.remove('img-active')
      document.getElementById(`${imagesArray[i].id}`).style = "opacity: .5"
    }
    document.getElementById(`${imgUrl}`).classList.add('img-active')
    document.getElementById(`${productData.slug}`).src = imgUrl
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    //need to change the 'productData' below to createdProduct or something
    const existItem = state.cart.cartItems.find(
      (p) => p.slug === productData.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    //if there is a stock number associated with each product
    if (productData.countInStock < quantity) {
      toast("Sorry, item is out of stock.");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...productData, quantity } });
  };

  return (
    <Layout>
      <Head>{/* <title>{product.name} | Art by Abby</title> */}</Head>
      <main ref={myRef} className="page-content">
        {productDataLoaded && (
          <div className="body-color" style={{ paddingTop: `100px` }}>
            <div className="product-details-container mt-3 pb-5 col-lg-9 m-auto">
              <div className="d-flex gap-4">
                <div className="images-viewer d-flex">
                  <div
                    className="side-images d-flex flex-column gap-2 mobile-hide"
                    style={{ marginRight: `10px` }}
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
                  </div>
                  <div className="main-image">
                    <img src={productData.images[0]} alt={productData.name} id={productData.slug} />
                  </div>
                </div>
                <div>
                  <h1 className="roboto" style={{ fontWeight: `100` }}>
                    {productData.name}
                  </h1>
                  <h4 className="roboto" style={{ fontWeight: `300` }}>
                    {productData.description}
                  </h4>
                  <br />
                  <form onSubmit={(e) => handleAddToCart(e)} className="roboto">
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
                    <br />
                    <br />
                    <input
                      type="submit"
                      className="btn-site-blue roboto"
                      value="Add to Cart"
                    />
                  </form>

                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ProductDetails;
