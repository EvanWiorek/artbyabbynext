import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import { toast } from "react-toastify";

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

export default function CreateProductForm({
  setCreateProductFormOpen,
  setProductNameError,
  setProductImagesError,
  setProductCategoryError,
  setProductCountInStockError,
  setProductPriceOtionsError,
  productNameError,
  productImagesError,
  productSlugError,
  productCategoryError,
  productCountInStockError }) {
  const [productName, setProductName] = useState();
  const [productImages, setProductImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [newImage, setNewImage] = useState();
  // const [imagesToUpload, setImagesToUpload] = useState([]);
  // const [createObjectURL, setCreateObjectURL] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productCountInStock, setProductCountInStock] = useState();
  const [onePrice, setOnePrice] = useState();
  const [multiplePrices, setMultiplePrices] = useState();
  const [yesAdditional, setYesAdditional] = useState();
  const [noAdditional, setNoAdditional] = useState();

  //price options
  const [productPriceOptions, setProductPriceOtions] = useState();
  const [priceName, setPriceName] = useState();
  const [priceNameError, setPriceNameError] = useState();
  const [priceType, setPriceType] = useState();
  const [priceTypeError, setPriceTypeError] = useState();
  const [priceOptionImages, setPriceOptionImages] = useState();
  const [optionPrice, setOptionPrice] = useState();
  const [optionPriceError, setOptionPriceError] = useState();

  //additional options
  const [addOptionName, setAddOptionName] = useState();
  const [addOptionNameError, setAddOptionNameError] = useState();
  const [addOptionType, setAddOptionType] = useState();
  const [addOptionTypeError, setAddOptionTypeError] = useState();
  const [addOptionImages, setAddOptionImages] = useState([]);
  const [displayedAddOptionImages, setDisplayedAddOptionImages] = useState([]);

  const router = useRouter();


  let formIsValid = false;
  formIsValid =
    setProductNameError === null
    && setProductImagesError === null
    && setProductCategoryError === null
    && setProductCountInStockError === null
    && setProductPriceOtionsError === null

  let priceOptionIsValid = false;
  priceOptionIsValid =
    priceNameError === null
    && priceTypeError === null
    && optionPriceError === null


  const handleProductName = (e) => {
    setProductName(e.target.value);
    if (e.target.value.length < 1) {
      setProductNameError("Product name cannot be blank.")
    }
    else {
      setProductNameError(null)
    }
  }

  const handleAddProductImages = () => {
    if (!(displayedImages.includes(newImage))) {
      setDisplayedImages([...displayedImages, newImage])
    }
    setNewImage("")

    //BELOW UPLOADS IMAGES TO public/uploads FOLDER
    // let tempImagesArray = []
    // let displayedImgArray = []

    // for(let i = 0; i < e.target.files.length; i++) {
    //   tempImagesArray = [...tempImagesArray, e.target.files[i]]
    //   displayedImgArray = [...displayedImgArray, URL.createObjectURL(e.target.files[i])]
    // }

    // const newTempImageArray = displayedImages.concat(tempImagesArray)
    // const newDisplayedImgArray = displayedImages.concat(displayedImgArray)

    // if(newTempImageArray.length <= 11) {
    //   setDisplayedImages(newDisplayedImgArray)
    //   setImagesToUpload(newTempImageArray)
    // }
    // else {
    //   toast('Only up to 11 images allowed per product.')
    // }
  }

  const handleRemoveProductImages = (img) => {
    const filteredImages = displayedImages.filter((arrImg) => arrImg !== img)
    setDisplayedImages(filteredImages)
  }

  const handleProductCategory = (e) => {
    setProductCategory(e.target.value);
    if (e.target.value.length < 1) {
      setProductCategoryError("Product category cannot be blank.")
    }
    else {
      setProductCategoryError(null)
    }
  }

  const handleProductCountInStock = (e) => {
    setProductCountInStock(e.target.value);
    if (e.target.value.length < 1) {
      setProductCountInStockError("Product stock cannot be blank.")
    }
    else {
      setProductCountInStockError(null)
    }
  }



  // * PRICE OPTIONS
  const handleOnePrice = () => {
    setOnePrice(true)
    setMultiplePrices(false)
  }

  const handleMultiplePrices = () => {
    setOnePrice(false)
    setMultiplePrices(true)
  }

  const handlePriceName = (e) => {
    setPriceName(e.target.value);
    if (e.target.value.length < 1) {
      setPriceNameError("Each price option needs a name. (ie, small, large, etc.")
    }
    else {
      setPriceNameError(null)
    }
  }

  const handlePriceType = (e) => {
    setPriceType(e.target.value);
    if (e.target.value.length < 1) {
      setPriceTypeError("Please specify type. (ie, if option name is 'Small', type would be 'Size'.")
    }
    else {
      setPriceTypeError(null)
    }
  }

  const handlePriceOptionImage = (e) => {
    const newImage = e.target.value
    setPriceOptionImages([...priceOptionImages, newImage])
  }

  const handleOptionPrice = (e) => {
    setOptionPrice(e.target.value)
    if (e.target.value.length < 1) {
      setPriceTypeError("Price is required for eahc price option.")
    }
    else {
      setPriceTypeError(null)
    }
  }

  const createPriceOption = (e) => {
    const newPriceOption = {
      optionName: priceName,
      optionType: priceType,
      images: [...priceOptionImages],
      price: optionPrice,
    }

    if (priceOptionIsValid === true) {
      setProductPriceOtions([...productPriceOptions, newPriceOption])
    }
    else {
      console.log('ERROR', newPriceOption);
    }

    //after clicking SAVE, clears the form and allows for creation of another price option
  }

  const deletePriceOption = (optionName) => {

  }


  // * ADDITIONAL OPTIONS
  const handleYesAdditional = () => {
    setYesAdditional(true)
    setNoAdditional(false)
  }

  const handleNoAdditional = () => {
    setYesAdditional(false)
    setNoAdditional(true)
  }

  const handleAddOptionName = (e) => {

  }

  const handleAddOptionType = (e) => {

  }

  const handleAddOptionImages = (e) => {

  }

  const handleRemoveOptionImages = (e) => {

  }


  const handleCreateProduct = async (e) => {
    e.preventDefault();
    //BELOW UPLOADS IMAGES TO public/uploads FOLDER
    // for(let i = 0; i < imagesToUpload.length; i++) {
    //   let body = new FormData();
    //   body.append("file", imagesToUpload[i]);

    //   axios.post("/api/upload", body).then((res) => console.log(res.data)).catch((err) => console.log(err))
    // }


    // if (formIsValid === true) {
    //   axios.post('/api/posts/create', {
    //     postTitle,
    //     postContent,
    //     videoURL,
    //     imageURL,
    //     isLesson: isLessonCheck,
    //     isUpdate: isUpdateCheck
    //   })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err))

    //   router.replace(router.asPath);
    //   handleFormClose();
    // }
  };

  const handleFormClose = () => {
    setCreateProductFormOpen(false);
    document.querySelector(".admin-page-dark").style = "opacity: 0";
    setTimeout(
      () =>
      (document.querySelector(".admin-page-dark").style =
        "opacity: 0; display: none"),
      600
    );

    // setPostTitle("");
    // setPostTitleError("");
    // setPostContent("");
    // setVideoURL("");
    // setImageURL("");
    // setPostType("");
    // setPostTypeError("");
  }

  return (
    <div className="admin-card box-shadow roboto create-product-form" style={{ minHeight: `95vh` }}>
      <div className="admin-card-header text-center p-3 d-flex justify-content-between align-items-center">
        <div className="empty-div"><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(124, 126, 128,0)` }}></i></div>
        <h3 style={{ marginBottom: 0 }}>Create New Product</h3>
        <div className='d-flex justify-content-end'>
          <p onClick={handleFormClose}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(255,255,255,1)`, cursor: `pointer` }}></i></p>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="admin-card-body p-4">

        <form onSubmit={handleCreateProduct} method="POST" className="col-lg-11 m-auto">


          <div className="form-floating">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={productName}
              onChange={handleProductName}
            />
            <label className="thin-label">Product Name <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {productNameError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {productNameError}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="mt-2" style={{ backgroundColor: `white`, padding: `10px`, borderRadius: `5px` }}>
            <div className="form-floating" >
              <input
                type="text"
                placeholder="p"
                className="form-control"
                onChange={(e) => setNewImage(e.target.value)}
                multiple="multiple"
                value={newImage}
              />
              <label className="thin-label mb-1">Product Images (Add at least 2 Image URLs) <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex mt-2 new-product-images-container" style={{ minHeight: `60px` }}>
                  {displayedImages.map((img, idx) => (
                    <div className="new-product-images">
                      <img src={img} alt="" key={idx} style={{ width: `60px`, height: `60px` }} id={img} />
                      <span onClick={() => handleRemoveProductImages(img)}><i className="bi bi-x-circle-fill"></i></span>
                    </div>
                  ))}
                </div>
                <button className="btn-site-blue mt-2" onClick={handleAddProductImages}>Add Image</button>
              </div>
            </div>
          </div>

          <div className="form-floating mt-2">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={productCategory}
              onChange={handleProductCategory}
            />
            <label className="thin-label">Product Category <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {productCategoryError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {productCategoryError}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="form-floating mt-2">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={productCountInStock}
              onChange={handleProductCountInStock}
            />
            <label className="thin-label">Product Quantity (Stock Amount) <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {productCountInStockError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {productCountInStockError}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="horizontal-line" style={{ marginTop: `20px`, marginBottom: `20px` }}></div>

          <div className="radio-options mt-2">
            <p style={{ fontSize: `1.2rem`, marginBottom: `5px` }}>Price Options: <span style={{ color: `rgb(206, 139, 139)` }}>*</span></p>
            {onePrice === true ? <input type="radio" value={onePrice} name="priceOptions" id="onePrice" onChange={handleOnePrice} checked /> : <input type="radio" value={onePrice} name="priceOptions" id="onePrice" onChange={handleOnePrice} />}
            <label htmlFor="onePrice">&nbsp; Product has one price</label>
            <br />
            {multiplePrices === true ? <input type="radio" value={multiplePrices} name="priceOptions" id="multiplePrices" onChange={handleMultiplePrices} checked /> :
              <input type="radio" value={multiplePrices} name="priceOptions" id="multiplePrices" onChange={handleMultiplePrices} />}
            <label htmlFor="multiplePrices">&nbsp; Product has multiple prices</label>
          </div>

          {multiplePrices && <div>
            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={priceName}
                onChange={handlePriceName}
              />
              <label className="thin-label">Price Name (ie, small, large, etc.) <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              {priceNameError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {priceNameError}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={priceType}
                onChange={handlePriceType}
              />
              <label className="thin-label">Price Descriptor (ie, if option name is 'Small', type would be 'Size'.) <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              {priceTypeError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {priceTypeError}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-2" style={{ backgroundColor: `white`, padding: `10px`, borderRadius: `5px` }}>
              <div className="form-floating" >
                <input
                  type="text"
                  placeholder="p"
                  className="form-control"
                  onChange={(e) => setNewImage(e.target.value)}
                  multiple="multiple"
                  value={newImage}
                />
                <label className="thin-label mb-1">Price Option Image <span style={{ color: `rgba(0,0,0,.5)` }}>(Optional)</span></label>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="d-flex mt-2 new-product-images-container" style={{ minHeight: `60px` }}>
                    {displayedImages.map((img, idx) => (
                      <div className="new-product-images">
                        <img src={img} alt="" key={idx} style={{ width: `60px`, height: `60px` }} id={img} />
                        <span onClick={() => handleRemoveProductImages(img)}><i className="bi bi-x-circle-fill"></i></span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-site-blue mt-2" onClick={handleAddProductImages}>Add Image</button>
                </div>
              </div>
            </div>
            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={optionPrice}
                onChange={handleOptionPrice}
              />
              <label className="thin-label">Price: $ <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              {optionPriceError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {optionPriceError}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn-site-blue mt-2 roboto" style={{ width: `100%` }} onClick={createPriceOption}>Save Price Option</button>
            </div>

            <p className="mt-2">map through the price options here, with options to delete, edit, etc</p>

          </div>}

          {onePrice && <div>
            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={optionPrice}
                onChange={handleOptionPrice}
              />
              <label className="thin-label">Price: $ <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              {optionPriceError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {optionPriceError}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>}

          <div className="horizontal-line" style={{ marginTop: `20px`, marginBottom: `20px` }}></div>

          <div className="radio-options mt-2">
            <p style={{ fontSize: `1.2rem`, marginBottom: `5px` }}>Additional Options: <span style={{ color: `rgb(206, 139, 139)` }}>*</span></p>
            {yesAdditional === true ? <input type="radio" value={yesAdditional} name="addOptions" id="yesAdditional" onChange={handleYesAdditional} checked /> : <input type="radio" value={yesAdditional} name="addOptions" id="yesAdditional" onChange={handleYesAdditional} />}
            <label htmlFor="yesAdditional">&nbsp; Yes, add more options</label>
            <br />
            {noAdditional === true ? <input type="radio" value={noAdditional} name="addOptions" id="noAdditional" onChange={handleNoAdditional} checked /> :
              <input type="radio" value={noAdditional} name="addOptions" id="noAdditional" onChange={handleNoAdditional} />}
            <label htmlFor="noAdditional">&nbsp; Nope, I'm all set</label>
          </div>

          {yesAdditional && <div>

            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={addOptionName}
                onChange={handleAddOptionName}
              />
              <label className="thin-label">Option Name (ie, Red, Blue, etc.) <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              {addOptionNameError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {addOptionNameError}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={addOptionType}
                onChange={handleAddOptionType}
              />
              <label className="thin-label">Option Descriptor (ie, if option name is "Red", type would be "Color".) <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              {addOptionTypeError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {addOptionTypeError}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="mt-2" style={{ backgroundColor: `white`, padding: `10px`, borderRadius: `5px` }}>
              <div className="form-floating" >
                <input
                  type="text"
                  placeholder="p"
                  className="form-control"
                  onChange={(e) => setNewImage(e.target.value)}
                  multiple="multiple"
                  value={newImage}
                />
                <label className="thin-label mb-1">Option Image <span style={{ color: `rgba(0,0,0,.5)` }}>(Optional)</span></label>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="d-flex mt-2 new-product-images-container" style={{ minHeight: `60px` }}>
                    {displayedAddOptionImages.map((img, idx) => (
                      <div className="new-product-images">
                        <img src={img} alt="" key={idx} style={{ width: `60px`, height: `60px` }} id={img} />
                        <span onClick={() => handleRemoveOptionImages(img)}><i className="bi bi-x-circle-fill"></i></span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-site-blue mt-2" onClick={handleAddOptionImages}>Add Image</button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn-site-blue mt-2 roboto" style={{ width: `100%` }} onClick={createPriceOption}>Save Additional Option</button>
            </div>

          </div>}

          <div className="horizontal-line" style={{ marginTop: `20px`, marginBottom: `20px` }}></div>

          <div className="d-flex gap-3 justify-content-end mt-3">
            <button className="btn-site-cancel roboto" onClick={handleFormClose}>Cancel</button>
            {/* <button type="submit" className={`roboto btn-site-blue ${formIsValid ? "" : "disabled"}`}>Create Post</button> */}
            <button type="submit" className={`roboto btn-site-blue`}>Create Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}