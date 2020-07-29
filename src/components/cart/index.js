import React from 'react';
import { Modal, Button, Icon } from 'react-materialize';

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
                            <p><b>Preço: R$ {item.price}</b></p>
                            <p><b>Quantidade: {item.quantidade}</b></p>
                            <div className="add-remove">
                                <Button small floating icon={<Icon>arrow_drop_up</Icon>} style={{marginRight:"5px"}} onClick={()=>props.addQuantidade(item.id)}/>
                                <Button small floating icon={<Icon>arrow_drop_down</Icon>} onClick={()=>props.subQuantidade(item.id)}/>
                            </div>
                            <Button className="pink remove" waves="light" onClick={() => props.removePokemon(item.id)} style={{marginTop:"5px"}}>Remover</Button>
                        </div>
                    </li>
                )
            })
        ) : (<p>Nenhum item no carrinho.</p>);
    
    
    const trigger = <Button waves="light">Finalizar Compra</Button>;

    return (
        <div className="container">
            <div className="cart">
                <h5>Pedido:</h5>
                <ul className="collection">
                    {addedItems}
                </ul>
                <div className='collection'>
                    <li className='collection-item'><b>Total: R$ {props.total}</b></li>
                </div>
                <div className='checkout center'>
                    <Modal header="Obrigado pela compra!!" trigger={trigger}>
                        Você ganhou de volta R$ {props.total*0.02.toFixed(2)}
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Cart;