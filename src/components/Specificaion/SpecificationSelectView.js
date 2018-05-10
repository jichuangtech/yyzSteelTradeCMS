import React, { Component } from 'react';
import SpecStandardTable from '../../components/StandardTable/specification';


class SpecificationSelectView extends Component {

  render() {
    const { loading, list, selectedRows, factoryTitle, onSelectRow, selectSpeList } = this.props;
    return (
      <div>
        <SpecStandardTable
          selectSpeList={selectSpeList}
          selectedRows={selectedRows}
          loading={loading}
          data={list}
          onSelectRow={onSelectRow}
          onChange={() => {}}
          onDelClick={() => {}}
        />
      </div>);
  }
}

export default SpecificationSelectView;
