function CheckoutWizard({ activeStep=0 }) {

  return (
    <div className="d-flex justify-content-between col-lg-9 m-auto">
      {
        ['Shipping Address', 'Payment Method', 'Place Order'].map((step, idx) => (
          <div key={idx} className={`text-center roboto ${idx <= activeStep ? 'font-color-red' : 'font-color-black'}`}>
            {step}
          </div>
        ))
      }
    </div>
  )
}

export default CheckoutWizard;