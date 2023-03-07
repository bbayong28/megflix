import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

const Header = ({ children }) => {
    return (
        <header className='Header'>
            <div className="inner flex">
                <h1>
                    <Link to='/'>
                        <img src={ process.env.PUBLIC_URL + '/assets/img/logo.png' } alt="" />
                    </Link>
                </h1>
                <div className='gnb'>
                    { children }
                </div>
                <Search />
            </div>            
        </header>
    )
}

export default Header;