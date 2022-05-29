import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap-accordion'
import ExploreItem from './ExploreItem';
import todayPickData from '../../../assets/fake-data/data-today-pick';
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";

const Explore = (props) => {
    const data = props.data;
    const Web3Api = useMoralisWeb3Api();
    let [nftData, setNftData] = useState([]);
    let [searchData, setSearchData] = useState([]);
    let tempNftData = [];
    let length;

    useEffect(() => {
        // Update the document title using the browser API
        // if (nftData.length === 0) {
            collectionnft();
            // setNftData(nftcollection)
            console.log("initial nft data in useEffect", nftData);

        // }
    }, []);

    function resolveLink(url) {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    const collectionnft = async () => {
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
                imgAuthor: "saptarshi",
                nameAuthor: "SalvadorDali",
                price: "4.89 ETH",
                priceChange: "$12.246",
                wishlist: "100",
                imgCollection: "NFT collection",
                nameCollection: "Colorful Abstract"
            }
            tempNftData[i] = nftData
            // console.log("nft data from server", data[i]);
        }
        setNftData(tempNftData);
    }

    async function mapNfts(nft, done) {
        // computing stuff here...
        let response = await fetch(nft.token_uri);
        let jsonData = await response.json();
        let nftData = {
            img: resolveLink(jsonData.image),
            title: jsonData.name,
            tags: "bsc",
            imgAuthor: "saptarshi",
            nameAuthor: "SalvadorDali",
            price: "4.89 ETH",
            priceChange: "$12.246",
            wishlist: "100",
            imgCollection: "NFT collection",
            nameCollection: "Colorful Abstract"
        }
        // searchData[i] = nftData
        done(null, nftData);
    }

    const searchNft = async (query) => {
        const options = { q: query.field, chain: "eth", filter: "name,description,attributes" };
        console.log("options data from search server", options);


        const NFTs = await Web3Api.token.searchNFTs(options);
        const length = NFTs.total
        console.log("length",length);
        let searchData = [];
        for (let i = 0; i < 10; i++) {
            let response = await fetch(NFTs.result[i].token_uri);
            let jsonData = await response.json();
            let nftData = {
                img: resolveLink(jsonData.image),
                title: jsonData.name,
                tags: "bsc",
                imgAuthor: "saptarshi",
                nameAuthor: "SalvadorDali",
                price: "4.89 ETH",
                priceChange: "$12.246",
                wishlist: "100",
                imgCollection: "NFT collection",
                nameCollection: "Colorful Abstract"
            }
            searchData[i] = nftData
            // console.log("search data from server", jsonData, nftData, length);
        }
        // console.log("call before setstate", searchData)
        setSearchData(searchData);
    }; 

    const handleOnChange = async (object) =>{
        console.log("checked value", object.field)
        let query = {
            field : object.field,
            chain: object.chain
        }
        await searchNft(query)
    }
    return (
        <section className="tf-explore tf-section">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                        <div id="side-bar" className="side-bar style-3">
                            {
                                data.map((item,index) => (
                                    <div className="widget widget-category mgbt-24 boder-bt" key={index}>
                                        <div className="content-wg-category">
                                            <Accordion title={item.title} show={true}>
                                                <form action="#">
                                                    {
                                                        item.content.map((itemm , index) => (
                                                            <div key={index}>
                                                                <label>{itemm.field}
                                                                    <input type="checkbox" defaultChecked={itemm.checked} onChange={() => handleOnChange(itemm)} />
                                                                    <span className="btn-checkbox"></span>
                                                                </label><br/>
                                                            </div>
                                                        ))
                                                    }                                            
                                                </form>
                                            </Accordion>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className="col-xl-9 col-lg-9 col-md-12">
                        {console.log("search data", searchData)}
                        <ExploreItem data={(searchData.length === 0)? nftData : searchData} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Explore;
