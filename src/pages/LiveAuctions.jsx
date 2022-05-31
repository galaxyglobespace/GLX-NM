import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom'
import LiveAuction from '../components/layouts/auctions/LiveAuction';
import console from "console-browserify";
import Web3DataService from "../server/w3server";
import Spinner from 'react-bootstrap/Spinner'

const LiveAuctions = () => {
    const [nftData, setNftData] = useState(null);

    useEffect(() => {
        // Update the document title using the browser API
        if (nftData === null) {
            async function fetchData() {
                // You can await here
                let data = await Web3DataService.web3NftDataColln()
                console.log("calling wth ", data, data.total)
                // let mappedData = await Web3DataService.web3NftCollnMapping(data, data.total)
                setNftData(data)
            }
            fetchData();
        }
    }, []);

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
                        </div>
                    </div>
                </div>
            </section>
            {
                (nftData === null) ?
                    <Spinner animation="border" />
                    : <LiveAuction data={nftData} />
            }
            <Footer />
        </div>
    );
}

export default LiveAuctions;
