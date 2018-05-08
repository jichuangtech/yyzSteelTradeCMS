import React, {PureComponent} from 'react';
import {Table, Input, Popconfirm, Button, Modal} from 'antd';
import style from './style.less';
import SpecificationSelectView2 from '../../components/Specificaion/SpecificationSelectView2';
import StockSelectView2 from '../../components/Stock/StockSelectView2';

const data = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const ACell = ({editable, value, onChange, onClick}) => (
  <div>
    {value}
  </div>
);
const InputCell = ({defaultValue}) => (
  <div>
    <Input defaultValue={defaultValue} style={{width: '70%'}}/>
  </div>
);

export default class OrderAddTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: "默认的初始值1",
      modalContentView: <SpecificationSelectView2/>,
      modalStockView: <StockSelectView2/>,
      modalVisble: false,
      data: data,
    };

    this.columns = [{
      title: '行号',
      dataIndex: 'key',
      width: '8%',
      render: (text, record) => this.renderAColumns(parseInt(text) + 1, record, 'name'),
    }, {
      title: '商品',
      dataIndex: 'name',
      width: '22%',
      render: (text, record) => this.renderAColumns(text, record, 'name'),
    }, {
      title: '规格',
      dataIndex: 'age',
      width: '22%',
      render: (text, record) => this.renderAColumns(text, record, 'age', {
        modalTitle: "请选择规格",
        modalContentView: <StockSelectView2 />,
      }),
    }, {
      title: '数量',
      dataIndex: 'address',
      width: '22%',
      render: (text, record) => this.renderInputColumns("0"),
    }, {
      title: '合同',
      dataIndex: 'age',
      width: '22%',
      render: (text, record) => this.renderAColumns(text, record, 'address', {
        modalTitle: "请选择合同",
        modalContentView: <StockSelectView2 />,
      }),
    }];

    this.cacheData = data.map(item => ({...item}));
  }

  renderAColumns(text, record, column, modalInfo) {
    return (
      <ACell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
        onClick={() => this.showModal(modalInfo)}
      />
    );
  }

  showModal(modalInfo) {
    this.setState({
      modalVisble: true,
      modalTitle: modalInfo.modalTitle,
      modalContentView: modalInfo.modalContentView,
    });
  }

  renderInputColumns(defaultValue) {
    return (
      <InputCell
        defaultValue={defaultValue}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({data: newData});
    }
  }

  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({data: newData});
    }
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({data: newData});
      this.cacheData = newData.map(item => ({...item}));
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({data: newData});
    }
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisble: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisble: false,
    });
  }

  render() {
    const that = this;
    return (
      <div>
        <Table bordered dataSource={this.state.data} columns={this.columns}
               rowSelection={[]}
        />
        <Modal
          title={that.state.modalTitle}
          onOk={that.handleOk}
          onCancel={that.handleCancel}
          visible={that.state.modalVisble}>
          {
            that.state.modalStockView
          }
        </Modal>
      </div>
    );
  }

}

