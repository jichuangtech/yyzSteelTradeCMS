import React, { Component } from 'react';
import StockStandardTable from '../../components/StandardTable/stock';


class StockSelectView extends Component {

  render() {
    const { loading, list, selectedRows, factoryTitle } = this.props;
    return (
      <div>
        <span>{factoryTitle}</span>
        <StockStandardTable
          selectedRows={selectedRows}
          loading={loading}
          data={list}
          onSelectRow={() => {}}
          onChange={() => {}}
          onDelClick={() => {}}
        />
      </div>);
  }
}

export default StockSelectView;
