import React, {Component} from 'react';
import {connect} from 'dva';
import SpecStandardTable from '../../components/StandardTable/specification';
import SpecificationSelectView from '../../components/Specificaion/SpecificationSelectView';

@connect(({orderSelectInfo}) => ({orderSelectInfo}))
class SpecificationSelectView2 extends Component {

  render() {
    const { orderSelectInfo:  { specificationList, factoryName, loading } } = this.props;
    return (
      <div>
        <SpecificationSelectView
          factoryTitle={factoryName}
          selectedRows={[]}
          loading={loading}
          list={specificationList}
        />
      </div>);
  }
}

export default SpecificationSelectView2;
