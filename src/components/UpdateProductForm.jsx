import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function CreateProductForm({
  setUpdateProductFormOpen,
  setProductNameError,
  setProductImagesError,
  setProductCategoryError,
  setProductCountInStockError,
  setProductPriceOptionsError,
  setProductShippingCostError,
  productNameError,
  productImagesError,
  productSlugError,
  productCategoryError,
  productCountInStockError,
  productPriceOptionsError,
  productShippingCostError,
  oneProduct }) {
  const [productPriceError, setProductPriceError] = useState();
  const [productName, setProductName] = useState(oneProduct.name);
  const [productImages, setProductImages] = useState(oneProduct.images);
  const [displayedImages, setDisplayedImages] = useState(oneProduct.images);
  const [newImage, setNewImage] = useState("");
  // const [imagesToUpload, setImagesToUpload] = useState([]);
  // const [createObjectURL, setCreateObjectURL] = useState();
  const [productCategory, setProductCategory] = useState(oneProduct.category);
  const [productShippingCost, setProductShippingCost] = useState(oneProduct.shippingCost);
  console.log(oneProduct.shippingCost);
  const [productCountInStock, setProductCountInStock] = useState(oneProduct.countInStock);
  const [productDescription, setProductDescription] = useState(oneProduct.description);
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [singlePrice, setSinglePrice] = useState("");
  const [singlePriceError, setSinglePriceError] = useState("");
  const [onePrice, setOnePrice] = useState();
  const [multiplePrices, setMultiplePrices] = useState();
  const [yesAdditional, setYesAdditional] = useState();
  const [noAdditional, setNoAdditional] = useState();
  const [additionalOptionsError, setAdditionalOptionsError] = useState();

  //price options
  const [productPriceOptions, setProductPriceOptions] = useState(oneProduct.priceOptions);
  const [priceName, setPriceName] = useState("");
  const [priceNameError, setPriceNameError] = useState();
  const [oldPriceName, setOldPriceName] = useState("");
  const [priceType, setPriceType] = useState("");
  const [priceTypeError, setPriceTypeError] = useState();
  const [priceOptionImages, setPriceOptionImages] = useState([]);
  const [optionPrice, setOptionPrice] = useState("");
  const [optionPriceError, setOptionPriceError] = useState();
  const [priceDesc, setPriceDesc] = useState("");

  //additional options
  const [productAdditionalOptions, setProductAdditionalOptions] = useState(oneProduct.additionalOptions);
  const [addOptionName, setAddOptionName] = useState("");
  const [oldAddOptionName, setOldAddOptionName] = useState("");
  const [addOptionNameError, setAddOptionNameError] = useState();
  const [addOptionType, setAddOptionType] = useState("");
  const [addOptionTypeError, setAddOptionTypeError] = useState();
  const [addOptionImages, setAddOptionImages] = useState([]);
  const [addOptionDesc, setAddOptionDesc] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (oneProduct.priceOptions.length > 1) {
      setOnePrice(false)
      setMultiplePrices(true)
    }
    else if (oneProduct.priceOptions.length < 2) {
      setOnePrice(true)
      setMultiplePrices(false)
      setSinglePrice(oneProduct.priceOptions[0].price)
    }
    if (oneProduct.additionalOptions.length > 0) {
      setNoAdditional(false)
      setYesAdditional(true)
    }
    else if (oneProduct.additionalOptions.length === 0) {
      setNoAdditional(true)
      setYesAdditional(false)
    }

    setProductNameError(null)
    setProductImagesError(null)
    setProductCategoryError(null)
    setProductCountInStockError(null)
    setProductPriceError(null)
    setAdditionalOptionsError(null)
    setProductShippingCostError(null)
  }, [])

  let formIsValid = false;
  formIsValid =
    productNameError === null
    && productImagesError === null
    && productCategoryError === null
    && productCountInStockError === null
    && productPriceError === null
    && additionalOptionsError === null
    && productShippingCostError === null

  let priceOptionIsValid = false;
  priceOptionIsValid =
    priceNameError === null
    && priceTypeError === null
    && optionPriceError === null


  let addOptionIsValid = false;
  addOptionIsValid =
    addOptionNameError === null
    && addOptionTypeError === null


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
    let formValidator = [...displayedImages]

    if (newImage.length < 1 || !newImage.includes("http")) {
      toast("Invalid image URL")
      return;
    }

    if (!(displayedImages.includes(newImage))) {
      setDisplayedImages([...displayedImages, newImage])
      setProductImages([...displayedImages, newImage])
      formValidator = [...displayedImages, newImage]
    }
    setNewImage("")

    if (formValidator.length > 0) {
      setProductImagesError(null)
    }

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

  const handleProductShippingCost = (e) => {
    setProductShippingCost(e.target.value);
    if (e.target.value.length < 1) {
      setProductShippingCostError("Product shipping cost cannot be blank.")
    }
    else {
      setProductShippingCostError(null)
    }
  }

  const handleProductDescription = (e) => {
    setProductDescription(e.target.value);
    if (e.target.value.length < 1) {
      setProductDescriptionError("Product description cannot be blank.")
    }
    else {
      setProductDescriptionError(null)
    }
  }



  // * PRICE OPTIONS
  //below two functions control opening and closing the respective forms
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

  const handlePriceOptionImage = () => {
    if (newImage.length < 1 || !newImage.includes("http")) {
      toast("Invalid image URL")
      return;
    }

    if (!(priceOptionImages.includes(newImage))) {
      setPriceOptionImages([...priceOptionImages, newImage])
    }
    setNewImage("")
  }

  const handleRemovePriceOptionImages = (img) => {
    const filteredImages = priceOptionImages.filter((arrImg) => arrImg !== img)
    setPriceOptionImages(filteredImages)
  }

  const handleSinglePrice = (e) => {
    setSinglePrice(e.target.value)
    if (e.target.value.length < 1) {
      setSinglePriceError("A price is required.")
    }
    else {
      setSinglePriceError(null)
    }
  }

  const handleOptionPrice = (e) => {
    setOptionPrice(e.target.value)
    if (e.target.value.length < 1) {
      setOptionPriceError("Price is required for each price option.")
    }
    else {
      setOptionPriceError(null)
    }
  }

  const handlePriceOptionDesc = (e) => {
    setPriceDesc(e.target.value)
  }

  const createPriceOption = (e) => {
    const newPriceOption = {
      optionName: priceName,
      optionType: priceType,
      images: [...priceOptionImages],
      price: optionPrice,
      description: priceDesc
    }

    if (priceOptionIsValid === true) {
      setProductPriceOptions([...productPriceOptions, newPriceOption])
      setPriceName("");
      setPriceType("");
      setPriceOptionImages([]);
      setOptionPrice("")
      setPriceDesc("");
      setProductPriceError(null)
    }
    else {
      toast("Please correct the required fields.")
      console.log('ERROR', newPriceOption);
    }
  }

  const deletePriceOption = (optionName) => {
    const filteredPriceOptions = productPriceOptions.filter((po) => po.optionName !== optionName)
    setProductPriceOptions([...filteredPriceOptions])
  }

  const editPriceOption = (optionName) => {
    const onePriceOption = productPriceOptions.filter((po) => po.optionName === optionName)

    setOldPriceName(onePriceOption[0].optionName)
    setPriceName(onePriceOption[0].optionName);
    setPriceType(onePriceOption[0].optionType);
    setPriceOptionImages([...onePriceOption[0].images]);
    setOptionPrice(onePriceOption[0].price)
    setPriceDesc(onePriceOption[0].description);

    document.getElementById("create-price-option").style = "display: none !important"
    document.getElementById("update-price-option").style = "display: block !important"
  }

  const updatePriceOption = () => {
    const clonedArray = [...productPriceOptions]

    for (let i = 0; i < clonedArray.length; i++) {
      if (clonedArray[i].optionName === oldPriceName) {
        clonedArray[i] = {
          optionName: priceName,
          optionType: priceType,
          images: [...priceOptionImages],
          price: optionPrice,
          description: priceDesc
        }
      }
    }

    setOldPriceName(priceName)
    setProductPriceOptions(clonedArray);
    toast.success("Price option has been updated.")
  }

  const cancelUpdate = () => {
    document.getElementById("create-price-option").style = "display: block !important"
    document.getElementById("update-price-option").style = "display: none !important"

    setPriceName("");
    setPriceType("");
    setPriceOptionImages([]);
    setOptionPrice("")
    setPriceDesc("");
  }


  // * ADDITIONAL OPTIONS
  const handleYesAdditional = () => {
    setYesAdditional(true)
    setNoAdditional(false)
    setAdditionalOptionsError(null)
  }

  const handleNoAdditional = () => {
    setYesAdditional(false)
    setNoAdditional(true)
    setAdditionalOptionsError(null)
  }

  const handleAddOptionName = (e) => {
    setAddOptionName(e.target.value);
    if (e.target.value.length < 1) {
      setAddOptionNameError("Each price option needs a name.")
    }
    else {
      setAddOptionNameError(null)
    }
  }

  const handleAddOptionType = (e) => {
    setAddOptionType(e.target.value);
    if (e.target.value.length < 1) {
      setAddOptionTypeError("Please specify type.")
    }
    else {
      setAddOptionTypeError(null)
    }
  }


  const handleAddOptionImages = (e) => {
    if (newImage.length < 1 || !newImage.includes("http")) {
      toast("Invalid image URL")
      return;
    }

    if (!(addOptionImages.includes(newImage))) {
      setAddOptionImages([...addOptionImages, newImage])
    }
    setNewImage("")
  }

  const handleRemoveAddOptionImages = (img) => {
    const filteredImages = addOptionImages.filter((arrImg) => arrImg !== img)
    setAddOptionImages(filteredImages)
  }

  const handleAddOptionDesc = (e) => {
    setAddOptionDesc(e.target.value)
  }

  const createAdditionalOption = (e) => {
    const newAdditionalOption = {
      optionName: addOptionName,
      optionType: addOptionType,
      images: [...addOptionImages],
      description: addOptionDesc
    }

    if (addOptionIsValid === true) {
      setProductAdditionalOptions([...productAdditionalOptions, newAdditionalOption])
      setAddOptionName("");
      setAddOptionType("");
      setAddOptionImages([]);
      setAddOptionDesc("");
    }
    else {
      toast("Please correct the required fields.")
      console.log('ERROR', newAdditionalOption);
    }
  }

  const deleteAdditionalOption = (optionName) => {
    const filteredAdditionalOptions = productAdditionalOptions.filter((po) => po.optionName !== optionName)
    setProductAdditionalOptions([...filteredAdditionalOptions])
  }

  const editAdditionalOption = (optionName) => {
    const oneAdditionalOption = productAdditionalOptions.filter((ao) => ao.optionName === optionName)

    setOldAddOptionName(oneAdditionalOption[0].optionName)
    setAddOptionName(oneAdditionalOption[0].optionName);
    setAddOptionType(oneAdditionalOption[0].optionType);
    setAddOptionImages([...oneAdditionalOption[0].images]);
    setAddOptionDesc(oneAdditionalOption[0].description);

    document.getElementById("create-additional-option").style = "display: none !important"
    document.getElementById("update-additional-option").style = "display: block !important"
  }

  const updateAdditionalOption = () => {
    const clonedArray = [...productAdditionalOptions]

    for (let i = 0; i < clonedArray.length; i++) {
      if (clonedArray[i].optionName === oldAddOptionName) {
        clonedArray[i] = {
          optionName: addOptionName,
          optionType: addOptionType,
          images: [...addOptionImages],
          description: addOptionDesc
        }
      }
    }
    setOldAddOptionName(addOptionName)
    setProductAdditionalOptions(clonedArray);
    toast.success("Additional option has been updated.")
  }

  const cancelAdditionalUpdate = () => {
    document.getElementById("create-additional-option").style = "display: block !important"
    document.getElementById("update-additional-option").style = "display: none !important"

    setAddOptionName("");
    setAddOptionType("");
    setAddOptionImages([]);
    setAddOptionDesc("");
  }



  const handleCreateProduct = (e) => {
    e.preventDefault();

    // console.log(productNameError,
    //   productImagesError,
    //   productCategoryError,
    //   productCountInStockError,
    //   productPriceError);

    if (formIsValid !== true) {
      toast(`Please fill in the required parameters.`)
    }

    if (formIsValid === true) {
      if (onePrice === true) {
        const singlePriceOption = {
          optionName: "",
          optionType: "",
          images: [],
          price: singlePrice,
          description: "",
        }
        const tempProductPriceOptions = [singlePriceOption]
        const updatedProduct = {
          name: productName,
          images: productImages,
          category: productCategory,
          countInStock: productCountInStock,
          description: productDescription,
          shippingCost: productShippingCost,
          priceOptions: tempProductPriceOptions,
          additionalOptions: productAdditionalOptions
        }
        axios.post(`/api/products/update/${oneProduct._id}`, updatedProduct)
          .then((res) => {
            console.log(res);
            toast.success(`${productName} updated successfully`)
            handleFormClose();
          })
          .catch((err) => console.log(err))
      }

      if (multiplePrices === true) {
        const updatedProduct = {
          name: productName,
          images: productImages,
          category: productCategory,
          countInStock: productCountInStock,
          description: productDescription,
          shippingCost: productShippingCost,
          priceOptions: productPriceOptions,
          additionalOptions: productAdditionalOptions
        }

        axios.post(`/api/products/update/${oneProduct._id}`, updatedProduct)
          .then((res) => {
            console.log(res);
            toast.success(`${productName} updated successfully`)
            handleFormClose();
          })
          .catch((err) => console.log(err))
      }

    }
  };

  const handleFormClose = () => {
    setUpdateProductFormOpen(false);
    document.querySelector(".admin-page-dark").style = "opacity: 0";
    setTimeout(
      () =>
      (document.querySelector(".admin-page-dark").style =
        "opacity: 0; display: none"),
      600
    );

    setProductName("");
    setProductNameError("");
    setProductImages([]);
    setProductImagesError([]);
    setDisplayedImages([]);
    setNewImage("");
    setProductCategoryError("");
    setProductCountInStockError("");
    setProductCategory("");
    setProductCountInStock("");
    setProductDescription("");
    setOnePrice(false);
    setMultiplePrices(false);
    setYesAdditional(false);
    setNoAdditional(false);
    setProductAdditionalOptions([]);
    setProductPriceOptions([]);
    ("");
    setProductShippingCost("");
    setProductShippingCostError("");

    // setTimeout(() => , 100)
    router.replace(router.asPath)
  }

  return (
    <div className="admin-card box-shadow roboto create-product-form" style={{ minHeight: `95vh` }}>
      <div className="admin-card-header text-center p-3 d-flex justify-content-between align-items-center">
        <div className="empty-div"><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(124, 126, 128,0)` }}></i></div>
        <h3 style={{ marginBottom: 0 }}>Edit {oneProduct.name}</h3>
        <div className='d-flex justify-content-end'>
          <p onClick={handleFormClose}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgba(255,255,255,1)`, cursor: `pointer` }}></i></p>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="admin-card-body p-4">

        <form onSubmit={handleCreateProduct} className="col-lg-11 m-auto">

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
              <label className="thin-label mb-1">Product Images <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              <div className="d-flex justify-content-between align-items-end flex-column-small">
                <div className="d-flex mt-2 new-product-images-container" style={{ minHeight: `60px` }}>
                  {displayedImages.length >= 1 
                  ? displayedImages.map((img, idx) => (
                    <div className="new-product-images">
                      <img src={img} alt="" key={idx} style={{ width: `60px`, height: `60px` }} id={img} />
                      <span onClick={() => handleRemoveProductImages(img)}><i className="bi bi-x-circle-fill"></i></span>
                    </div>
                  ))
                : <p style={{ color: `rgba(0,0,0,.7)`, textAlign: `center` }}>Please add at least 1 image URL.</p>}
                </div>
                <button type="button" className="btn-site-blue mt-2" onClick={handleAddProductImages}>Add Image</button>
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
            <label className="thin-label">Amount in Stock <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {productCountInStockError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {productCountInStockError}
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
              value={productShippingCost}
              onChange={handleProductShippingCost}
            />
            <label className="thin-label">Shipping Cost <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
            {productShippingCostError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {productShippingCostError}
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
              value={productDescription}
              onChange={handleProductDescription}
            />
            <label className="thin-label">Product Description <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
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
              <label className="thin-label">Price Name <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              <p style={{ marginBottom: 0, color: `rgba(0,0,0,.7)` }}>Example: small, large, etc.</p>
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
              <label className="thin-label">Price Descriptor <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              <p style={{ marginBottom: 0, color: `rgba(0,0,0,.7)` }}>Example: if option name is 'Small', type would be 'Size'.</p>
              {priceTypeError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {priceTypeError}
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
                <label className="thin-label mb-1">Image <span style={{ color: `rgba(0,0,0,.5)` }}>(Optional)</span></label>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="d-flex mt-2 new-product-images-container" style={{ minHeight: `60px` }}>
                    {priceOptionImages.map((img, idx) => (
                      <div className="new-product-images">
                        <img src={img} alt="" key={idx} style={{ width: `60px`, height: `60px` }} id={img} />
                        <span onClick={() => handleRemovePriceOptionImages(img)}><i className="bi bi-x-circle-fill"></i></span>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-site-blue mt-2" onClick={handlePriceOptionImage}>Add Image</button>
                </div>
              </div>
            </div>

            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={priceDesc}
                onChange={handlePriceOptionDesc}
              />
              <label className="thin-label">Description <span style={{ color: `rgba(0,0,0,.5)` }}>(Optional)</span></label>
            </div>

            <div className="d-flex justify-content-center" id="create-price-option">
              <button type="button" className="btn-site-blue mt-3 roboto" style={{ width: `100%` }} onClick={createPriceOption}>Save Price Option</button>
            </div>

            <div className="mt-3" id="update-price-option">
              <div className="d-flex justify-content-between">
                <button type="button" className="btn-site-blue roboto col-5" onClick={() => updatePriceOption()} style={{ width: `49%` }} >Update {oldPriceName}</button>
                <button type="button" className="btn-site-cancel roboto col-5" onClick={cancelUpdate} style={{ width: `49%` }} >Done</button>
              </div>
            </div>

            <div>
              <div className="form-body all-posts-list-container box-shadow mt-3">
                <table className="table table-sm m-auto">
                  <thead>
                    <tr>
                      <th scope="col">Option Name</th>
                      <th scope="col">Option Type</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPriceOptions.length < 1 ?
                      <tr>
                        <td colspan="3" className="text-center">No price options created.</td>
                      </tr>
                      : productPriceOptions.map((po) => {
                        return (
                          <tr>
                            <td>{po.optionName}</td>
                            <td>{po.optionType}</td>
                            <td>
                              <div className="d-flex justify-content-evenly">
                                <button type="button" className="btn-site-blue roboto table-button-small" onClick={() => editPriceOption(po.optionName)}>Edit</button>

                                <button type="button" className="btn-site-cancel roboto table-button-small" onClick={() => deletePriceOption(po.optionName)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>}

          {onePrice && <div>
            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={singlePrice}
                onChange={handleSinglePrice}
              />
              <label className="thin-label">Price: $ <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              {singlePriceError ? (
                <p style={{ color: "tomato" }} className="mt-1">
                  {singlePriceError}
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
              <label className="thin-label">Option Name <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              <p style={{ marginBottom: 0, color: `rgba(0,0,0,.7)` }}>Example: Red, Blue, etc.</p>
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
              <label className="thin-label">Option Descriptor <span style={{ color: `rgb(206, 139, 139)` }}>*</span></label>
              <p style={{ marginBottom: 0, color: `rgba(0,0,0,.7)` }}>Example: if option name is "Red", descripter would be "Color".</p>
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
                <label className="thin-label mb-1">Image <span style={{ color: `rgba(0,0,0,.5)` }}>(Optional)</span></label>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="d-flex mt-2 new-product-images-container" style={{ minHeight: `60px` }}>
                    {addOptionImages.map((img, idx) => (
                      <div className="new-product-images">
                        <img src={img} alt="" key={idx} style={{ width: `60px`, height: `60px` }} id={img} />
                        <span onClick={() => handleRemoveAddOptionImages(img)}><i className="bi bi-x-circle-fill"></i></span>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-site-blue mt-2" onClick={handleAddOptionImages}>Add Image</button>
                </div>
              </div>
            </div>

            <div className="form-floating mt-2">
              <input
                type="text"
                placeholder="p"
                className="form-control"
                value={addOptionDesc}
                onChange={handleAddOptionDesc}
              />
              <label className="thin-label">Description <span style={{ color: `rgba(0,0,0,.5)` }}>(Optional)</span></label>
            </div>

            <div className="d-flex justify-content-center" id="create-additional-option">
              <button type="button" className="btn-site-blue mt-3 roboto" style={{ width: `100%` }} onClick={createAdditionalOption}>Save Additional Option</button>
            </div>

            <div className="mt-3" id="update-additional-option">
              <div className="d-flex justify-content-between">
                <button type="button" className="btn-site-blue roboto col-5" onClick={updateAdditionalOption} style={{ width: `49%` }} >Update {oldAddOptionName}</button>
                <button type="button" className="btn-site-cancel roboto col-5" onClick={cancelAdditionalUpdate} style={{ width: `49%` }} >Done</button>
              </div>
            </div>

            <div>
              <div className="form-body all-posts-list-container box-shadow mt-3">
                <table className="table table-sm m-auto">
                  <thead>
                    <tr>
                      <th scope="col">Option Name</th>
                      <th scope="col">Option Type</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productAdditionalOptions.length < 1 ?
                      <tr>
                        <td colspan="3" className="text-center">No price options created.</td>
                      </tr>
                      : productAdditionalOptions.map((ao) => {
                        return (
                          <tr>
                            <td>{ao.optionName}</td>
                            <td>{ao.optionType}</td>
                            <td>
                              <div className="d-flex justify-content-evenly">
                                <button type="button" className="btn-site-blue roboto table-button-small" onClick={() => editAdditionalOption(ao.optionName)}>Edit</button>

                                <button type="button" className="btn-site-cancel roboto table-button-small" onClick={() => deleteAdditionalOption(ao.optionName)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>}

          <div className="horizontal-line" style={{ marginTop: `20px`, marginBottom: `20px` }}></div>

          <div className="d-flex gap-3 justify-content-end mt-3">
            <button type="button" className="btn-site-cancel roboto" onClick={handleFormClose}>Cancel</button>
            <input type="submit" value={`Update ${oneProduct.name}`} className={`roboto btn-site-blue ${formIsValid ? "" : "disabled-toast"}`} />
          </div>
        </form>
      </div>
    </div>
  )
}