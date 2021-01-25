import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import Ionicon from "react-ionicons";
class CategorySelect extends React.Component{
   constructor(props){
        super(props);
        this.state={
            activeSelect:false
        }
    }
    selectCategory=(event,item)=>{
        this.setState({activeSelect:item});
        this.props.onSelectCategory(item);
        event.preventDefault();

    };
    render (){
        const {categories,selectedCategory}=this.props;
        const {activeSelect}=this.state;
        const selectedCategoryId=selectedCategory&&selectedCategory.id;
        return (
           <div className="category-select-component">
                <div className="row">
                    {
                        categories.map((item,index)=>{
                            const backColor=(selectedCategoryId===item.id)?'blue':'lightGrey';
                            const iconColor=(selectedCategoryId===item.id)?'white':'grey';
                            const activeClassName=(selectedCategoryId===item.id)?'category-item col-3 active':'category-item col-3';
                            return(
                            <div role='button'
                                className={activeClassName}
                                 key={index}
                                 onClick={(event)=>{this.selectCategory(event,item)}}
                            >
                                <Ionicon
                                    className='rounded-circle'
                                    fontSize='50px'
                                    style={{backgroundColor:backColor,padding:"5px"}}
                                    color={iconColor}
                                    icon={item.iconName}
                                />
                                <p>
                                    {item.name}
                                </p>
                            </div>
                        )})
                    }
                </div>
           </div>
        )
    }
};
export default CategorySelect;