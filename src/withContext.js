import React from 'react';
import {AppContext} from './App'
const withContext=(Component)=>{
    return (props)=>(//高阶组件的返回值是另一个函数组件
    <AppContext.Consumer>
        {
            ({state,actions})=>{
                return <Component {...props} data={state} actions={actions}/>
            }
        }
    </AppContext.Consumer>
)};
export default withContext;
