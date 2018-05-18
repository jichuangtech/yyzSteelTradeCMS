import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Modal,
  Steps,
  Checkbox,
  Form,
  Input,
  DatePicker,
  message,
  Upload,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FactorySelectView from '../../components/Factory/FactorySelectView';
import styles from './style.less';
import orderAddStyle from './orderAddStyle.less';
import SpecificationSelectView2 from '../../components/Specificaion/SpecificationSelectView2';
import StockSelectView2 from '../../components/Stock/StockSelectView2';
import OrderAddTable from '../../components/Customer/OrderAddTable';
import CarSelect from '../../components/Car/CarSelect';
import CustomerSelect from '../../components/Customer/CustomerSelect';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const Step = Steps.Step;

@connect(({ factory, orderSelectInfo }) => ({ factory, orderSelectInfo }))
@Form.create()
export default class OrderAddView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCodeCheck: false,
      isKgCheck: false,
      colorCheckedList: [],
      colorIndeterminate: false,
      colorCheckAll: false,
      colorOptions: [],
      codePrice: 0,
      kgPrice: 0,
      image: [],
      current: 0,
      factoryId: 1,
      speContractSelectModalVisible: false,
      selectContractList: [],
      selectSpeList: [],
      preOrderList:[],
    };

    // 成员变量的定义
    this.colorData = {
      options: [],
      ids: [],
    };

    this.steps = [{
      title: '合同',
      content: 'Second-content',
    }, {
      title: '规格',
      content: 'Second-content',
    }];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'factory/queryFactory',
    });
    this.refreshOrderSelectInfo(this.state.factoryId);
    // this.refreshCarInfo();
    // this.refreshCustomerInfo();
  }

  refreshOrderSelectInfo(factoryId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderSelectInfo/refreshSelectInfo',
      payload: {
        factoryId,
      },
    });

    dispatch({
      type: 'orderSelectInfo/refreshCarInfo',
    });

    dispatch({
      type: 'orderSelectInfo/refreshCustomerInfo',
    });
  }

  componentWillUpdate(prevProps, prevState) {
    // this.colorData = this.getColorData(prevProps.goods.colors);
  }


  onColorCheckAllChange(e) {
    this.setState({
      colorCheckedList: e.target.checked ? this.colorData.ids : [],
      colorIndeterminate: false,
      colorCheckAll: e.target.checked,
    });
  }

  onColorCheckChange(colorCheckedList) {
    this.setState({
      colorCheckedList,
      colorIndeterminate: !!colorCheckedList.length
      && (colorCheckedList.length < this.colorData.options.length),
      colorCheckAll: colorCheckedList.length === this.colorData.options.length,
    });
  }

  onCodeChange(e) {
    this.setState({
      isCodeCheck: e.target.checked,
    });
  }

  onKgChange(e) {
    this.setState({
      isKgCheck: e.target.checked,
    });
  }

  getColorData(colors) {
    if (colors === null) {
      return;
    }
    const options = [];
    const ids = [];
    for (const key in colors) {
      const color = colors[key];
      const opt = {
        label: color.colorName,
        value: color.id,
      };
      ids.push(color.id);
      options.push(opt);
    }
    return {
      options,
      ids,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { getFieldProps, getFieldValue } = this.props.form;
    // const value = this.refs.test.refs.input.value;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'stock/saveStock',
          payload: this.getStockVo(values),
        });
      }
    });
  }

  getStockVo(values) {
    const stockVo = {};

    stockVo.contractNo = values.contractNo;
    stockVo.timestamp = Date.parse(new Date());
    // goodsVO.categoryId = this.state.categoryId;
    stockVo.price = values.price;
    stockVo.number = values.number;
    stockVo.rest = values.number;
    stockVo.offset = 10;
    stockVo.factoryId = values.factoryId;
    return stockVo;
  }

  getFactoryRadio(factoryJson) {
    const FactoryRadio = [];
    for (const index in factoryJson) {
      const factory = factoryJson[index];
      const radio = (<Radio key={factory.id} value={`${factory.id}`}>{factory.name}</Radio>);
      FactoryRadio.push(radio);
    }
    return FactoryRadio;
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  getVisibleStyle(currCurrent) {
    return this.state.current === currCurrent ? orderAddStyle.stepShow : orderAddStyle.stepHidden;
  }

  onOrderGoodsDelete(index, orderGoods) {
    const prevOrderList = this.state.preOrderList;
    //todo  第一个参数： start， 第二个参数： deleteCount
    prevOrderList.splice(index, 1);

    this.setState({ prevOrderList });
  }

  onOrderGoodsNumberChange(number, index) {
    let order = this.state.preOrderList[index];
    const prevNumber = order.number;
    const convert = parseInt(number);
    const newNumber = number.length === 0 ? 0 : convert == number ? number : order.number;

    let newOrderList = this.state.preOrderList;
    newOrderList[index].number = newNumber;

    console.log(" onOrderGoodsNumberChange index: " + index
      + ", prevNumber: " + prevNumber
      + ", number: " + number
      + ", convert: " + parseInt(convert)
      + ", newNumber: " + newNumber
      + ", order: " + JSON.stringify(order)
      + ", newOrderList: " + JSON.stringify(newOrderList));

    this.setState({
      preOrderList: newOrderList.slice(0)
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      current: 0,
      speContractSelectModalVisible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      current: 0,
      speContractSelectModalVisible: false,
    });
  }

  createOrder() {
    const selectedContract = this.state.selectContractList[0];
    const selectedSpecList = this.state.selectSpeList;
    const orders = this.state.preOrderList;
    for (const index in selectedSpecList) {
      const spec = selectedSpecList[index];
      const order = {
        key: index,
        goodsName: '螺纹钢',
        specStr: `${spec.diameter}|${spec.length}`,
        number: 0,
        contractName: selectedContract.contractNo,
      };

      orders.push(order);
    }
    return orders;
  }

  testCountFun() {
      const { dispatch} = this.props;
      dispatch({
        type: 'orderSelectInfo/refreshTestCountAsync',
      });
  }

  render() {
    const props = {
      beforeUpload: (file) => {
        let isImage = false;
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          isImage = true;
        }
        if (!isImage) {
          message.error('请上传JPG/PNG的图片!');
          return false;
        }
        this.setState(({ image }) => ({
          image: [file],
        }));
        return false;
      },
      fileList: this.state.image,
    };
    const { submitting, factory: { list, carList }, orderSelectInfo: { factoryName, testCount } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const { current, preOrderList } = this.state;
    const steps = this.steps;
    const that = this;
    return (
      <Card bordered style={{ borderRadius: 25, borderColor: '#96D7FB', backgroundColor: '#E7F7FF' }}>
        <div>

          <div className={orderAddStyle.orderCorporation}>
            合肥友友志钢铁科技公司
          </div>

          <div className={orderAddStyle.firstRow}>
            <div className={orderAddStyle.customer}>
              客户：
              <CustomerSelect
                placeholder="请选择客户"
              />
            </div>

            <Button onClick={ () => this.testCountFun() }>我是测试按钮 {testCount}</Button>
            <div className={orderAddStyle.orderTitle}>
              产品销售订货单
            </div>

            <div className={orderAddStyle.car}>
              车号：
              <CarSelect
                placeholder="请选择客户"
              />
            </div>
          </div>


          <div className={orderAddStyle.factory}>
            工厂：
            <FactorySelectView
              onChange={(value) => {
                that.setState({
                  factoryId: value,
                });
                that.refreshOrderSelectInfo(value);
              }}
              factoryList={list}
            />
          </div>

          <div className={orderAddStyle.contract}>
            合同/规格：
            <Button
              type="primary"
              shape="circle"
              icon="search"
              onClick={
                      () => {
                        this.setState({
                          speContractSelectModalVisible: true,
                          selectContractList: [],
                          selectSpeList: [],
                        });
                      }

                    }
            />
          </div>
          <OrderAddTable
            preOrderList={preOrderList}
            onOrderGoodsNumberChange={(number, index) => this.onOrderGoodsNumberChange(number, index)}
            onOrderGoodsDelete={(index, orderGoods) => this.onOrderGoodsDelete(index, orderGoods)}
          />

          <Modal
            title={`请选择【${factoryName}】的【合同】与【规格】`}
            visible={this.state.speContractSelectModalVisible}
            onOk={that.handleOk}
            onCancel={that.handleCancel}
          >
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>

            <div className={`${orderAddStyle.stepsContent} ${this.getVisibleStyle(0)}`}>
              <StockSelectView2
                selectContractList={this.state.selectContractList}
                onSelectRow={(data) => {
                  this.setState({
                    selectContractList: data,
                  });
                }}
              />
            </div>


            <div className={`${orderAddStyle.stepsContent} ${this.getVisibleStyle(1)}`}>
              <SpecificationSelectView2
                selectSpeList={this.state.selectSpeList}
                onSelectRow={(data) => {
                  this.setState({
                    selectSpeList: data,
                  });
                }}

              />
            </div>
            <div className={orderAddStyle.stepsAction}>
              {
                this.state.current > 0
                &&
                (
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    上一步
                  </Button>
                )
              }

              {
                this.state.current < steps.length - 1
                &&
                (
                <Button
                  style={{ marginLeft: 8 }}
                  type="primary"
                  onClick={() => {
                          if (this.state.selectContractList === null
                            || this.state.selectContractList.length === 0) {
                            message.error('请选择一个合同');
                          } else if (this.state.selectContractList.length > 1) {
                            message.error('只支持选择一个合同');
                          } else {
                            this.next();
                          }
                        }
                        }
                >下一步
                </Button>
)
              }
              {
                this.state.current === steps.length - 1
                &&
                (
                <Button
                  style={{ marginLeft: 8 }}
                  type="primary"
                  onClick={() => {
                            if (this.state.selectSpeList.length === 0) {
                              message.error('请选择规格');
                            } else {
                              this.setState({
                                preOrderList: this.createOrder(),
                                current: 0,
                                speContractSelectModalVisible: false,
                              });
                            }
                          }
                        }
                >
                  完成
                </Button>
)
              }
            </div>
          </Modal>


        </div>
      </Card>
    );
  }
}
