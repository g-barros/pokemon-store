import React, { Component } from 'react';
import Navbar from '../navbar';
import Catalog from '../catalog';
import Cart from '../cart';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaPkm: [],
            tipoPkm: 5,
            carregado: false,
            erro: null,
            addedPkm: [],
            total:0,
        }
    };
    
    async componentDidMount() {
        fetch("https://pokeapi.co/api/v2/type/" + this.state.tipoPkm)
            .then(resposta => resposta.json())
            .then(
                (resultado) => {
                    let pokemon = { id:null, name:null, price:null, img:null};
                    const infoPokemon = resultado.pokemon.map( pkm => {
                        pokemon.name = pkm.pokemon.name;
                        let pkmAtual = {...pokemon};
                        if(!pkmAtual.img) {
                            this.getInfo(pkm.pokemon.url)
                                    .then(response => {
                                        pkmAtual.id = response.id;
                                        pkmAtual.price = response.price;
                                        pkmAtual.img = response.img;
                                    });
                        }
                        return pkmAtual;
                    });
                    this.setState({
                        listaPkm: infoPokemon,
                        carregado: true,
                    });
                }
            );
    //     const resposta = await fetch("https://pokeapi.co/api/v2/type/" + this.state.tipoPkm);
    //     const body = await resposta.json();
    //     let pokemon = { id:null, name:null, price:null, img:null}
    //     const spritedPkm = body.pokemon.map( pkm => {
    //         pokemon.name = pkm.pokemon.name;
    //         let currentPkm = {...pokemon};
    //         if (!pokemon.img){
    //             this.getInfo(pkm.pokemon.url).then(response => {
    //                 currentPkm.id = response.id;
    //                 currentPkm.price = response.price;
    //                 currentPkm.img = response.img;
    //             });
    //             // this.getId(pkm.pokemon.url).then(response => {
    //             //     currentPkm.id = response;
    //             // });
    //             // this.getPrice(pkm.pokemon.url).then(response => {
    //             //     currentPkm.price = response;
    //             // });
    //         }
    //         return currentPkm;
    //     })
    //     this.setState({
    //         listaPkm: spritedPkm,
    //     })
    };

    async getInfo(url) {
        const resposta = await fetch(url);
        const body = await resposta.json();
        const info = {
            id: body.id,
            price:body.base_experience,
            img: body.sprites.front_default,
        }
        return info;
    };
    // async getId(url) {
    //     const resposta = await fetch(url);
    //     const body = await resposta.json();
    //     return ;
    // };
    // async getPrice(url) {
    //     const resposta = await fetch(url);
    //     const body = await resposta.json();
    //     return body.base_experience;
    // };

    handleAdd(id) {
        const listaPkm = this.state.listaPkm;
        const clickedPkm = listaPkm.find( pkm => pkm.id === id);
        let novoTotal = this.state.total + clickedPkm.price;
        this.setState({
            ...this.state,
            addedPkm: [...this.state.addedPkm, clickedPkm],
            total: novoTotal,
        });
    }

    handleRemove(id) {
        let pkmARemover = this.state.addedPkm.find(pkm => pkm.id === id);
        let novosPkm = this.state.addedPkm.filter(pkm => pkm.id !== id);

        let novoTotal = this.state.total - (pkmARemover.price);

        this.setState({
            ...this.state,
            addedPkm: novosPkm,
            total: novoTotal,
        });
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="loja">
                    {/* {(this.state.carregado) ? (
                        <> */}
                        <Catalog 
                        items={this.state.listaPkm}
                        onClick={(i) => this.handleAdd(i)}
                        />
                        <Cart
                            items={this.state.addedPkm}
                            total={this.state.total}
                            onClick={(i) => this.handleRemove(i)}
                        />
                    {/* </>
                    ) : (<></>)
                    } */}
                    
                </div>
            </>
        )
    }
};

export default Home;