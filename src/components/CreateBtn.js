import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import  Ionicon from 'react-ionicons';
import  PropTypes from 'prop-types';

const CreateBtn=({onCreateItem})=>{

    return(
        <button type="button" className="btn btn-primary btn-lg btn-block mb-2" color='#fff'
                onClick={
                    (event)=>{
                        event.preventDefault();
                        onCreateItem();
                    }
                }
        >
            <Ionicon
                className='rounded-circle mr-2'
                fontSize='25px'
                color='#fff'
                icon='ios-add-circle-outline'
            />
            创建一条新的记账记录
        </button>

    )
};
CreateBtn.propTypes={
  onClick:PropTypes.func.isRequired
};
export default CreateBtn;