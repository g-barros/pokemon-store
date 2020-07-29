import React from 'react';
import { Button } from 'react-materialize';

function Navbar(props) {
    return (
        <nav className='nav-wrapper'>
            <div className='container'>
                <span className='brand-logo'>Pokémon Store</span>
                <ul className='right'>
                    <li className="hide-on-med-and-down">
                        <form>
                            <div className="input-field">
                                <input id="search" type="search" required/>
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                            </div>
                        </form>
                    </li>
                    <li>
                    <Button className="right" style={{marginTop:"15px"}} waves="light" onClick={()=>props.changeType(props.type)}>
                        {(props.type === 18 ? ("Dark"):("Fairy"))}
                    </Button>
                    </li>
                </ul>
                
            </div>
        </nav>
    )
};

export default Navbar;