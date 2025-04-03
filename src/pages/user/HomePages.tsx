import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePages() {
 
  return (
    <div>
      <h1>This is home pages</h1>
      <Link to="/pages/login">Sing in</Link>
    </div>
  )
}
