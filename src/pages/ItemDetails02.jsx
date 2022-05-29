import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom'
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/LiveAuction';
import img1 from '../assets/images/avatar/avt-3.jpg'
import img2 from '../assets/images/avatar/avt-11.jpg'
import img3 from '../assets/images/avatar/avt-1.jpg'
import img4 from '../assets/images/avatar/avt-5.jpg'
import img5 from '../assets/images/avatar/avt-7.jpg'
import img6 from '../assets/images/avatar/avt-8.jpg'
import img7 from '../assets/images/avatar/avt-2.jpg'
import imgdetail1 from '../assets/images/box-item/images-item-details2.jpg'
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";
import { useParams, useLocation } from "react-router-dom";

const ItemDetails02 = (props) => {
    const { id } = useParams();
    const { query } = useLocation();
    const Web3Api = useMoralisWeb3Api();
    const [nftData, setNftData] = useState([]);

    let data = [];
    let length;

    useEffect(() => {
        // Update the document title using the browser API
        if (nftData.length === 0) {
            collectionnft();
            // setNftData(nftcollection)
            // console.log("nft data in useEffect", nftData);

        }
    }, [nftData]);

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
            data[i] = nftData
            // console.log("nft data from server", data[i]);
        }
        setNftData(data);
    }
    console.log("-------item details--------->",id, query)

    const [dataHistory] = useState(
        [
            {
                img: img1,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img2,
                name:"Mason Woodward",
                time: "at 06/10/2021, 3:20 AM",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img3,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img4,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img5,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img6,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
        ]
    )
    return (
        <div className='item-details'>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Item Details</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Item Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section tf-item-details style-2">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-left">
                                <div className="media">
                                    {/* {console.log("image", )} */}
                                    <img src={nftData[parseInt(id)].img} alt="Galaxy" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <div className="meta-item">
                                        <div className="left">
                                            <h2>{nftData[parseInt(id)].title}</h2>
                                        </div>
                                        <div className="right">
                                            <span className="viewed eye mg-r-8">225</span>
                                            <span to="/login" className="liked heart wishlist-button"><span className="number-like">100</span></span>
                                        </div>
                                    </div>
                                    <div className="client-infor sc-card-product">
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img src={img6} alt="Galaxy" />
                                                </div>
                                                <div className="info">
                                                    <span>Owned By</span>
                                                    <h6> <Link to="/author">{nftData[parseInt(id)].nameCollection}</Link> </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img src={img7} alt="Galaxy" />
                                                </div>
                                                <div className="info">
                                                    <span>Create By</span>
                                                    <h6> <Link to="/author">{nftData[parseInt(id)].nameAuthor}</Link> </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget.
                                        Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae ipsum malesuada.
                                        Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget.
                                        Facilisi lobortisal morbi fringilla urna amet sed ipsum</p>
                                    <div className="meta-item-details">
                                        <div className="item-style-2 item-details">
                                            <ul className="list-details">
                                                <li><span>Artist : </span><h6>{nftData[parseInt(id)].imgAuthor}</h6> </li>
                                                <li><span>Size : </span><h6>3000 x 3000</h6> </li>
                                                <li><span>Create : </span><h6>04 April , 2021</h6> </li>
                                                <li><span>Collection : </span><h6>Cyberpunk City Art</h6> </li>
                                            </ul>
                                        </div>
                                        <div className="item-style-2">
                                            <div className="item meta-price">
                                                <span className="heading">Current Bid</span>
                                                <div className="price">
                                                    <div className="price-box">
                                                        <h5> 4.89 ETH</h5>
                                                        <span>= $12.246</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item count-down">
                                            <Countdown date={Date.now() + 500000000}>
                                                <span>You are good to go!</span>
                                            </Countdown>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/wallet-connect" className="sc-button loadmore style bag fl-button pri-3"><span>Place a bid</span></Link>
                                    <div className="flat-tabs themesflat-tabs">
                                    <Tabs>
                                        <TabList>
                                        <Tab>Bid History</Tab>
                                        <Tab>Info</Tab>
                                        <Tab>Provenance</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <ul className="bid-history-list">
                                                {
                                                    dataHistory.map((item, index) => (
                                                        <li key={index} item={item}>
                                                            <div className="content">
                                                                <div className="client">
                                                                    <div className="sc-author-box style-2">
                                                                        <div className="author-avatar">
                                                                            <Link to="#">
                                                                                <img src={item.img} alt="Galaxy" className="avatar" />
                                                                            </Link>
                                                                            <div className="badge"></div>
                                                                        </div>
                                                                        <div className="author-infor">
                                                                            <div className="name">
                                                                                <h6><Link to="/author-02">{item.name} </Link></h6> <span> place a bid</span>
                                                                            </div>
                                                                            <span className="time">{item.time}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="price">
                                                                    <h5>{item.price}</h5>
                                                                    <span>= {item.priceChange}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            <ul className="bid-history-list">
                                                    <li>
                                                        <div className="content">
                                                            <div className="client">
                                                                <div className="sc-author-box style-2">
                                                                    <div className="author-avatar">
                                                                        <Link to="#">
                                                                            <img src={img1} alt="Galaxy" className="avatar" />
                                                                        </Link>
                                                                        <div className="badge"></div>
                                                                    </div>
                                                                    <div className="author-infor">
                                                                        <div className="name">
                                                                            <h6> <Link to="/author-02">Mason Woodward </Link></h6> <span> place a bid</span>
                                                                        </div>
                                                                        <span className="time">8 hours ago</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="provenance">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LiveAuction data={nftData} />
            <Footer />
        </div>
    );
}

export default ItemDetails02;
