export const LIST_VIEW='list';
export const CHART_VIEW='chart';
export const SELECTOUTCOME_VIEW='income';
export const SELECTINCOME_VIEW='outcome';
export const INCOME='income';
export const OUTCOME='outcome';
//通用的给小于10的数加’0‘前缀的方法
export const padLeft=(n)=>{
    return n=n<10?('0'+n):n
};
//通用的生成几项数组，数组第一项是什么数值的方法：
export const range=(size,startValue)=>{//9,-4
    let ary=[];
    for(let i=0;i<size;i++){
        ary[i]=i+startValue;
    }
    return ary;
};
//通用的生成年和月对象的方法：
export const parseToYearAndMonth=(str)=>{//"2019-08-01"
    const date=str?new Date(str):new Date();//'Thu Aug 01 2019 08:00:00 GMT+0800'
    return {
        year:date.getFullYear(),//2019
        month:date.getMonth()+1
    }
};
//通用的flatter数据的方法：
export const testCategories = [
    {
        "name": "旅行",
        "iconName": "ios-plane",
        "id": "1",
        "type": "outcome"
    }
];
export const testItems = [
    {
        "title": "buy stuff for kitten",
        "price": 100,
        "date": "2018-08-15",
        "monthCategory": "2018-8",
        "id": "_kly1klf4g",
        "cid": "1",
        "timestamp": 1534291200000
    }
];
//export const testItems = [
//     {
//         "title": "buy stuff for kitten",
//         "price": 100,
//         "date": "2019-08-01",
//         "monthCategory": "2018-8",
//         "id": "_kly1klf4g",
//         "cid": "1",
//         "timestamp": 1534291200000
//     },
//]
//testCategories = [
//     {
//         "name": "旅行",
//         "iconName": "ios-plane",
//         "id": "1",
//         "type": "outcome"
//     },
//]

export const flatterArr=(arr)=>{
  return arr.reduce((prev,item)=>{
      prev[item.id]=item;
      return prev;
  },{})
};
//生成 随机的id值："_kly1klf4g"
export const ID=()=>{
  return '_'+Math.random().toString(36).substr(2,9);
};
//colors
export const Colors={
  blue:'#347eff',
  deepBlue:'#61dafb',
  green:'#28a725',
  red:'#dc3545',
  gray:'#555',
  lightGray:'#efefef',
  white:'#fff',
};
