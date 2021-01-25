import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './containers/Home';
import Create from './containers/Create';
import Test from './containers/Test';
import {testCategories,testItems} from './testData';
import {flatterArr,ID,parseToYearAndMonth,padLeft} from './utility';
export const AppContext=React.createContext();

class App extends React.Component{
    constructor(){
        super();
        this.state={//里面放所有数据
            items:flatterArr(testItems),
            categories:flatterArr(testCategories),
        };
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
//};

//categories={
// '1': {
//         "name": "旅行",
// //         "iconName": "ios-plane",
// //         "id": "1",
// //         "type": "outcome"
// //     },
// };
        console.log(this.state.items);
        this.actions={//里面放处理所有数据的逻辑方法,会更改数据的方法也是放在这里的
            deleteItem:(item)=>{
                delete this.state.items[item.id];//直接删掉这一项；
                return this.setState({items:this.state.items});
            },
            createItem:(data,categoryId)=>{
                console.log(data,categoryId);
                const newID=ID();
                const parseDate=parseToYearAndMonth(data.date);//{year:2019,month:8}
                data.monthCategory=`${parseDate.year}`-`${padLeft(parseDate.month)}`;
                data.timestamp=new Date(data.date).getTime();//距"2019-08-18"的毫秒数
                const newItem={...data,id:newID,cid:categoryId};//重点：cid需要重新写，因为如果是编辑页传过来的item的话，就是原来的cid,需要更改为CategorySelect组件传出的categoryId
                this.setState({items:{...this.state.items,[newID]:newItem}});//重点：newID是变量，用[]包裹起来

                //
                //data:{id: 1, title: "得到的", price: 200, date: "2019-07-10", cid: 1}
                //id:1
                //{
                //         "title": "这是我的工资",√
                //         "price": 20000,√
                //         "date": "2019-08-18",√
                //         "monthCategory": "2018-8",√
                //         "id": "_bd16bjeen",√
                //         "cid": "2",//注意这个如果是编辑页传过来的item的话，就是原来的cid,需要更改为CategorySelect组件传出的categoryId
                //         "timestamp": 1534550400000 √
                //     },
            },
            updateItem:(data,categoryId)=>{
                const modifyItem={
                    ...data,
                    cid:categoryId,
                    timestamp:new Date(data.date).getTime()
                };
                console.log(modifyItem.cid);
                this.setState({items:{...this.state.items,[modifyItem.id]:modifyItem}})
            }
        }
    };
    //'0.23456'
    render(){
        return (
           <AppContext.Provider value={{
               state:this.state,
               actions:this.actions
           }}>
               <Router>
                   <div className="App">
                       <Route path='/' exact component={Home}/>
                       <Route path='/create' component={Create}/>
                       <Route path='/test' component={Test}/>
                       <Route path='/edit/:id' component={Create}></Route>
                   </div>
               </Router>
           </AppContext.Provider>
        );
    }
};
export default App;
