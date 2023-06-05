
const Navbar = () => {
  return <>
    <div className="navbar-body pt-3 border-on-bottom">
      <div className="navbar-content d-flex align-items-center justify-content-end">
        <div className="site-logo text-center col-lg-8">
          <img src="/static/images/logo.png" alt="site-logo" className="logo-img" />
            <p className="abby-name">Abby Novotny</p>
        </div>
        <div className="links d-flex gap-3 col-lg-2">
          <a href="#">Browse</a>
          <p>|</p>
          <a href="#">Cart (0)</a>
          <p>|</p>
          <a href="#">Search</a>
        </div>
      </div>
    </div>
  </>
}

export default Navbar;