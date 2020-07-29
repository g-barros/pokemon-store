import React, { Component } from 'react';
import Navbar from '../navbar';
import Catalog from '../catalog';
import Cart from '../cart';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaPkm: [],
            tipoPkm: 18,
            carregado: false,
            erro: null,
            addedPkm: [],
            total:0,
        }
    };
    
    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/type/" + this.state.tipoPkm)
            .then(resposta => resposta.json())
            .then(
                (resultado) => {
                    let pokemon = [{ id:null, name:null, price:null, img:null}];
                    
                    const infoPokemon = resultado.pokemon.map( pkm => {
                        pokemon.name = pkm.pokemon.name[0].toUpperCase()+pkm.pokemon.name.slice(1);
                        let pkmAtual = {...pokemon};
                        if(!pkmAtual.img) {
                            this.getInfo(pkm.pokemon.url)
                                    .then((response) => {
                                        pkmAtual.id = response.id;
                                        pkmAtual.name = response.name[0].toUpperCase()+response.name.slice(1);
                                        pkmAtual.price = response.price;
                                        pkmAtual.img = response.img;
                                    },
                                    (error) => {
                                        this.setState({
                                            erro: error,
                                            carregado: false,
                                        })
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
    };

    
    async getInfo(url) {
        const resposta = await fetch(url);
        const body = await resposta.json();
        const info = {
            id: body.id,
            name: body.name,
            price:body.base_experience,
            img: body.sprites.front_default,
        }
        return info;
    };

    handleAdd(id) {
        const listaPkm = this.state.listaPkm;
        const addPkm = listaPkm.find( pkm => pkm.id === id);
        const existedPkm = this.state.addedPkm.find(pkm => pkm.id === id);
        if(existedPkm) {
            addPkm.quantidade += 1;
            let novoTotal = this.state.total + addPkm.price;
            this.setState({
                ...this.state,
                total: novoTotal,
            });
        } else {
            addPkm.quantidade = 1;
            let novoTotal = this.state.total + addPkm.price;
            this.setState({
                ...this.state,
                addedPkm: [...this.state.addedPkm, addPkm],
                total: novoTotal,
            });
        }
    };

    handleRemove(id) {
        let pkmARemover = this.state.addedPkm.find(pkm => pkm.id === id);
        let novosPkm = this.state.addedPkm.filter(pkm => pkm.id !== id);

        let novoTotal = this.state.total - (pkmARemover.price*pkmARemover.quantidade);

        this.setState({
            ...this.state,
            addedPkm: novosPkm,
            total: novoTotal,
        });
    };

    handleAddQuantidade(id) {
        const addPkm = this.state.listaPkm.find( pkm => pkm.id === id);
        addPkm.quantidade += 1;
        let novoTotal = this.state.total + addPkm.price;
        this.setState({
            ...this.state,
            total: novoTotal,
        });
    };

    handleSubQuantidade(id) {
        const addPkm = this.state.listaPkm.find( pkm => pkm.id === id);

        if(addPkm.quantidade === 1) {
            let novosPkm = this.state.addedPkm.filter(pkm => pkm.id !== id);
            let novoTotal = this.state.total - (addPkm.price);
            this.setState({
                ...this.state,
                addedPkm: novosPkm,
                total: novoTotal,
            });
        } else {
            addPkm.quantidade -= 1;
            let novoTotal = this.state.total - addPkm.price;
            this.setState({
                ...this.state,
                total: novoTotal,
            });
        }
    };

    handleType(tipo) {
        let type = (tipo === 18 ? 17 : 18);
        this.setState({
            tipoPkm: type,
        });
    }

    render() {
        return (
            <>
                <Navbar type={this.state.tipoPkm} changeType={(t) => this.handleType(t)} />
                <div className="loja">
                    {(this.state.carregado) ? (
                        <>
                        <Catalog 
                        items={this.state.listaPkm}
                        addPokemon={(i) => this.handleAdd(i)}
                        />
                        <Cart
                            items={this.state.addedPkm}
                            total={this.state.total}
                            removePokemon={(i) => this.handleRemove(i)}
                            addQuantidade={(i) => this.handleAddQuantidade(i)}
                            subQuantidade={(i) => this.handleSubQuantidade(i)}
                        />
                    </>
                    ) : (<div className="container">Carregando...</div>)
                    }
                </div>
            </>
        )
    }
};

export default Home;