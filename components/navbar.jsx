
const Navbar = () => {
  return <>
    <div className="navbar-body pt-3 border-on-bottom">
      <div className="navbar-content d-flex align-items-center justify-content-around col-9 m-auto">
      <div className="links d-flex gap-3" style={{ marginLeft: `20px` }}>
          <a href="#">Updates</a>
          <p>|</p>
          <a href="#">Lessons</a>
          <p>|</p>
          <a href="#">Cart</a>
          <p>|</p>
          <a href="#">Login</a>
        </div>
        <div className="site-logo text-center col-lg-7 mb-2">
          <img src="/static/images/logo.png" alt="site-logo" className="logo-img" />
          <p className="abby-name">Abby Novotny</p>
        </div>
        <div className="col-3" style={{ marginRight: `20px` }}>
          <div class="input-group mb-3 nav-search">
            <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
              <div class="input-group-append">
                <button class="" type="button"><span class="bi-search"></span></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Navbar;