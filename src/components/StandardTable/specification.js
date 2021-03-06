import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Popconfirm} from 'antd';
import styles from './index.less';
import * as Urls from '../../utils/Urls';

const statusMap = ['default', 'processing', 'success', 'error'];
class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectSpeList.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    this.setState({ selectedRowKeys, totalCallNo });

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys, totalCallNo } = this.state;
    // const { data: { pagination }, loading, list } = this.props;
    const { data, loading } = this.props;
    const pagination = {
      total: data.length,
    };

    const columns = [
      {
        title: '规格',
        dataIndex: 'diameter',
        width: 150,
      },
      {
        title: '长度',
        dataIndex: 'length',
        width: 150,
      },
      {
        title: '重量（吨）',
        dataIndex: 'weight',
        width: 150,
      },
      {
        title: '支数',
        dataIndex: 'number',
        width: 150,
        sorter: true,
        render: val => `${val} 个`,
      },
      // {
      //   title: '操作',
      //   dataIndex: 'goodsId',
      //   render: (val) => (
      //     <Fragment>
      //       <a href="">详情</a>
      //       <Divider type="vertical" />
      //       <a href="">编辑</a>
      //       <Divider type="vertical" />
      //       <Popconfirm title="是否要删除该商品？"
      //                   onConfirm={()=> { this.props.onDelClick(val)}}
      //                   okText="确定" cancelText="取消">
      //         <a href="#">删除</a>
      //       </Popconfirm>
      //     </Fragment>
      //   ),
      // },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: false,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {/*服务调用总计 <span style={{ fontWeight: 600 }}>{totalCallNo}</span> 万*/}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          bordered
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          size="small"
          scroll={{ y: 240 }}
        />
      </div>
    );
  }
}

export default StandardTable;
