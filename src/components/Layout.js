import React, { Fragment } from 'react'
import NavBar from './NavBar'

function Layout(props) {
  return (
    <Fragment>
      <NavBar/>
      {props.children}
    </Fragment>
  )
}

export default Layout
