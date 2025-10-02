import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
        <div className="container">
            <h1>Text Utils</h1>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </div>
    </>
  )
}
