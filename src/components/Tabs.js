import React from 'react';
import  PropTypes from 'prop-types';

export class Tabs extends React.Component{

    constructor(props){
        super(props);
        this.state={
            activeIndex:this.props.activeIndex
        }
    };
    tabChange=(event,index)=>{
        event.preventDefault();
        this.setState({activeIndex:index});
        this.props.onTabChange(index);
    };
    render(){
        const {onTabChange,children}=this.props;
        const {activeIndex}=this.state;
        return (
            <ul className="nav nav-tabs nav-fill my-4">
                {
                    React.Children.map(children,(item,index)=>{
                        return (
                            <li className="nav-item">
                                <a  href="#"
                                    className={(activeIndex===index)?"nav-link active":"nav-link"}
                                    onClick={(event)=>{this.tabChange(event,index)}}
                                >
                                    {item}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
};
Tabs.propTypes={
    activeIndex:PropTypes.number.isRequired,
    onTabChange:PropTypes.func.isRequired
};
export const Tab=({children})=>(
    <React.Fragment>{children}</React.Fragment>
);
//Tab组件的返回值children，就是React.Children.map(children,(item,index)=>{})中的item,是个字符串类型的值