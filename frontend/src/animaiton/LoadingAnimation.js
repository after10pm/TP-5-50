import React, {useEffect, useState} from 'react';

import '../animaiton/animation.css'

const LoadingAnimation = () => {
    return (
        <div>

            <div id="circularG">
                <div className="circularG" id="circularG_1"></div>
                <div className="circularG" id="circularG_2"></div>
                <div className="circularG" id="circularG_3"></div>
                <div className="circularG" id="circularG_4"></div>
                <div className="circularG" id="circularG_5"></div>
                <div className="circularG" id="circularG_6"></div>
                <div className="circularG" id="circularG_7"></div>
                <div className="circularG" id="circularG_8"></div>
            </div>
        </div>
    );
};

export default LoadingAnimation;