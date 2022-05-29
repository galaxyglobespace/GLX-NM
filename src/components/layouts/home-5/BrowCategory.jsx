import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import music from '../../../assets/images/category/music.jpeg'
import art from '../../../assets/images/category/art.jpg'
import sports from '../../../assets/images/category/sports.jpeg'
import utility from '../../../assets/images/category/utility.jpg'
import virtualreality from '../../../assets/images/category/virtualreality.jpg'

const BrowCategory = () => {
    const [data] = useState(
        [
            {
                title: 'Music',
                img: music
            },
            {
                title: 'Virutal world',
                img: virtualreality
            },
            {
                title: 'Utility',
                img: utility
            },
            {
                title: 'Sports',
                img: sports
            },
            {
                title: 'Art',
                img: art
            },
        ]
    )
    return (
        <section className="tf-section brow-category home5 bg-style2">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading-live-auctions">
                            <h2 className="tf-title text-left pb-40">
                                Brow By Category</h2>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <Swiper
                            modules={[ Scrollbar, A11y ]}
                                spaceBetween={32}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        },
                                    767: {
                                        slidesPerView: 2,
                                    },
                                    991: {
                                        slidesPerView: 4,
                                    },
                                    }}
                                loop={{ draggable: false }}
                                scrollbar={{ draggable: false }}
                                >
                                {
                                    data.map((item,index) => (
                                        <SwiperSlide key={index} >
                                            <div className="swiper-slide">
                                                <div className="slider-item">										
                                                    <div className="sc-card-product explode style2">
                                                        <div className="type-title">
                                                            <h3>{item.title}</h3>
                                                        </div>
                                                        <div className="card-media">
                                                            <Link to="/explore"><img src={item.img} alt="Galaxy" className='img-responsive' style={{height:"200px"}} /></Link>
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
    );
}

export default BrowCategory;
