import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CheckoutWizard from "../components/CheckoutWizard";

function ShippingScreen() {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [countryError, setCountryError] = useState();
  const [country, setCountry] = useState();
  const [fullName, setFullName] = useState();
  const [fullNameError, setFullNameError] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  const [address, setAddress] = useState();
  const [addressError, setAddressError] = useState();
  const [city, setCity] = useState();
  const [cityError, setCityError] = useState();
  const [state, setState] = useState();
  const [stateError, setStateError] = useState();
  const [postalCode, setPostalCode] = useState();
  const [postalCodeError, setPostalCodeError] = useState();

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
  }, [contentIsVisible]);

  const handleGoBack = () => {
    router.back();
  };

  let formIsValid = false;
  formIsValid =
    countryError === null &&
    fullNameError === null &&
    emailError === null &&
    addressError === null &&
    cityError === null &&
    stateError === null &&
    postalCodeError === null;

  const handleEmail = (e) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(e.target.value);
    if (e.target.value.length < 1) {
      setEmailError("Email must not be blank.");
    }
    if (!e.target.value.match(emailFormat)) {
      setEmailError("Email is invalid.");
    } else {
      setEmailError(null);
    }
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    if (e.target.value.length < 1) {
      setCountryError("Please select a country.");
    } else {
      setCountryError(null);
    }
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
    if (e.target.value.length < 1) {
      setFullNameError("Full name must not be blank.");
    }
    else if (e.target.value.length < 2) {
      setFullNameError("Full name must be longer than 2 characters.");
    } else {
      setFullNameError(null);
    }
  };

  const handlePhoneNumber = (e) => {
    const phoneNumberFormat =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    setPhoneNumber(e.target.value);
    if (!e.target.value.match(phoneNumberFormat)) {
      setPhoneNumberError("Phone number is invalid.");
    } else {
      setPhoneNumberError(null);
    }
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    if (e.target.value.length < 1) {
      setAddressError("Address must not be blank.");
    } else {
      setAddressError(null);
    }
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    if (e.target.value.length < 1) {
      setCityError("Enter a city.");
    } else {
      setCityError(null);
    }
  };

  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
    if (e.target.value.length < 1) {
      setPostalCodeError("Enter a ZIP / postal code.");
    } else {
      setPostalCodeError(null);
    }
  };

  const handleState = (e) => {
    setState(e.target.value);
    if (e.target.value.length < 1) {
      setStateError("Please select a state.");
    } else {
      setStateError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid === true) {
      dispatch({
        type: "SAVE_CUSTOMER_INFO",
        payload: {
          email,
          country,
          fullName,
          phoneNumber,
          address,
          city,
          state,
          postalCode,
        },
      });
      //need to do more here, follow video
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-content roboto" ref={myRef}>
        <main style={{ paddingTop: `100px` }}>
          <div
            className="links desktop-link d-flex flex-column align-items-end"
            style={{ marginLeft: `10px`, width: `60px` }}
            onClick={handleGoBack}
          >
            <p className="roboto">
              <i class="bi bi-arrow-left" style={{ fontSize: `.9rem` }}></i>{" "}
              Back
            </p>
            <div className="desktop-link-line"></div>
          </div>
          <CheckoutWizard activeStep={0} />
          <div className="col-lg-6 m-auto">
            <form onSubmit={(e) => handleSubmit(e)} className="shipping-submit-form m-auto" style={{ paddingBottom: `20px` }}>
              <h3 className="mb-2 roboto">Contact</h3>

              <div className="form-floating thin-floating">
                <input
                  type="text"
                  id="email"
                  placeholder="p"
                  className="form-control thin-control"
                  value={email}
                  onChange={handleEmail}
                />
                <label htmlFor="email">Email</label>
                {emailError
                  ? (
                    <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                      {emailError}
                    </p>
                  )
                  : ""}
              </div>

              <div className="form-floating thin-floating mt-2">
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="p"
                  className="form-control thin-control"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                />
                <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                {phoneNumberError
                  ? (
                    <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                      {phoneNumberError}
                    </p>
                  )
                  : ""}
              </div>

              <h3 className="mb-3 mt-4 roboto">Shipping Address</h3>

              <div className="form-floating thin-floating">
                <select
                  id="country"
                  className="form-select thin-select"
                  value={country}
                  onChange={handleCountry}
                >
                  <option hidden disabled selected value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="" disabled>----------------------</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">Central African Republic</option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'ivoire">Cote D'ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">French Southern Territories</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-bissau">Guinea-bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                  <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                  <option value="Korea, Republic of">Korea, Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="North Macedonia">North Macedonia</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                  <option value="Moldova, Republic of">Moldova, Republic of</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">Netherlands Antilles</option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                  <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                  <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-leste">Timor-leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Virgin Islands, British">Virgin Islands, British</option>
                  <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <label htmlFor="country">Country/Region</label>
                {countryError
                  ? (
                    <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                      {countryError}
                    </p>
                  )
                  : ""}
              </div>

              <div className="form-floating thin-floating mt-2">
                <input
                  type="text"
                  id="fullName"
                  placeholder="p"
                  className="form-control thin-control"
                  value={fullName}
                  onChange={handleFullName}
                />
                <label htmlFor="fullName">Full Name</label>
                {fullNameError
                  ? (
                    <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                      {fullNameError}
                    </p>
                  )
                  : ""}
              </div>

              <div className="form-floating thin-floating mt-2">
                <input
                  type="text"
                  id="address"
                  placeholder="p"
                  className="form-control thin-control"
                  value={address}
                  onChange={handleAddress}
                />
                <label htmlFor="address">Address</label>
                {addressError
                  ? (
                    <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                      {addressError}
                    </p>
                  )
                  : ""}
              </div>

              <div className="d-flex justify-content-between flex-column-small desktop-gap mb-3">

                <div className="form-floating thin-floating mt-2">
                  <input
                    type="text"
                    id="city"
                    placeholder="p"
                    className="form-control thin-control"
                    value={city}
                    onChange={handleCity}
                  />
                  <label htmlFor="city">City</label>
                  {cityError
                    ? (
                      <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                        {cityError}
                      </p>
                    )
                    : ""}
                </div>

                <div className="form-floating thin-floating mt-2">
                  <select
                    id="state"
                    className="form-select thin-select"
                    value={state}
                    onChange={handleState}
                  >
                    <option value="" hidden disabled selected>Select a State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="" disabled>----------------------</option>
                    <option value="AS">American Samoa</option>
                    <option value="GU">Guam</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="UM">United States Minor Outlying Islands</option>
                    <option value="VI">Virgin Islands</option>
                  </select>
                  <label htmlFor="state">State</label>
                  {stateError
                    ? (
                      <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                        {stateError}
                      </p>
                    )
                    : ""}
                </div>

                <div className="form-floating thin-floating mt-2">
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="p"
                    className="form-control thin-control"
                    value={postalCode}
                    onChange={handlePostalCode}
                  />
                  <label htmlFor="postalCode">Zip Code</label>
                  {postalCodeError
                    ? (
                      <p style={{ color: "tomato", marginBottom: `0` }} className="mt-1">
                        {postalCodeError}
                      </p>
                    )
                    : ""}
                </div>

              </div>
              <button className="btn-site-pink roboto" style={{ width: `100%` }}>Next</button>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShippingScreen;
