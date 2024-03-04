import React from 'react'

export default function Footer() {
    return (
        <footer className="site-footer mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde molestias deserunt ea quae molestiae? Adipisci omnis iure voluptatibus ducimus esse voluptas dicta nisi mollitia sint? Obcaecati alias dolorum ut aspernatur.</p>          </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Categories</h6>
                        <ul className="footer-links">
                            <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                            <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
                            <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                            <li><a href="http://scanfcode.com/about/">About Us</a></li>
                            <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                            <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by
                            <a href="#">Scanfcode</a>.
                        </p>
                    </div>


                </div>
            </div>
        </footer>
    )
}
