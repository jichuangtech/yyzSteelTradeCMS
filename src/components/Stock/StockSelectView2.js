import React, { Component } from 'react';
import {connect} from 'dva';
import StockStandardTable from '../../components/StandardTable/stock';


@connect(({orderSelectInfo}) => ({orderSelectInfo}))
class StockSelectView extends Component {

  render() {
    const { orderSelectInfo:  { contractList, factoryName, loading } } = this.props;
    return (
      <div>
        <span>{factoryName}</span>
        <StockStandardTable
          selectedRows={[]}
          loading={loading}
          data={contractList}
          onSelectRow={() => {}}
          onChange={() => {}}
          onDelClick={() => {}}
        />
      </div>);
  }
}

export default StockSelectView;
