import React, {useEffect, useState} from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import SliderStyle2 from '../components/slider/SliderStyle2';
import heroSliderData from '../assets/fake-data/data-slider';
import BrowCategory from '../components/layouts/home-5/BrowCategory';
import LiveAuction from '../components/layouts/LiveAuction';
import TopSeller from '../components/layouts/home-5/TopSeller';
import TodayPicks from '../components/layouts/home-5/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../components/layouts/home-5/PopularCollection';
import Create from '../components/layouts/home-2/Create';
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";
import Web3DataService from "../server/w3server";


const Home05 = () => {
    const tempIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    const [nftData, setNftData] = useState(null);
    const [mappedNFTData, setMappedNftData] = useState(null);

    useEffect(() => {
        // console.log("useEffect called");
        if (mappedNFTData === null) {
            const fetchNftData = async () => {
                try {
                    let data = await Web3DataService.web3NftDataColln()
                    let mappedData = await Web3DataService.web3NftCollnMapping(data, data.total)
                    setMappedNftData(mappedData)
                    setNftData(data)
                } catch (e) {
                    console.log(e);
                }
            };
            fetchNftData();
        }
    }, [mappedNFTData]);

    // console.log("data loaded ", mappedNFTData)
 
    return (
        <div className='home-5'>
            <HeaderStyle2 />
            <SliderStyle2 data={heroSliderData} nftColln={tempIndex} />
            <BrowCategory />
            <LiveAuction data={(mappedNFTData)? mappedNFTData : []} />
            {/* <TopSeller /> */}
            {/* <TodayPicks data={todayPickData} /> */}
            {/* <PopularCollection /> */}
            <Create />
            <Footer />
        </div>
    );
}

export default Home05;
