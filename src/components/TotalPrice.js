import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import  PropTypes from 'prop-types';
const TotalPrice=({income,outcome})=>{
    return(
        <ul className="nav justify-content-center">
            <li className="nav-item mr-4 income">
               收入：<span>{income}</span>
            </li>
            <li className="nav-item outcome">
               支出：<span>{outcome}</span>
            </li>
        </ul>
    )
};
TotalPrice.propTypes={
    income:PropTypes.number.isRequired,
    outcome:PropTypes.number.isRequired
};
export default TotalPrice;