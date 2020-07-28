import React, { Component } from 'react';

class Catalog extends Component {
    
    // populateList(tipo) {
    //     let lista = [];
    //     let pkm = {
    //         id: 0,
    //         name: '',
    //         preco: 0,
    //         img: '',
    //     };
    //     fetch("https://pokeapi.co/api/v2/type/" + tipo)
    //         .then(resposta => resposta.json())
    //         .then(
    //             (resultado) => {
    //                 this.setState({
    //                     listaPkm: resultado.pokemon
    //                 });
    //                 lista = resultado.pokemon;
    //             },
    //             (error) => {
    //                 this.setState({
    //                     carregado: false,
    //                     erro: error,
    //                 });
    //             }
    //         );
    //     console.log(lista);
    //     const listaPkm = this.state.listaPkm;
    //     lista.map((dado) => { return (
    //             fetch(dado.pokemon.url)
    //             .then(res => res.json())
    //             .then(
    //                 (item) => {
    //                     pkm.id = item.id;
    //                     pkm.name = item.name;
    //                     pkm.preco = item.base_experience;
    //                     pkm.img = item.sprites.front_default;
    //                     this.setState({
    //                         listaPkm: listaPkm.concat([{
    //                             pokemon: pkm,
    //                         }]),
    //                         carregado: true,
    //                     });
    //                 },
    //                 (error) => {
    //                     this.setState({
    //                         carregado: false,
    //                         erro: error,
    //                     });
    //                 }
    //             ))
    //     })
    // }
    
    render() {
        const itemList = this.props.items.map( item => {
            return (
                <div className='card' key={item.id}>
                    <div className='card-image'>
                        <img src={item.img} alt={item.name} />
                        <span to='/' className='btn-floating halfway-fab waves-effect waves-light red' onClick={()=>{this.props.onClick(item.id)}}> <i className='material-icons'>add</i></span> 
                    </div>
                    <div className='card-content'>
                        <p>{item.name}</p>
                        <p><b>Preço: {item.price}$</b></p>
                    </div>
                </div>
            )
        })
        
        return (
            <div className='container' style={{width: "100vw"}}>
                <h3 className='center'>Pokémon</h3>
                <div className='box'>
                    {itemList}
                </div>
            </div>
        )
    }
}

export default Catalog;