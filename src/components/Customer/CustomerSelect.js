import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Select,
} from 'antd';

const { Option } = Select;

@connect(({ orderSelectInfo }) => ({ orderSelectInfo }))
export default class CarSelect extends React.Component {

  render() {
    const { placeholder, orderSelectInfo: { customerLis } } = this.props;
    let options = [];

    for (let index in customerLis) {
      const customer = customerLis[index];
      const option = (<Option value={ customer.id }>{ customer.username }</Option>);
      options.push(option);
    }

    return (
      <Select
        showSearch
        style={{ width: 150, display: 'inline-block' }}
        placeholder={placeholder}
        optionFilterProp="children"
        // onChange={handleChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {options}
      </Select>
    );
  }

}
