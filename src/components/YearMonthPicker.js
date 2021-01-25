import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import {padLeft, range} from '../utility';

class YearMonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedYear: this.props.year,
        };
    };

    toggleDropdown = (event) => {
        event.preventDefault();
        this.setState({isOpen: !this.state.isOpen})
    };
    selectYear = (event, itemYear) => {
        event.preventDefault();
        this.setState({selectedYear: itemYear});
    };
    selectMonth = (event, itemMonth) => {
        event.preventDefault();
        this.props.onChange(this.state.selectedYear, itemMonth);
        this.setState({isOpen: false});
    };

    render() {
        const {year, month} = this.props;
        const {isOpen, selectedYear} = this.state;
        // {在render函数里，结构出传入组件的属性值}
        var yearRange = range(9, -4).map(item => (item + 2018));
        var monthRange = range(12, 1);
        return (
            <div className="dropdown">
                <h4>选择月份</h4>
                <button className="btn btn-secondary dropdown-toggle" onClick={this.toggleDropdown}>
                    {`${year}年 ${padLeft(month)}月`}
                </button>
                {
                    isOpen ?
                        (<div className="dropdown-menu" style={{display: 'block'}}>
                            <div className='row'>
                                <div className='col border-right '>
                                    {
                                        yearRange.map((item, index) =>
                                            (
                                                <a key={index}
                                                   className={(selectedYear === item) ? 'dropdown-item active' : 'dropdown-item'}
                                                   onClick={
                                                       (event) => {
                                                       this.selectYear(event, item)
                                                    }
                                                   }
                                                >{item}年</a>
                                            )
                                        )
                                    }
                                </div>
                                <div className='col'>
                                    {
                                        monthRange.map((item, index) => (
                                            <a key={index}
                                               className={(month === item) ? 'dropdown-item active' : 'dropdown-item'}
                                               onClick={(event) => {
                                                   this.selectMonth(event, item)
                                               }}
                                            >{padLeft(item)}月</a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>) : ''
                }
            </div>
        )
    }
};
export default YearMonthPicker;