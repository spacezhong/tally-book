import React from 'react';
//<PriceForm
//                 item={editItem}
//                 onFormSubmit={this.submitForm}
//                 onCancleSubmit={this.cancleForm}
// />

//写出该组件每一个要实现的功能：
//1.初始有值传进来，就进行值的渲染;如果没有值传进来，就使用placeholder;
//2.提交按钮要实现的功能：
//  1.点击后，如果每一项都填了，每一项都通过了验证，那就将原来的item，加上现在的title,price,date,外加上isEditModel;如果是编辑，也是将每一项的值都传出去,但这两种传出去的值要区分是
//     添加时的值，还是编辑时的值，传出去的值要加上这个区分的东西，这个区分点就是要根据传进来的item.id有没有进行判断，需要定义一个在true和false之间交换的变量，
//     如：isEditModel=!!item.id，将这个也传出去，如：this.props.onFormSubmit({...this.props.item,title,price,date},isEditModel)
//  2.如果每一项都没填，那就显示错误信息；如果每一项都填了，但有一项没有通过验证，那就显示对应的错误信息：因为显示错误信息，
//    更改了视图，所以要将它写在state中，如：state={errorMessage:''};
//  3.点击后，验证通过就跳转，验证不通过就显示具体哪个验证不成功的错误信息，所以也是视图的变化，将’是否验证成功’写在state中，
//    如：state={isValidatePass:true}
//3.取消按钮要实现的功能：
//

class PriceForm extends React.Component{
    constructor(){
        super();
        this.state={
            isValidatePass:true,
            errorMessage:''
        }
    };
    submitForm=(event)=>{//很重要，条件包含关系要写清楚
        // const title=this.titleInput.value.trim();//string.trim()的作用是：去掉字符串首尾的空白字符
        const price=this.priceInput.value.trim()*1;
        const date=this.dateInput.value.trim();
        const isEditModel=!!this.props.item.id;
        const title=this.titleInput.value.trim();

        if(title && price && date){
            if(!title){
                this.setState({isValidatePass:false,errorMessage:'请输入标题'});
            }else if(price < 0){
                this.setState({isValidatePass:false,errorMessage:'请输入正确的金额'});
            }else if(!date){
                this.setState({isValidatePass:false,errorMessage:'请选择日期'});
            }else{
                this.setState({isValidatePass:true,errorMessage:''});
            };
            if(isEditModel){
                console.log(title);
                this.props.onFormSubmit({...this.props.item,title,price,date},isEditModel); //这个也是重点，你传出去的是原来的item，加上现在的title,price,date,外加上isEditModel
            }else{
                this.props.onFormSubmit({title,price,date},isEditModel);
            };
        }else{
            this.setState({isValidatePass:false,errorMessage:'请输入所有必选项'})
        };
        event.preventDefault();
    };
    cancelClick=()=>{
        this.props.onCancleSubmit();
    };
    render(){
        const {title,price,date}=this.props.item;
        const {isValidatePass,errorMessage}=this.state;
        return(
            <React.Fragment>
                <form onSubmit={(event)=>{this.submitForm(event)}}>
                    <div className="form-group ">
                        <label htmlFor="title" >标题 *</label>
                        <input type="text" className="form-control" id="title" placeholder='请输入标题'
                            defaultValue={title}
                            ref={(ref)=>{this.titleInput=ref}}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" >价格 *</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">￥</span>
                            </div>
                            <input type="number" className="form-control" id="price" aria-label='price'
                                   defaultValue={price}
                                   ref={(ref)=>{this.priceInput=ref}}

                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">日期*</label>
                        <input type="date" className="form-control" id="date"
                               defaultValue={date}
                               ref={(ref)=>{this.dateInput=ref}}

                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-4" style={{display:'inline-block' }}>
                        提交
                    </button>
                    <button type="submit" className="btn " style={{color:'white',background:'grey'}}
                            onClick={this.cancelClick}
                    >取消</button>
                    {
                        !isValidatePass&& <div className="alert alert-danger mt-3" role="alert">
                            {this.state.errorMessage}
                        </div>
                    }
                </form>
            </React.Fragment>
        )
    }
};
export default PriceForm;