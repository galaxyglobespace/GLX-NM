import React, { useEffect, useState , Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Countdown from "react-countdown";
import CardModal from '../CardModal';
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import img1 from '../../../assets/images/box-item/image-box-26.jpg'
import img2 from '../../../assets/images/box-item/image-box-27.jpg'
import img3 from '../../../assets/images/box-item/image-box-28.jpg'
import imga1 from '../../../assets/images/avatar/avt-11.jpg'
import imga2 from '../../../assets/images/avatar/avt-12.jpg'
import imga3 from '../../../assets/images/avatar/avt-13.jpg'

const LiveAuction = () => {
    const [data] = useState(
        [
            {
                img: img1,
                title: "Hamlet Contemplates ...",
                tags: "bsc",
                imgAuthor: imga1,
                nameAuthor: "SalvadorDali",
                price: "4.89 ETH",
                wishlist: "100",
            },
            {
                img: img2,
                title: "Triumphant Awakening...",
                tags: "bsc",
                imgAuthor: imga2,
                nameAuthor: "Trista Francis",
                price: "4.89 ETH",
                wishlist: "100",
            },
            {
                img: img3,
                title: "Triumphant Awakening...",
                tags: "bsc",
                imgAuthor: imga3,
                nameAuthor: "Trista Francis",
                price: "4.89 ETH",
                wishlist: "100",
            },
            {
                img: img1,
                title: "Triumphant Awakening...",
                tags: "bsc",
                imgAuthor: imga1,
                nameAuthor: "SalvadorDali",
                price: "4.89 ETH",
                wishlist: "100",
            },
            {
                img: img2,
                title: "Triumphant Awakening...",
                tags: "bsc",
                imgAuthor: imga2,
                nameAuthor: "Trista Francis",
                price: "4.89 ETH",
                wishlist: "100",
            },
            {
                img: img3,
                title: "Triumphant Awakening...",
                tags: "bsc",
                imgAuthor: imga3,
                nameAuthor: "Trista Francis",
                price: "4.89 ETH",
                wishlist: "100",
            },

        ]
    )
    
    const [modalShow, setModalShow] = useState(false);
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

    return (
        <Fragment>
            <section className="tf-section live-auctions">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-20">
                                    Live Auctions</h2>
                                <Link to="/live-auctions" className="exp style2">EXPLORE MORE</Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}

                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    767: {
                                    slidesPerView: 2,
                                    },
                                    991: {
                                    slidesPerView: 3,
                                    },
                                    
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                    {
                                    nftData.map((item,index) => (
                                            <SwiperSlide key={index}>
                                                <div className="swiper-container show-shadow carousel auctions">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <div className="slider-item">										
                                                                <div className="sc-card-product">
                                                                    <div className="card-media">
                                                                        <Link to="/item-details-02"><img src={item.img} alt="galaxy" /></Link>
                                                                        <Link to="/login" className="wishlist-button heart"><span className="number-like">{item.wishlist}</span></Link>
                                                                        <div className="featured-countdown">
                                                                            <span className="slogan"></span>
                                                                            <Countdown date={Date.now() + 500000000}>
                                                                                <span>You are good to go!</span>
                                                                            </Countdown>
                                                                        </div>
                                                                        <div className="button-place-bid">
                                                                            <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-title">
                                                                        <h5><Link to="/item-details-02">"{item.title}</Link></h5>
                                                                        <div className="tags">{item.tags}</div>
                                                                    </div>
                                                                    <div className="meta-info">
                                                                        <div className="author">
                                                                            <div className="avatar">
                                                                                <img src={item.imgAuthor} alt="galaxy" />
                                                                            </div>
                                                                            <div className="info">
                                                                                <span>Creator</span>
                                                                                <h6> <Link to="/authors-02">{item.nameAuthor}
                                                                                </Link> </h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="price">
                                                                            <span>Current Bid</span>
                                                                            <h5> {item.price}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>    	
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>
    );
}


export default LiveAuction;
