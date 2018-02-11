import React from 'react';
import { Carousel } from 'antd';
import '../../style/menuLineTop.css';
export default class Carousels extends React.Component {
    constructor() {
        super();
    };
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        return(
            <div>
                <Carousel autoplay className="ant-carousel">
                    <div className="slick-slide"><h1>1</h1></div>
                    <div className="slick-slide"><h1>2</h1></div>
                    <div className="slick-slide"><h1>3</h1></div>
                    <div className="slick-slide"><h1>4</h1></div>
                </Carousel>
            </div>
        )
    }
}