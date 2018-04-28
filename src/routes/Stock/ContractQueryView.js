import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StockSelectView from "../../components/Stock/StockSelectView";
import styles from '../List/TableList.less';

@connect(({ factory, stock }) => ({
  factory, stock,
}))
class ContractQueryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    //查询所有
    this.queryStocksByFactoryId(-1);
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

  queryStocksByFactoryId(factoryId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'stock/queryStockByFactory',
      payload: {
        factoryId: factoryId,
      },
    });
  }

  onGoodsCategoryOptionChange(categoryId) {
    this.queryStocksByFactoryId(categoryId);
  }

  render() {
    const { stock: { list, loading } } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderLayout title="查询合同">
        <Card bordered={false}>

          <div className={styles.tableList}>
            <StockSelectView
              factoryTitle="dongya"
              selectedRows={selectedRows}
              loading={loading}
              list={list}
            />
          </div>

        </Card>
      </PageHeaderLayout>
    );
  }
}


export default ContractQueryView;
