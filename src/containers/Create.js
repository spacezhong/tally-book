import React from 'react';
import CategorySelect from '../components/CategorySelect';
import  './create.css';
import {Tabs,Tab} from '../components/Tabs';
import PriceForm from '../components/PriceForm';
import {SELECTOUTCOME_VIEW,SELECTINCOME_VIEW} from '../utility';
import {withRouter} from 'react-router-dom';
import withContext from '../withContext';
const categoryText=[SELECTINCOME_VIEW,SELECTOUTCOME_VIEW];
class Create extends React.Component{
  constructor(props){
      super(props);
      const {data}=this.props;
      const {items,categories}=data;
      const {id}=this.props.match.params;//id="_kly1klf4g"
      //items={
      //   "_kly1klf4g": {
      // //         "title": "buy stuff for kitten",
      // //         "price": 100,
      // //         "date": "2019-08-01",
      // //         "monthCategory": "2018-8",
      // //         "id": "_kly1klf4g",
      // //         "cid": "1",
      // //         "timestamp": 1534291200000
      // //        },

      ////categories={
      // // '1': {
      // //            "name": "旅行",
      // // //         "iconName": "ios-plane",
      // // //         "id": "1",
      // // //         "type": "outcome"
      // // //     },
      // // };
      this.state={
          categoryView:(id&&items[id])?categories[items[id].cid].type:categoryText[0],//类型是支出还是收入：'outcome':SELECTOUTCOME_VIEW
          selectedCategory:(id&&items[id])?categories[items[id].cid]:null,//选择哪个cid分类标志
      };
  };
    tabChange=(index)=>{
        this.setState({...this.state,categoryView:categoryText[index]})
    };
    selectCategory=(selectItem)=>{
        this.setState({selectedCategory:selectItem});
    };
    submitForm=(data,isEditModel)=>{
       if(!isEditModel){//创建
           console.log(data);
           //this.props.onFormSubmit({...this.props.item,title,price,date},isEditModel)
           this.props.actions.createItem(data,this.state.selectedCategory.id)//传出去给App.js的createItem方法
       }else{//重新编辑
           this.props.actions.updateItem(data,this.state.selectedCategory.id)
       };
        this.props.history.push('/')
    };
    cancelForm=()=>{
        this.props.history.push('/');
    };

  render(){

      const {data}=this.props;
      const {items,categories}=data;
      const {id}=this.props.match.params;
      console.log(id);
      const {categoryView,selectedCategory}=this.state;
      const editItem=(id&&items[id])?items[id]:{};
      console.log(editItem);
      //items={
      //   "_kly1klf4g": {
      // //         "title": "buy stuff for kitten",
      // //         "price": 100,
      // //         "date": "2019-08-01",
      // //         "monthCategory": "2018-8",
      // //         "id": "_kly1klf4g",
      // //         "cid": "1",
      // //         "timestamp": 1534291200000
      // //        },

      ////categories={
      // // '1': {
      // //            "name": "旅行",
      // // //         "iconName": "ios-plane",
      // // //         "id": "1",
      // // //         "type": "outcome"
      // // //     },
      // // };

      //const filterCategories = Object.keys(categories)
      //     .filter(id => categories[id].type === selectedTab)
      //     .map(id => categories[id])
      console.log(categories);
      console.log(Object.keys(categories));
      const filterCategories=Object.keys(categories).filter(item =>//Object.keys(categories)=['1','2',...]
           categories[item].type === categoryView
      ).map(item=>categories[item]);
      console.log(filterCategories);

      //filterCategories=[{
      // //            "name": "旅行",
      // // //         "iconName": "ios-plane",
      // // //         "id": "1",
      // // //         "type": "outcome"
      // // //     },{...}]

      const tabIndex=categoryText.findIndex(item=>item===categoryView);//返回值：是创建数据的情形下的categoryView的默认值
      return (<React.Fragment>
                          <div className="category">
                              <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
                                  <Tab>支出</Tab>
                                  <Tab>收入</Tab>
                              </Tabs>
                          </div>
                          <div className="category">
                            <CategorySelect
                                      categories={filterCategories}
                                      selectedCategory={selectedCategory}
                                      onSelectCategory={this.selectCategory}
                                  />
                          </div>
                          <div className="category">
                              <PriceForm
                                  item={editItem}
                                  onFormSubmit={this.submitForm}
                                  onCancleSubmit={this.cancelForm}
                              />
                          </div>
                      </React.Fragment>)
                  }
};
export default withRouter(withContext(Create));