import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom'
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/auctions/LiveAuction';
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
var console = require("console-browserify")

const LiveAuctions = () => {
    const Web3Api = useMoralisWeb3Api();
    const [nftData, setNftData] = useState([]);

    let data = [];
    let length;

    function resolveLink(url) {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    useEffect(() => {
        // Update the document title using the browser API
        if (nftData.length === 0) {
            collectionnft();
            console.log("nft data in useEffect", nftData);
        }
    }, [nftData]);


    const collectionnft = async() =>{
        // const options = { address: "0x2f38736df77135f7d631ed366a1c40e0a8efe2c1", chain: "mumbai" };
        // const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
        // console.log(NFTs)
        console.log("nft data from server before call");
        const options = { address: "0x3727B6e588c7A97Ae00E6bA710E2B15c85Ae4014", chain: "rinkeby" };
        const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
        console.log("nft data from server after call", NFTs);
        length = NFTs.total
        // setCollecionName(data2)
        for (let i = 0; i < length; i++) {
            let response = await fetch(NFTs.result[i].token_uri);
            let jsonData = await response.json();
            let nftData = {
                img: resolveLink(jsonData.image),
                title: jsonData.name,
                tags: "bsc",
                imgAuthor: "saptarshi don",
                nameAuthor: "SalvadorDali",
                price: "4.89 ETH",
                priceChange: "$12.246",
                wishlist: "100",
                imgCollection: "NFT collection",
                nameCollection: "Colorful Abstract"
            }
            data[i] = nftData
            // console.log("nft data from server", data[i]);
        }
        setNftData(data);
    }
    const artnft = async () => {
        const options = { q: "art", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        console.log(NFTs);
      };    
      const musicnft = async () => {
        const options = { q: "music", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        console.log(NFTs);
      };    
      const collectablenft = async () => {
        const options = { q: "collectable", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        console.log(NFTs);
      };
      const sportsnft = async () => {
        const options = { q: "sports", chain: "eth", filter: "name,description,attributes" };
        const NFTs = await Web3Api.token.searchNFTs(options);
        console.log(NFTs);
      };
    
    
    return (
        <div className='auctions'>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Auctions</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Auctions</li>
                                </ul>
                            </div>
                            <button onClick={collectionnft}>Collection</button>
                            <button onClick={artnft}>Art</button>
                            <button onClick={musicnft}>Music</button>
                            <button onClick={collectablenft}>Collectable</button>
                            <button onClick={sportsnft}>Sports</button>
                        </div>
                    </div>
                </div>                    
            </section>
            <LiveAuction data={nftData} />
            <Footer />
        </div>
    );
}

export default LiveAuctions;
