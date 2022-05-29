import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Explore from '../components/layouts/explore-04/Explore';
// import widgetSidebarData from '../assets/fake-data/data-widget-sidebar'
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";


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
                field: 'art'
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
    const Web3Api = useMoralisWeb3Api();
    const [nftData, setNftData] = useState([]);
    

    let data = [];
    let length;

    useEffect(() => {
        // Update the document title using the browser API
        if (nftData.length === 0) {
            collectionnft();
            // setNftData(nftcollection)
            console.log("nft data in useEffect", nftData);

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
                                <h1 className="heading text-center">Explore</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Explore</li>
                                    {/* <button onClick={collectionnft}>Collection</button>
                            <button onClick={artnft}>Art</button>
                            <button onClick={musicnft}>Music</button>
                            <button onClick={collectablenft}>Collectable</button>
                            <button onClick={sportsnft}>Sports</button> */}
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