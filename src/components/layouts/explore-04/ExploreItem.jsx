import React, { useEffect, useState , Fragment } from 'react';
import { Link } from 'react-router-dom'
import CardModal from '../CardModal';
import console from "console-browserify";
import {useMoralisDapp} from '../MoralisDappProvider/MoralisDappProvider';
import { useWeb3ExecuteFunction ,useMoralisQuery} from "react-moralis";
import { useMoralis } from "react-moralis";

const ExploreItem = props => {
    const data = props.data
    const { user} = useMoralis();
    const { Moralis } = useMoralis();
    const [nftToBuy,setNftToBuy] = useState(null);
    const [nftToSell, setNftToSell] = useState(null);
    const { chainId, marketAddress, contractABI } = useMoralisDapp();
    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = contractABI;
    const listItemFunction = "createMarketItem";
    const purchaseItemFunction = "createMarketSale";
    const [cost,setCost] = useState();
    const decimals = 18;
    let wAd
    const queryMarketItems = useMoralisQuery("LiveNFTMarketplace");
    const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  const [loading, setLoading] = useState(false);
  const [visible , setVisible] = useState(6);
  const showMoreItems = () => {
      setVisible((prevValue) => prevValue + 6);
  }
  const [modalShow, setModalShow] = useState(false);
  const [walletAddress, setWalletAddress] = useState();

  const getFG = async() =>{
      console.log(data);
  } 


  const getMarketItem = (nft) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nft.token_address &&
        e.tokenId === nft.token_id &&
        e.sold === false &&
        e.confirmed === true
        );
    return result;
  };

  const getWAddress = () =>{
    if(user){
        wAd = user.get('ethAddress');
        setWalletAddress(wAd);
    }
}

  const handleBuyClick = async (nft) =>{
    setNftToBuy(nft);
    // console.log(nftToBuy);
    // console.log(getMarketItem(nftToBuy).price / ("1e" + 18))
    setLoading(true);
    const tokenDetails = getMarketItem(nftToBuy);
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;
    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID,
      },
      msgValue: tokenPrice,
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        updateSoldMarketItem()
        
      },
      onError: (error) => {
        
        console.log(error)
      },
    });
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("CreatedMarketItemTest");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }



    useEffect(() => {
        getWAddress()
        // Update the document title using the browser API
        // if (nftData.length === 0) {
        //     collectionnft();
        //     // setNftData(nftcollection)
        console.log("props data is", props.data);

        // }
    }, [props.data]);

    return (
        <Fragment>
            <div className='explore'>
                <div className="box-epxlore">
                    {
                        data.slice(0,visible).map((item,index) => (
                            <div className={`sc-card-product explode style2 mg-bt ${item.feature ? 'comingsoon' : '' } `} key={index}>
                            <div className="card-media">
                                <Link to="/item-details-02"><img src={item.img} alt="Galaxy" /></Link>
                                {/* {getMarketItem(NFT) && 
                                            <div>
                                                <div className='text-center'>
                                                    <button onClick={()=>{handleBuyClick(NFT)}} className='btn btn-primary me-5' >Buy</button>
                                                </div>

                                        </div>
                                        } */}
                                        <button onClick={()=>{getFG()}}>shd</button>
                                <div className="button-place-bid">
                                    <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></button>
                                </div>
                                <Link to="/login" className="wishlist-button heart"><span className="number-like">{item.wishlist}</span></Link>
                                <div className="coming-soon">{item.feature}</div>
                            </div>
                            <div className="card-title">
                                <h5><Link to="/item-details-02">"{item.title}"</Link></h5>
                            </div>
                            <div className="meta-info">
                                <div className="author">
                                    <div className="avatar">
                                        <img src={item.imgAuthor} alt="Galaxy" />
                                    </div>
                                    <div className="info">
                                        <span>Creator</span>
                                        <h6> <Link to="/author-02">{item.nameAuthor}</Link> </h6>
                                    </div>
                                </div>
                                <div className="tags">{item.tags}</div>
                            </div>
                            <div className="card-bottom style-explode">
                                <div className="price">
                                    <span>Price</span>
                                    <div className="price-details">
                                        <h5>{item.price}</h5>
                                        <span>= {item.priceChange}</span>
                                    </div>
                                </div>
                                <Link to="/activity-02" className="view-history reload">View History</Link>
                            </div>
                        </div>
                        ))
                    }
                </div>
                {
                    visible < data.length && 
                    <div className="btn-auction center"> 
                        <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                    </div>
                }
            </div>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>
    );
}

export default ExploreItem;
