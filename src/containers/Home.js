import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {withRouter} from 'react-router-dom';
import  {LIST_VIEW,CHART_VIEW,INCOME,OUTCOME,padLeft,parseToYearAndMonth} from '../utility';

import YearMonthPicker from '../components/YearMonthPicker';
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn';
import PriceList from '../components/PriceList';
import {Tabs,Tab} from '../components/Tabs';
import './home.css';
import Ionicon from "react-ionicons";
import withContext from '../withContext';
import CustomPieChart from '../components/CustomPieChart';

const tabText=[LIST_VIEW,CHART_VIEW];
const generateChartDataByCategory=(items,type)=>{
    let categoryMap={};
    items.filter(item=>item.category.type===type).forEach(item=>{
        if(categoryMap[item.cid]){
            categoryMap[item.cid].value+=(item.price *1);
            categoryMap[item.cid].items.push(item.id);
        }else{
            categoryMap[item.cid]={
              name:item.category.name,
              value:item.price*1,
              items:[item.id]
            };
        }
    });
    return Object.keys(categoryMap).map(item=>{
        return {...categoryMap[item]}
    });
};

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentDate:parseToYearAndMonth(),//这样初始时间就是当前的时间
            view:tabText[0],
            //这个状态的取值形式非常重要，联系了Tabs组件和它影响的列表组件和图表组件，因为下面的列表组件和图表组件
            // 根据tabText[index]进行展示，在Tabs组件传出的回调函数里，重新setState（）这个属性，能使切换列表组件和图表组件，使视图更新

        };
    };
    changeDate=(year,month)=>{
        this.setState({...this.state,currentDate:{year,month}});
    };
    changeView=(viewIndex)=>{
        this.setState({view:tabText[viewIndex]});
    };
    createItem=()=>{
        this.props.history.push('/create')
    };
    modifyItem=(itemData)=>{//点击编辑按钮，把当前项传出去了，在跳转的路径里，传入了item.id; item.id="_kly1klf4g";
        this.props.history.push(`/edit/${itemData.id}`)
    };
    deleteItem=(itemData)=>{
        this.props.actions.deleteItem(itemData);
        console.log(this.props.data);
    };

    render(){
        const {data}=this.props;
        var {items,categories}=data;
        var itemsWithCategories=Object.keys(items).map(item=>{//生成拼接的数组，并且过滤出state里的当前年月的那些条数据数组
            //item="_kly1klf4g"
            items[item].category=categories[items[item].cid];
            return items[item];
        }).filter(item=>{
            return  item.date.includes(`${this.state.currentDate.year}-${padLeft(this.state.currentDate.month)}`)
        });

 // itemsWithCategories=[{
//         "title": "buy stuff for kitten",
//         "price": 100,
//         "date": "2019-08-01",
//         "monthCategory": "2018-8",
//         "id": "_kly1klf4g",
//         "cid": "1",
//         "timestamp": 1534291200000,
//          "category":{
// //                   "name": "旅行",
// // //                "iconName": "ios-plane",
// // //                "id": "1",
// // //                 "type": "outcome"
// // //            },
//     },
//   {...}];
        //items={
        // "_kly1klf4g": {
//         "title": "buy stuff for kitten",
//         "price": 100,
//         "date": "2019-08-01",
//         "monthCategory": "2018-8",
//         "id": "_kly1klf4g",
//         "cid": "1",
//         "timestamp": 1534291200000
//        },
//      };
//categories={
// '1': {
//         "name": "旅行",
// //         "iconName": "ios-plane",
// //         "id": "1",
// //         "type": "outcome"
// //     },
// };
        //Object.keys(items)=[
        //          "_kly1klf4g",'...'
        //       ]
        //计算收入和支出总和，这个itemsWithCategories是由state的

        var totalIncome=0,totalOutcome=0;
        itemsWithCategories.forEach(item=>{
           if(item.category.type===INCOME){
                totalIncome+=item.price;
           }else{
               totalOutcome+=item.price;
           }
        });
        const chartOutcomeDataByCategory=generateChartDataByCategory(itemsWithCategories,OUTCOME);
        const chartIncomeDataByCategory=generateChartDataByCategory(itemsWithCategories,INCOME)
        return (
                        <React.Fragment>
                            <header className='Home-header'>
                                <h2>Keep 记账</h2>
                                <div className='row'>
                                    <div className="col">
                                        <YearMonthPicker
                                            year={this.state.currentDate.year}
                                            month={this.state.currentDate.month}
                                            onChange={this.changeDate}
                                        />
                                    </div>
                                    <div className="col">
                                        <TotalPrice
                                            income={totalIncome}
                                            outcome={totalOutcome}
                                        />
                                    </div>
                                </div>
                            </header>
                            <div className="content">
                                <Tabs activeIndex={0} onTabChange={this.changeView}>
                                    <Tab>
                                        <Ionicon
                                            className='rounded-circle mr-2'
                                            fontSize='25px'
                                            color='#007bff'
                                            icon='ios-paper'
                                        />
                                        列表模式
                                    </Tab>
                                    <Tab>
                                        <Ionicon
                                            className='rounded-circle mr-2'
                                            fontSize='25px'
                                            color='#007bff'
                                            icon='ios-pie'
                                        />
                                        图表模式
                                    </Tab>
                                </Tabs>
                                <CreateBtn
                                    onCreateItem={this.createItem}
                                    onClick={()=>{}}
                                />
                                {
                                    this.state.view===LIST_VIEW && <PriceList
                                        items={itemsWithCategories}
                                        onModifyItem={this.modifyItem}
                                        onDeleteItem={this.deleteItem}
                                    />
                                }
                                {
                                    this.state.view===LIST_VIEW && itemsWithCategories.length===0 &&
                                        <div className="alert alert-light text-center">
                                            您还没有任何记账记录
                                        </div>
                                }
                                {
                                    this.state.view===CHART_VIEW &&
                                    <React.Fragment>
                                        <CustomPieChart title='本月收入' categoryData={chartIncomeDataByCategory}/>
                                        <CustomPieChart title='本月支出' categoryData={chartOutcomeDataByCategory}/>
                                    </React.Fragment>
                                }
                            </div>
                        </React.Fragment>
                    )
                }
};
export default withRouter(withContext(Home));


