function CheckoutWizard({ activeStep = 0 }) {

  return (
    <div className="checkout-wizard-container">
      <div className="d-flex justify-content-between align-items-center">
        {
          ['Shipping', 'Payment', 'Place Order'].map((step, idx) => (
            <div key={idx} className={`text-center roboto ${idx <= activeStep ? 'active-checkout-tab' : 'checkout-tab'}`}>
              <div className="d-flex align-items-center">
                <div className="horizontal-line-checkout"></div>
                <div className="step-circle">{idx + 1}</div>
                <div className="horizontal-line-checkout"></div>
              </div>
              <div>
                {step}
              </div>
            </div>
          ))
        }
      </div>
      <div className="horizontal-line-gray" style={{ marginTop: 0 }}></div>
    </div>
  )
}

export default CheckoutWizard;