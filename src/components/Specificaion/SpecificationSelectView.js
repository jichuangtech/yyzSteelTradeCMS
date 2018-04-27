import React, { Component } from 'react';
import SpecStandardTable from '../../components/StandardTable/specification';


class SpecificationSelectView extends Component {

  render() {
    const { loading, list, selectedRows, factoryTitle } = this.props;
    return (
      <div>
        <span>{factoryTitle}</span>
        <SpecStandardTable
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

export default SpecificationSelectView;
