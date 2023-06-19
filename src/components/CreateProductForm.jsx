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
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState();
  const [productSlug, setProductSlug] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productCountInStock, setProductCountInStock] = useState();

  //price options
  const [productPriceOptions, setProductPriceOtions] = useState();
  const [priceName, setPriceName] = useState();
  const [priceNameError, setPriceNameError] = useState();
  const [priceType, setPriceType] = useState();
  const [priceTypeError, setPriceTypeError] = useState();
  const [priceOptionImages, setPriceOptionImages] = useState();
  const [optionPrice, setOptionPrice] = useState();
  const [optionPriceError, setOptionPriceError] = useState();

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

  const handleProductImages = (e) => {
    let tempImagesArray = []
    let displayedImgArray = []

    for(let i = 0; i < e.target.files.length; i++) {
      tempImagesArray = [...tempImagesArray, e.target.files[i]]
      displayedImgArray = [...displayedImgArray, URL.createObjectURL(e.target.files[i])]
    }

    const newTempImageArray = displayedImages.concat(tempImagesArray)
    const newDisplayedImgArray = displayedImages.concat(displayedImgArray)

    if(newTempImageArray.length <= 11) {
      setDisplayedImages(newDisplayedImgArray)
      setImagesToUpload(newTempImageArray)
    }
    else {
      toast('Only up to 11 images allowed per product.')
    }

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

  const handlePriceOptions = (e) => {
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
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    // console.log(imagesToUpload);

    for(let i = 0; i < imagesToUpload.length; i++) {
      let body = new FormData();
      body.append("file", imagesToUpload[i]);

      // console.log(imagesToUpload[i]);

      axios.post("/api/upload", body).then((res) => console.log(res.data)).catch((err) => console.log(err))
    }


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

        <form onSubmit={handleCreateProduct} method="POST" className="col-lg-11 m-auto">


          <div className="form-floating">
            <input
              type="text"
              placeholder="p"
              className="form-control"
              value={productName}
              onChange={handleProductName}
            />
            <label className="thin-label">Product Name</label>
            {productNameError ? (
              <p style={{ color: "tomato" }} className="mt-1">
                {productNameError}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group mt-2" style={{ backgroundColor: `white`, padding: `10px`, borderRadius: `5px` }}>
            <label className="thin-label mb-1">Product Images</label>
            <input
              type="file"
              placeholder="p"
              className="form-control"
              onChange={handleProductImages}
              multiple="multiple"
            />
            <div className="d-flex gap-2 mt-2" style={{ minHeight: `50px` }}>
              {displayedImages.map((img, idx) => (
                <img src={img} alt="" key={idx} style={{ width: `50px`, height: `50px` }}/>
              ))}
            </div>
          </div>



          <div className="d-flex gap-3 justify-content-end mt-2">
            <button className="btn-site-cancel roboto" onClick={handleFormClose}>Cancel</button>
            {/* <button type="submit" className={`roboto btn-site-blue ${formIsValid ? "" : "disabled"}`}>Create Post</button> */}
            <button type="submit" className={`roboto btn-site-blue`}>Create Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}