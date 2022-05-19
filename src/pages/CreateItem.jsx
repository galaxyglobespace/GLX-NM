import React, { useEffect, useState } from 'react';
import { Link, Routes } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import img1 from '../assets/images/box-item/image-box-6.jpg'
import avt from '../assets/images/avatar/avt-9.jpg'
import Moralis from 'moralis';
import { useMoralis } from "react-moralis";
import Web3 from 'web3';
import ContractABI from './constant/contract';
const web3 = new Web3(Web3.givenProvider)
const ContractAddress = "0x6256626eb4B7609F68Fc4fAE157d6b8A71dCc327";





const CreateItem = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[file,setFile] = useState(null);

    const mintFunction = async(e) =>{
        e.preventDefault();
        try{
            //save image
            const file1 = new Moralis.File(file.name,file);
            await file1.saveIPFS();
            const file1url = file1.ipfs()
            //save metadata
            const metadata = {
                name,description,image : file1url
            }
            const file2 = new Moralis.File(`${name}metadata.json`,{
                base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            });
            await file2.saveIPFS();
            const metadataUrl = file2.ipfs();
            //interact with smart contract
            const contract = new web3.eth.Contract(ContractABI,ContractAddress)
            const response = await contract.methods.mint(metadataUrl).send({from : user.get('ethAddress')});
            const tokenId = response.events.transfer.returnValues.tokenId;
            
            alert("NFT MINTED SUCCESSFULLY")
        }catch(err){
            console.error(err)
        }
        console.log("hello")
    
    }
    
    return (
        <div className='create-item'>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Create Item</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Pages</Link></li>
                                    <li>Create Item</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">
                    <div className="row">
                         <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                             <h4 className="title-create-item">Preview item</h4>
                            <div className="sc-card-product">
                                <div className="card-media">
                                    <Link to="/item-details-02"><img src={img1} alt="Galaxy" /></Link>
                                    <Link to="/login" className="wishlist-button heart"><span className="number-like"> 100</span></Link>
                                    <div className="featured-countdown">
                                        <span className="slogan"></span>
                                        <Countdown date={Date.now() + 500000000}>
                                            <span>You are good to go!</span>
                                        </Countdown>
                                    </div>
                                </div>
                                <div className="card-title">
                                    <h4><Link to="/item-details-02">{name}</Link></h4>

                                    <div className="tags">bsc</div>
                                </div>
                                    <h5><Link to="/item-details-02">{description}</Link></h5>
                                <div className="meta-info">
                                    <div className="author">
                                        <div className="avatar">
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div className="card-bottom">
                                    <Link to="/wallet-connect" className="sc-button style bag fl-button pri-3"><span>Place Bid</span></Link>
                                    <Link to="/activity-02" className="view-history reload">View History</Link>
                                </div>
                            </div>
                         </div>
                         <div className="col-xl-9 col-lg-6 col-md-12 col-12">
                             <div className="form-create-item">
                                 
                                <div className="flat-tabs tab-create-item">
                                    <Tabs>
                                        

                                        <TabPanel>
                                            <form onSubmit={mintFunction}>
                                                

                                                <h4 className="title-create-item">Image</h4>
                                                <input type="file" onChange={e=>setFile(e.target.files[0])} />

                                                <h4 className="title-create-item">Title</h4>
                                                <input type="text" placeholder="Item Name" value={name} onChange={e => setName(e.target.value)}/>

                                                <h4 className="title-create-item">Description</h4>
                                                <textarea placeholder="e.g. “This is very limited item”" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                                                <button type='submit'> Submit</button>

                                                {/* <div className="row-form style-3">
                                                    <div className="inner-row-form">
                                                        <h4 className="title-create-item">Royalties</h4>
                                                        <input type="text" placeholder="5%" />
                                                    </div>
                                                    <div className="inner-row-form">
                                                        <h4 className="title-create-item">Size</h4>
                                                        <input type="text" placeholder="e.g. “size”" />
                                                    </div>
                                                    <div className="inner-row-form style-2">
                                                        <div className="seclect-box">
                                                            <div id="item-create" className="dropdown">
                                                                <Link to="#" className="btn-selector nolink">Abstraction</Link>
                                                                <ul >
                                                                    <li><span>Art</span></li>
                                                                    <li><span>Music</span></li>
                                                                    <li><span>Domain Names</span></li>
                                                                    <li><span>Virtual World</span></li>
                                                                    <li><span>Trading Cards</span></li>
                                                                    <li><span>Sports</span></li>
                                                                    <li><span>Utility</span></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </form>
                                        </TabPanel>
                                        <TabPanel>
                                            <form action="#">
                                                <h4 className="title-create-item">Minimum bid</h4>
                                                <input type="text" placeholder="enter minimum bid" />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5 className="title-create-item">Starting date</h5>
                                                        <input type="date" name="bid_starting_date" id="bid_starting_date" className="form-control" min="1997-01-01" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4 className="title-create-item">Expiration date</h4>
                                                        <input type="date" name="bid_expiration_date" id="bid_expiration_date" className="form-control" />
                                                    </div>
                                                </div>

                                                <h4 className="title-create-item">Title</h4>
                                                <input type="text" placeholder="Item Name" />

                                                <h4 className="title-create-item">Description</h4>
                                                <textarea placeholder="e.g. “This is very limited item”"></textarea>
                                            </form>
                                        </TabPanel>
                                        <TabPanel>
                                            <form action="#">
                                                <h4 className="title-create-item">Price</h4>
                                                <input type="text" placeholder="Enter price for one item (ETH)" />

                                                <h4 className="title-create-item">Minimum bid</h4>
                                                <input type="text" placeholder="enter minimum bid" />

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5 className="title-create-item">Starting date</h5>
                                                        <input type="date" name="bid_starting_date" id="bid_starting_date2" className="form-control" min="1997-01-01" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4 className="title-create-item">Expiration date</h4>
                                                        <input type="date" name="bid_expiration_date" id="bid_expiration_date2" className="form-control" />
                                                    </div>
                                                </div>

                                                <h4 className="title-create-item">Title</h4>
                                                <input type="text" placeholder="Item Name" />

                                                <h4 className="title-create-item">Description</h4>
                                                <textarea placeholder="e.g. “This is very limited item”"></textarea>
                                            </form>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateItem;
