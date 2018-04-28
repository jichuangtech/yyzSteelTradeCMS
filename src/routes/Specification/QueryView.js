import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SpecStandardTable from '../../components/StandardTable/specification';
import SpecificationSelectView from "../../components/Specificaion/SpecificationSelectView";
import styles from '../List/TableList.less';

@connect(({ factory, specification }) => ({
  factory, specification,
}))
class QueryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    //查询所有
    this.queryGoodsById(-1);
  }

  handleSelectRows() {

  }
  handleStandardTableChange() {

  }
  handleDelClick(goodsId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/delGoods',
      payload: {
        goodsId: goodsId,
      },
    });
  }

  queryGoodsById(categoryId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'Factory/queryFactory',
      // type: 'specification/querySpec',
    });
  }

  onGoodsCategoryOptionChange(categoryId) {
    this.queryGoodsById(categoryId);
  }

  render() {
    const { factory: { list, loading } } = this.props;
    const { selectedRows } = this.state;
    let specViews = [];
    for(let index in list) {
      let factory = list[index];
        let specView =
          (<SpecificationSelectView
            factoryTitle={factory.name}
            selectedRows={selectedRows}
            loading={loading}
            list={factory.specList}
        />);
      specViews.push(specView);
    }

    return (
      <PageHeaderLayout title="查询规格">
        <Card bordered={false}>

          <div className={styles.tableList}>
            {specViews}
          </div>

        </Card>
      </PageHeaderLayout>
    );
  }
}


export default QueryView;
