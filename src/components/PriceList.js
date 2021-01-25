import React from 'react';
import Ionicon from 'react-ionicons';
import 'bootstrap/dist/css/bootstrap.css';
import  PropTypes from 'prop-types';
const PriceList=({items,onModifyItem,onDeleteItem})=>{
    return (
        <ul className='list-group ist-group-flush'>
            {
                //items=itemsWithCategories=[
                //       {
                // //         "title": "buy stuff for kitten",
                // //         "price": 100,
                // //         "date": "2019-08-01",
                // //         "monthCategory": "2018-8",
                // //         "id": "_kly1klf4g",
                // //         "cid": "1",
                // //         "timestamp": 1534291200000,
                // //          "category":{
                // // //                   "name": "旅行",
                // // // //                "iconName": "ios-plane",
                // // // //                "id": "1",
                // // // //                 "type": "outcome"
                // // // //            },
                // //     };,{...}]
                items.map((item)=>(
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                        <span className=" col-1 badge badge-primary ">
                            <Ionicon
                                className='rounded-circle'
                                fontSize='30px'
                                style={{backgroundColor:'#007bff', padding:"5px"}}
                                color='#fff'
                                icon={item.category.iconName}
                            />
                        </span>
                        <span className="col-5">{item.title}</span>
                        <span className="col-2 font-weight-bold">{(item.category.type==='income')? '+' : '-'}{item.price}元</span>
                        <span className="col-2">{item.date}</span>
                        <a className="col-1 " onClick={()=>{onModifyItem(item)}}>
                            <Ionicon
                                className='rounded-circle'
                                fontSize='30px'
                                style={{backgroundColor:'#28a745', padding:"5px"}}
                                color='#fff'
                                icon='ios-create-outline'/>
                        </a>
                        <a className="col-1 " onClick={()=>{onDeleteItem(item)}}>
                            <Ionicon
                                className='rounded-circle'
                                fontSize='30px'
                                style={{backgroundColor:'#dc3545', padding:"5px"}}
                                color='#fff'
                                icon='ios-close'/>
                        </a>
                    </li>
                ))
            }
        </ul>
    )
};
PriceList.prototype={
    items:PropTypes.array.isRequired,
    onModifyItem:PropTypes.func.isRequired,
    onDeleteItem:PropTypes.func.isRequired
};

export default PriceList;