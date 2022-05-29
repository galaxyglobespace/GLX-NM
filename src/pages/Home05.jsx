import React, {useEffect, useState} from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import SliderStyle2 from '../components/slider/SliderStyle2';
import heroSliderData from '../assets/fake-data/data-slider';
import BrowCategory from '../components/layouts/home-5/BrowCategory';
import LiveAuction from '../components/layouts/home-5/LiveAuction';
import TopSeller from '../components/layouts/home-5/TopSeller';
import TodayPicks from '../components/layouts/home-5/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../components/layouts/home-5/PopularCollection';
import Create from '../components/layouts/home-2/Create';
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";


const Home05 = () => {
    const Web3Api = useMoralisWeb3Api();
    let [nftData, setNftData] = useState([]);
    let [searchData, setSearchData] = useState([]);
    let tempNftData = [];
    let length;
    const tempIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

    useEffect(() => {
        // Update the document title using the browser API
        // if (searchData.length === 0) {
        //     console.log("initial nft data in useEffect", searchData);
        // searchNft({});
        // setNftData(nftcollection)
        

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

    const searchNft = async (query) => {
        const options = { q: 'art', chain: "eth", filter: "name,description,attributes" };

        const NFTs = await Web3Api.token.searchNFTs(options);
        const length = NFTs.total
        console.log("length", length);
        let searchData = [];
        for (let i = 0; i < 25; i++) {
            let response = await fetch(NFTs.result[i].token_uri);
            let jsonData = await response.json();
            let nftData = {
                img: (resolveLink(jsonData.image)) ? resolveLink(jsonData.image) : null,
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
        console.log("call in home setstate", searchData)
        setSearchData(searchData);
    }; 
    return (
        <div className='home-5'>
            <HeaderStyle2 />
            <SliderStyle2 data={heroSliderData} nftColln={tempIndex} />
            <BrowCategory />
            <LiveAuction />
            {/* <TopSeller /> */}
            {/* <TodayPicks data={todayPickData} /> */}
            {/* <PopularCollection /> */}
            <Create />
            <Footer />
        </div>
    );
}

export default Home05;
