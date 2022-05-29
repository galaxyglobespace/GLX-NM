import console from "console-browserify";
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/auctions/LiveAuction';
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";

function Web3func(){
    const Web3Api = useMoralisWeb3Api();

    const resolveLink = (url)=> {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    const collectionnft= async () => {
        // const options = { address: "0x2f38736df77135f7d631ed366a1c40e0a8efe2c1", chain: "mumbai" };
        // const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
        // console.log(NFTs)
        let length;
        console.log("nft data from web3 server before call");
        let NftCollection = [];
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
            NftCollection[i] = nftData
            console.log("nft data from webs3 server", NftCollection[i]);
        }
        return NftCollection;
    }
}
// class Web3ApiService {

//     resolveLink(url) {
//         if (!url || !url.includes("ipfs://")) return url;
//         return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
//     };

//     async collectionnft(){
//         // const options = { address: "0x2f38736df77135f7d631ed366a1c40e0a8efe2c1", chain: "mumbai" };
//         // const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
//         // console.log(NFTs)
//         let length;
//         console.log("nft data from web3 server before call");
//         let NftCollection = [];
//         const options = { address: "0x3727B6e588c7A97Ae00E6bA710E2B15c85Ae4014", chain: "rinkeby" };
//         const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
//         console.log("nft data from server after call", NFTs);
//         length = NFTs.total
//         // setCollecionName(data2)
//         for (let i = 0; i < length; i++) {
//             let response = await fetch(NFTs.result[i].token_uri);
//             let jsonData = await response.json();
//             let nftData = {
//                 img: resolveLink(jsonData.image),
//                 title: jsonData.name,
//                 tags: "bsc",
//                 imgAuthor: "saptarshi",
//                 nameAuthor: "SalvadorDali",
//                 price: "4.89 ETH",
//                 priceChange: "$12.246",
//                 wishlist: "100",
//                 imgCollection: "NFT collection",
//                 nameCollection: "Colorful Abstract"
//             }
//             NftCollection[i] = nftData
//             console.log("nft data from webs3 server", NftCollection[i]);
//         }
//         return NftCollection;
//     }

//     ServerUrl(){

//         const Web3Api = useMoralisWeb3Api();

//         const widgetSidebarData = [
//             {
//                 id: 1,
//                 title: "Status",
//                 content: [
//                     {
//                         field: 'Buy Now',
//                         checked: 'checked'
//                     },
//                     {
//                         field: 'On Auctions'
//                     },
//                     {
//                         field: 'Has Offers'
//                     },
//                 ]
//             },
//             {
//                 id: 2,
//                 title: "Categories",
//                 content: [
//                     {
//                         name: 'Art',
//                         field: 'art'
//                     },
//                     {
//                         name: 'Music',
//                         field: 'music'
//                     },
//                     {
//                         name: 'Virtual Worlds',
//                         field: 'virtual worlds'
//                     },
//                     {
//                         name: 'Sports',
//                         field: 'sports'
//                     },
//                     {
//                         name: 'Utility',
//                         field: 'utility'
//                     },
//                 ]
//             },
//             {
//                 id: 3,
//                 title: "Chains",
//                 content: [
//                     {
//                         name: 'Ethereum',
//                         field: 'eth'
//                     },
//                     {
//                         field: 'Polygon',
//                         field: 'pol'
//                     },
//                     {
//                         name: 'Klaytn',
//                         field: 'Klaytn'
//                     },
//                 ]
//             },
//             // {
//             //     id: 4,
//             //     title: "Collections",
//             //     content: [
//             //         {
//             //             field: 'Abstraction'
//             //         },
//             //         {
//             //             field: 'Patternlicious'
//             //         },
//             //         {
//             //             field: 'Skecthify'
//             //         },
//             //         {
//             //             field: 'Cartoonism'
//             //         },
//             //         {
//             //             field: 'Virtuland'
//             //         },
//             //         {
//             //             field: 'Papercut'
//             //         },
//             //     ]
//             // },
//         ]



