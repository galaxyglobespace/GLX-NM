import console from "console-browserify";
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";


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

const Web3DataService = {
    
    Web3Api: function () {
        const Web3Api = useMoralisWeb3Api();
        return Web3Api;
    },
    filters: widgetSidebarData,

    resolveLink: function (url) {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    },

    web3NftDataColln: async function () {
        const options = { address: "0x3727B6e588c7A97Ae00E6bA710E2B15c85Ae4014", chain: "rinkeby" };
        const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
        // console.log("Nft Data list from web3server", NFTs);
        return NFTs;
    },

    web3NftSearchColln: async function (web3Api, query, chain, filter) {
        const options = { q: query, chain: chain, filter: "name,description,attributes" };
        const NFTs = await web3Api.token.searchNFTs(options);
        // console.log("Nft Data list after searching web3server", NFTs);
        return NFTs;
    },

    web3NftCollnMapping: async function (NFTs, length) {
        console.log("Nft Data before mapping the nft collection", NFTs, length);
        let NftCollection = [];
        for (let i = 0; i < length; i++) {
            let response = await fetch(NFTs.result[i].token_uri);
            let jsonData = await response.json();
            let nftData = {
                img: this.resolveLink(jsonData.image),
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
        }
        console.log("Nft Data after mapping the nft collection", NftCollection);
        return NftCollection;
    },

};

export default Web3DataService;

