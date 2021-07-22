import { Link as GatsbyLink } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import React from "react"

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const UniversalLink = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  disableAnimation = false,
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    if (disableAnimation) {
      return (
        <GatsbyLink
          to={to}
          activeClassName={activeClassName}
          partiallyActive={partiallyActive}
          {...other}
        >
          {children}
        </GatsbyLink>
      )
    }

    return (
      <AniLink
        to={to}
        cover
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </AniLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}
export default UniversalLink
