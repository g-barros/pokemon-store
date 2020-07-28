import React from 'react';

function Navbar() {
    return (
        <nav className='nav-wrapper'>
            <div className='container'>
                <span className='brand-logo'>Pokémon Store</span>
                <ul className='right hide-on-med-and-down'>
                    <li>
                        <form>
                            <div className="input-field">
                                <input id="search" type="search" required/>
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                            </div>
                        </form>
                    </li>
                    <li><a className='material-icons cart-icon'>shopping_cart</a></li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;