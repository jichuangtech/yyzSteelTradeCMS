import React, { PureComponent } from 'react';
import { Radio } from 'antd';

export default class FactorySelectView extends PureComponent {
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  getFactoryRadio(factoryJson) {
    const factoryRadio = [];
    for (const index in factoryJson) {
      const factory = factoryJson[index];
      const radio = (<Radio key={factory.id} value={`${factory.id}`}>{factory.name}</Radio>);
      factoryRadio.push(radio);
    }
    return factoryRadio;
  }

  render() {
    const factoryList = this.props.factoryList;
    const defaultValue = (undefined !== factoryList ?
      (factoryList.length > 0 ? (factoryList[0].id) : 1) : 1);
    return (
      <Radio.Group
        onChange={this.onChange}
        defaultValue={`${defaultValue}`}
      >
        {this.getFactoryRadio(factoryList)}
      </Radio.Group>
    );
  }
}
