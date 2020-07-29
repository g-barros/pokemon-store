import React from 'react';
import { Card, Button, Icon, CardTitle, Pagination } from 'react-materialize';

function Catalog(props) {
    const itemList = props.items.length ? 
        (
            props.items.map( item => {
                return (
                    // <Card
                    //     className="card"
                    //     header={
                    //         <CardTitle image={item.img}>
                    //             <Button 
                    //             className="red halfway-fab" 
                    //             floating 
                    //             icon={<Icon>add</Icon>}
                    //             waves="light"
                    //             onClick={()=>{props.onClick(item.id)}}
                    //         />
                    //         </CardTitle>
                    //     }
                    // >
                    //     <p>{item.name}</p>
                    //     <p><b>Preço: R$ {item.price}</b></p>
                    // </Card>
                    <div className='card' key={item.id}>
                        <div className='card-image'>
                            <img src={item.img} alt={item.name} />
                            <Button 
                                className="red halfway-fab" 
                                floating 
                                icon={<Icon>add</Icon>}
                                waves="light"
                                onClick={()=>{props.addPokemon(item.id)}}
                            />
                        </div>
                        <div className='card-content'>
                            <p>{item.name}</p>
                            <p><b>Preço: R$ {item.price}</b></p>
                        </div>
                    </div>
                )
            })
        ) : (<p>Estamos sem Pokémon no estoque.</p>);
    
    return (
        <div className='container' style={{width: "100vw"}}>
            <h3 className='center'>Pokémon</h3>
            <div className='box'>
                {/* <Pagination
                    activePage={1}
                    onSelect = {(activePage) => {
                        
                        const offset = 15;
                        const slice = itemList.slice(offset*(activePage-1),offset*activePage);
                        console.log(slice);
                        return (slice.map((item => item)))
                    }}
                /> */}
                {itemList}
            </div>
        </div>
    )
}

export default Catalog;