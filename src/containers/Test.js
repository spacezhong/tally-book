import React from 'react';
import PriceList from '../components/PriceList';
import {INCOME, padLeft, parseToYearAndMonth} from "../utility";
const categories={//属性名就是数据中的id值,表示的是具体的分类
    "1":{
        "id":1,
        "name":'旅行',
        "type":'outcome',
        "iconName":'ios-plane'
    },
    "2":{
        "id":2,
        "name":'理财',
        "type":'income',
        "iconName":'logo-yen'
    }
};
const items=[
    {
        "id":1,
        "title":"去云南旅行",
        "price":200,
        "date":'2019-08-10',
        "cid":1//cid是外键，通过这个cid引用categories,表示的是分类
    },
    {
        "id":2,
        "title":"去云南旅行",
        "price":400,
        "date":'2019-08-10',
        "cid":1
    },
    {
        "id":3,
        "title":"理财收入",
        "price":200,
        "date":'2019-08-10',
        "cid":2
    }
];

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentDate:parseToYearAndMonth(),
            items
        };
    };
    modifyItem=(itemData)=>{
        console.log(itemData);
        const modifiedItem=this.state.items.map((item,index)=>{
            if(item.id===itemData.id){//如果当前项的id等于点击的那一项的id，就更改这一项的标题
                return {...item,title:'更新后的标题'}
            }else{//否则，就还是当前项
                return item;
            }
        });
        this.setState({...this.state,items:modifiedItem})
    };
    deleteItem=(itemData)=>{
        console.log(itemData);

        const filterItems=this.state.items.filter((item,index)=>{
            return item.id!==itemData.id;
        });
        this.setState({...this.state,items:filterItems})
    };
    render(){
        console.log(this.state);
        var {items,currentDate}=this.state;
        var itemsWithCategories=items.map(item=>{//生成拼接的数组，并且过滤出state里的当前年月的那些条数据数组
            item.category=categories[item.cid];
            return item;
        });
        console.log(itemsWithCategories);
        itemsWithCategories=itemsWithCategories.filter(item=>{
            return  item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        });
        console.log(itemsWithCategories);
        return(
            <PriceList
                items={itemsWithCategories}
                onModifyItem={this.modifyItem}
                onDeleteItem={this.deleteItem}
            />
        )
    }
};
export default Test;