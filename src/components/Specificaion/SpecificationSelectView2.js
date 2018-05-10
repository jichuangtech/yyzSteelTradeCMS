import React, {Component} from 'react';
import {connect} from 'dva';
import SpecStandardTable from '../../components/StandardTable/specification';
import SpecificationSelectView from '../../components/Specificaion/SpecificationSelectView';

@connect(({orderSelectInfo}) => ({orderSelectInfo}))
class SpecificationSelectView2 extends Component {

  render() {
    const { orderSelectInfo:  { specificationList, factoryName, loading }, onSelectRow, selectSpeList } = this.props;
    return (
      <div>
        <SpecificationSelectView
          selectSpeList={selectSpeList}
          factoryTitle={factoryName}
          onSelectRow={onSelectRow}
          selectedRows={[]}
          loading={loading}
          list={specificationList}
        />
      </div>);
  }
}

export default SpecificationSelectView2;
