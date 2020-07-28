import React from 'react';

function Cart(props) {
    const addedItems = props.items.length ?
        (
            props.items.map(item => {
                return (
                    <li className="collection-item avatar" key={item.id}>
                        <div className="item-img">
                            <img src={item.img} alt={item.name} />
                        </div>
                        <div className="item-desc">
                            <span className="title">{item.name}</span>
                            <p><b>Preço: {item.price}$</b></p>
                            <button className='waves-effect waves-light btn pink remove' onClick={() => {props.onClick(item.id)}}>Remove</button>
                        </div>
                    </li>
                )
            })
        ) : (<p>Nenhum item no carrinho.</p>);
    
        return (
            <div className="container">
                <div className="cart">
                    <h5>Pedido:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                    <div className='collection'>
                        <li className='collection-item'><b>Total:{props.total} $</b></li>
                    </div>
                    <div className='checkout'>
                        <button className='waves-effect waves-light btn'>Checkout</button>
                    </div>
                </div>
            </div>
        )
}

export default Cart;