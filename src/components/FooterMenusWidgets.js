import React from "react"
import SocialMenu from "./SocialMenu"

const FooterMenusWidgets = ({}) => {
  return (
    <div className="footer-nav-widgets-wrapper header-footer-group">
      <div className="footer-inner section-inner">
        <div className="footer-top has-social-menu">
          <SocialMenu />
        </div>

        <aside className="footer-widgets-outer-wrapper" role="complementary">
          <div className="footer-widgets-wrapper">
            <div className="footer-widgets column-one grid-item">
              <div className="widget widget_text">
                <div className="widget-content">
                  <h2 className="widget-title subheading heading-size-3">
                    About This Site
                  </h2>
                </div>
              </div>
            </div>

            <div className="footer-widgets column-two grid-item">
              <div className="widget widget_text">
                <div className="widget-content">
                  <h2 className="widget-title subheading heading-size-3">
                    Find Us
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default FooterMenusWidgets
