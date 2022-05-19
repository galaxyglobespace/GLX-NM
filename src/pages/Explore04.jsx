import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Explore from '../components/layouts/explore-04/Explore';
import widgetSidebarData from '../assets/fake-data/data-widget-sidebar'
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
    
const Explore04 = () => {
    const Web3Api = useMoralisWeb3Api();

    const collectionnft = async() =>{
        const options = { address: "0x2f38736df77135f7d631ed366a1c40e0a8efe2c1", chain: "mumbai" };
        const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
        const length = NFTs.total
        for(let i=0; i< length; i++){
            const image = NFTs.result[0].token_uri
            fetch(image)
            .then(response => response.json())
            .then((jsonData) => {
            // console.log(jsonData.name)
            console.log(jsonData.name)
            for(let i=0; i<7; i++){
                const att = jsonData.attributes[i]
                console.log(`${att.trait_type} => ${att.value}`)
            }
            })
            .catch((error) => {
            console.error(error)
            })
        }
    }
    const artnft = async () => {
        const options = { q: "art", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        const length = NFTs.total
        for(let i=0; i< 20; i++){
            const image = NFTs.result[i].token_uri
            fetch(image)
            .then(response => response.json())
            .then((jsonData) => {
            console.log(jsonData)
            console.log(jsonData.image)
            for(let i=0; i<7; i++){
                const att = jsonData.attributes[i]
                console.log(`${att.trait_type} => ${att.value}`)
            }
            })
            .catch((error) => {
            console.error(error)
            })
        }
      };    


      const musicnft = async () => {
        const options = { q: "music", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        const length = NFTs.total
        for(let i=0; i< 20; i++){
            const image = NFTs.result[i].token_uri
            fetch(image)
            .then(response => response.json())
            .then((jsonData) => {
            console.log(jsonData)
            console.log(jsonData.image)
            for(let i=0; i<7; i++){
                const att = jsonData.attributes[i]
                console.log(`${att.trait_type} => ${att.value}`)
            }
            })
            .catch((error) => {
            console.error(error)
            })
        }
      };    


      const collectablenft = async () => {
        const options = { q: "collectable", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        const length = NFTs.total
        for(let i=0; i< 20; i++){
            const image = NFTs.result[i].token_uri
            fetch(image)
            .then(response => response.json())
            .then((jsonData) => {
            console.log(jsonData)
            console.log(jsonData.image)
            for(let i=0; i<7; i++){
                const att = jsonData.attributes[i]
                console.log(`${att.trait_type} => ${att.value}`)
            }
            })
            .catch((error) => {
            console.error(error)
            })
        }
      };


      const sportsnft = async () => {
        const options = { q: "sports", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        const length = NFTs.total
        for(let i=0; i< 20; i++){
            const image = NFTs.result[i].token_uri
            fetch(image)
            .then(response => response.json())
            .then((jsonData) => {
            console.log(jsonData)
            console.log(jsonData.image)
            for(let i=0; i<7; i++){
                const att = jsonData.attributes[i]
                console.log(`${att.trait_type} => ${att.value}`)
            }
            })
            .catch((error) => {
            console.error(error)
            })
        }
      };
    
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Explore 4</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Explore 4</li>
                                    <button onClick={collectionnft}>Collection</button>
                            <button onClick={artnft}>Art</button>
                            <button onClick={musicnft}>Music</button>
                            <button onClick={collectablenft}>Collectable</button>
                            <button onClick={sportsnft}>Sports</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <Explore data={widgetSidebarData} />
            <Footer />
        </div>
    );
}

export default Explore04;