//         const searchNft = async (query) => {
//             const options = { q: query.field, chain: query.chain, filter: "name,description,attributes" };
//             const NFTs = await Web3Api.token.searchNFTs(options);
//             const length = NFTs.total
//             for (let i = 0; i < 20; i++) {
//                 const image = NFTs.result[i].token_uri
//                 fetch(image)
//                     .then(response => response.json())
//                     .then((jsonData) => {
//                         console.log(jsonData)
//                         console.log(jsonData.image)
//                         for (let i = 0; i < 7; i++) {
//                             const att = jsonData.attributes[i]
//                             console.log(`${att.trait_type} => ${att.value}`)
//                         }
//                     })
//                     .catch((error) => {
//                         console.error(error)
//                     })
//             }
//         }
//         const artnft = async () => {
//             const options = { q: "art", chain: "eth", filter: "name,description,attributes" };
//             const NFTs = await Web3Api.token.searchNFTs(options);
//             const length = NFTs.total
//             for (let i = 0; i < 20; i++) {
//                 const image = NFTs.result[i].token_uri
//                 fetch(image)
//                     .then(response => response.json())
//                     .then((jsonData) => {
//                         console.log(jsonData)
//                         console.log(jsonData.image)
//                         for (let i = 0; i < 7; i++) {
//                             const att = jsonData.attributes[i]
//                             console.log(`${att.trait_type} => ${att.value}`)
//                         }
//                     })
//                     .catch((error) => {
//                         console.error(error)
//                     })
//             }
//         };


//         const musicnft = async () => {
//             const options = { q: "music", chain: "eth", filter: "name,description,attributes" };
//             const NFTs = await Web3Api.token.searchNFTs(options);
//             const length = NFTs.total
//             for (let i = 0; i < 20; i++) {
//                 const image = NFTs.result[i].token_uri
//                 fetch(image)
//                     .then(response => response.json())
//                     .then((jsonData) => {
//                         console.log(jsonData)
//                         console.log(jsonData.image)
//                         for (let i = 0; i < 7; i++) {
//                             const att = jsonData.attributes[i]
//                             console.log(`${att.trait_type} => ${att.value}`)
//                         }
//                     })
//                     .catch((error) => {
//                         console.error(error)
//                     })
//             }
//         };


//         const collectablenft = async () => {
//             const options = { q: "collectable", chain: "eth", filter: "name,description,attributes" };
//             const NFTs = await Web3Api.token.searchNFTs(options);
//             const length = NFTs.total
//             for (let i = 0; i < 20; i++) {
//                 const image = NFTs.result[i].token_uri
//                 fetch(image)
//                     .then(response => response.json())
//                     .then((jsonData) => {
//                         console.log(jsonData)
//                         console.log(jsonData.image)
//                         for (let i = 0; i < 7; i++) {
//                             const att = jsonData.attributes[i]
//                             console.log(`${att.trait_type} => ${att.value}`)
//                         }
//                     })
//                     .catch((error) => {
//                         console.error(error)
//                     })
//             }
//         };


//         const sportsnft = async () => {
//             const options = { q: "sports", chain: "eth", filter: "name,description,attributes" };
//             const NFTs = await Web3Api.token.searchNFTs(options);
//             const length = NFTs.total
//             for (let i = 0; i < 20; i++) {
//                 const image = NFTs.result[i].token_uri
//                 fetch(image)
//                     .then(response => response.json())
//                     .then((jsonData) => {
//                         console.log(jsonData)
//                         console.log(jsonData.image)
//                         for (let i = 0; i < 7; i++) {
//                             const att = jsonData.attributes[i]
//                             console.log(`${att.trait_type} => ${att.value}`)
//                         }
//                     })
//                     .catch((error) => {
//                         console.error(error)
//                     })
//             }
//         };


//     }
// }

export default Web3func;


