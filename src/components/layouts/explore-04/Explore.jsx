import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap-accordion'
import ExploreItem from './ExploreItem';
import todayPickData from '../../../assets/fake-data/data-today-pick';
import Moralis from 'moralis';
import { useMoralisWeb3Api } from "react-moralis";
import console from "console-browserify";
import Web3DataService from "../../../server/w3server";
import Spinner from 'react-bootstrap/Spinner';

const Explore = (props) => {
    const data = props.data;
    const Web3Api = useMoralisWeb3Api();
    let [nftData, setNftData] = useState(null);
    let [searchData, setSearchData] = useState([]);
    let tempNftData = [];
    let length;

    useEffect(() => {
        // Update the document title using the browser API
        console.log("runnign useeffect")
        if (searchData.length === 0) {
            async function fetchData() {
                // You can await here
                let data = await Web3DataService.web3NftSearchColln(Web3Api, "art", "eth", "name,description,attributes")
                setNftData(data);
                let mappedData = await Web3DataService.web3NftCollnMapping(data, 10);
                setSearchData(mappedData);
            }
            fetchData();
        }
    }, []);
    console.log("searched data", nftData, searchData)

    const handleOnChange = async (object) => {
        console.log("checked value", object.field)
        let query = {
            field: object.field,
            chain: object.chain
        }
        searchData(await Web3DataService.web3NftSearchColln(object.field, "eth", "name,description,attributes"))
    }
    return (
        <section className="tf-explore tf-section">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                        <div id="side-bar" className="side-bar style-3">
                            {
                                data.map((item, index) => (
                                    <div className="widget widget-category mgbt-24 boder-bt" key={index}>
                                        <div className="content-wg-category">
                                            <Accordion title={item.title} show={true}>
                                                <form action="#">
                                                    {
                                                        item.content.map((itemm, index) => (
                                                            <div key={index}>
                                                                <label>{itemm.field}
                                                                    <input type="checkbox" defaultChecked={itemm.checked} onChange={() => handleOnChange(itemm)} />
                                                                    <span className="btn-checkbox"></span>
                                                                </label><br />
                                                            </div>
                                                        ))
                                                    }
                                                </form>
                                            </Accordion>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-12">
                        {searchData.length === 0 && (
                                <Spinner animation="border" variant="primary" /> 
                        )}

                        {searchData.length !== 0 && (
                            <ExploreItem data={(searchData.length === 0) ? [] : searchData} />
                        )}
                        {/* {
                            (searchData.length === 0) ? 
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div> 
                            : 
                        } */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Explore;
