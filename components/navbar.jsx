
const Navbar = () => {
  return <>
    <div className="navbar-body pt-3 border-on-bottom">
      <div className="navbar-content d-flex align-items-center justify-content-around col-11 m-auto">
      <div className="mobile-hide">
        <div className="links d-flex gap-3">
            <a href="#">Updates</a>
            <p>|</p>
            <a href="#">Lessons</a>
            <p>|</p>
            <a href="#">Cart</a>
            <p>|</p>
            <a href="#">Login</a>
          </div>
      </div>
        <div className="site-logo text-center mb-2">
          <img src="/static/images/logo.png" alt="site-logo" className="logo-img" />
          <p className="abby-name">Abby Novotny</p>
        </div>
        <div className="col-3 mobile-hide">
          <div className="input-group mb-3 nav-search">
            <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button type="button"><span className="bi-search"></span></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Navbar;