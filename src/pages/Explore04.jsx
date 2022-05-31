import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Explore from '../components/layouts/explore-04/Explore';
// import widgetSidebarData from '../assets/fake-data/data-widget-sidebar'
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";


/// need to call this data from web3server
const widgetSidebarData = [
    {
        id: 1,
        title: "Status",
        content: [
            {
                field: 'Buy Now'
                // checked: 'checked'
            },
            {
                field: 'On Auctions'
            },
            {
                field: 'Has Offers'
            },
        ]
    },
    {
        id: 2,
        title: "Categories",
        content: [
            {
                name: 'Art',
                field: 'art',
                checked: 'checked'
            },
            {
                name: 'Music',
                field: 'music'
            },
            {
                name: 'Virtual Worlds',
                field: 'virtual worlds'
            },
            {
                name: 'Sports',
                field: 'sports'
            },
            {
                name: 'Utility',
                field: 'utility'
            },
        ]
    },
    {
        id: 3,
        title: "Chains",
        content: [
            {
                name: 'Ethereum',
                field: 'eth'
            },
            {
                field: 'Polygon',
                field: 'pol'
            },
            {
                name: 'Klaytn',
                field: 'Klaytn'
            },
        ]
    },
    // {
    //     id: 4,
    //     title: "Collections",
    //     content: [
    //         {
    //             field: 'Abstraction'
    //         },
    //         {
    //             field: 'Patternlicious'
    //         },
    //         {
    //             field: 'Skecthify'
    //         },
    //         {
    //             field: 'Cartoonism'
    //         },
    //         {
    //             field: 'Virtuland'
    //         },
    //         {
    //             field: 'Papercut'
    //         },
    //     ]
    // },
]

const Explore04 = () => {
    
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Explore</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Explore</li>
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