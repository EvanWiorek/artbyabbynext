
import Link from 'next/link';

const Navbar = () => {
  return <>
    <div className="navbar-body pt-3 border-on-bottom">
      <div className="navbar-content d-flex align-items-center justify-content-around col-11 m-auto">
        <div className="mobile-hide">
          <div className="links d-flex gap-3">
            <Link href="/updates">News & Updates</Link>
            <br />
            <Link href="/lessons">Art Lessons</Link>
            <br />
            <Link href="/allproducts">Browse All Products</Link>
          </div>
        </div>
        <div className="site-logo text-center mb-2">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/static/images/logo.png" alt="site-logo" className="logo-img" />
            <p className="abby-name">Abby Novotny</p>
          </Link>
        </div>
        <div className="col-3 mobile-hide d-flex align-items-center gap-4">
          <div className="input-group mb-3 nav-search">
            <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button type="button"><span className="bi-search"></span></button>
            </div>
          </div>
          <button type="button" class="position-relative cart-button" style={{ marginTop: `-17px`}}>
          <i class="bi bi-bag" style={{ fontSize: `1.3rem` }}></i>
            <span class="position-absolute translate-middle badge rounded-pill items-count">
              12
              <span class="visually-hidden">Number of Items in Cart</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </>
}

export default Navbar;
