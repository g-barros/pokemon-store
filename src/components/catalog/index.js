import React from 'react';

function Catalog(props) {
    const itemList = props.items.length ? 
        (
            props.items.map( item => {
                return (
                    <div className='card' key={item.id}>
                        <div className='card-image'>
                            <img src={item.img} alt={item.name} />
                            <span className='btn-floating halfway-fab waves-effect waves-light red' onClick={()=>{props.onClick(item.id)}}> <i className='material-icons'>add</i></span>
                        </div>
                        <div className='card-content'>
                            <p>{item.name}</p>
                            <p><b>Preço: {item.price}$</b></p>
                        </div>
                    </div>
                )
            })
        ) : (<p>Estamos sem Pokémon no estoque.</p>);

    return (
        <div className='container' style={{width: "100vw"}}>
            <h3 className='center'>Pokémon</h3>
            <div className='box'>
                {itemList}
            </div>
        </div>
    )
}

export default Catalog;