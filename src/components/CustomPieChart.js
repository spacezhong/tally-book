import React,{memo} from 'react';
import {ResponsiveContainer,PieChart, Pie,Tooltip,Cell} from 'recharts';
import {Colors} from '../utility';

const ColorsArr=Object.keys(Colors).map(item=>Colors[item]);

let CustomPieChart=({title,categoryData})=>{
    if(categoryData.length===0){
        return <h3 className='text-center mx-3'>{title} 还没有任何数据</h3>
    }
    return (
        <div className="pie-chart-decodeURIComponent">
            <h3 className="text-center mt-3">{title}</h3>
            <ResponsiveContainer width={'100%'} height={300}>
                <PieChart>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={categoryData}
                            cx={'50%'}
                            cy={'50%'}
                            outerRadius={100}
                            fill={Colors.blue}
                            label
                        >
                            {
                                categoryData.map((item,index)=><Cell fill={ColorsArr[index % ColorsArr.length]}/>)
                            }
                        </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
};
export default CustomPieChart;
