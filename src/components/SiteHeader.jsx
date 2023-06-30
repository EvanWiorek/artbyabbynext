
import Link from 'next/link';

const SiteHeader = () => {
  
  return <>
    <div>
      <div className="navbar-body pt-3 border-on-bottom" id='navbarBody'>
        <div className="navbar-content d-flex align-items-center justify-content-around col-lg-11 m-auto">

          <div className="middle site-logo text-center mobile-indent">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img src="/static/images/logo.svg" alt="site-logo" className="logo-img" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  </>
}

export default SiteHeader;
