import React, { Component } from 'react';
import {connect} from 'dva';
import StockStandardTable from '../../components/StandardTable/stock';


@connect(({orderSelectInfo}) => ({orderSelectInfo}))
class StockSelectView extends Component {

  render() {
    const { orderSelectInfo:  { contractList, factoryName, loading }, onSelectRow, selectContractList } = this.props;
    return (
      <div>
        <StockStandardTable
          selectContractList={ selectContractList }
          selectedRows={[]}
          loading={loading}
          data={contractList}
          onSelectRow={onSelectRow}
          onChange={() => { alert( " table change " ) }}
          onDelClick={() => {}}
        />
      </div>);
  }
}

export default StockSelectView;
