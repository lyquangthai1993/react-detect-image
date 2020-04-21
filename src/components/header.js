import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <>
            <Link to={'/'}>Home</Link>
            <br /><br />
            <Link  to={'/request-hire'}>Create Hire</Link>
        </>
    )
}

export default Header;