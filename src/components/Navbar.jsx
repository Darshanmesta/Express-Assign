import React from 'react'
import {Link,useHistory} from 'react-router-dom'

export const Navbar = () => {
    const history=useHistory()
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="#">Table</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav navbar-right ml-auto">
      <Link className="nav-item nav-link active" onClick={()=>{
      setTimeout(()=>{
       history.push('/signin')
      },2000)
      }}>Logout <span className="sr-only">(current)</span></Link>
   
    </div>
  </div>
</nav>
        </div>
    )
}
