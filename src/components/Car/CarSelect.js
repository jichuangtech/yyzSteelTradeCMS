import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Select,
} from 'antd';

const { Option } = Select;

@connect(({ orderSelectInfo }) => ({ orderSelectInfo }))
export default class CarSelect extends React.Component {

  render() {
    const { placeholder, orderSelectInfo: { carList } } = this.props;
    let options = [];

    for (let index in carList) {
      const car = carList[index];
      const option = (<Option value={ car.id }>{ car.carLicense }</Option>);
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
