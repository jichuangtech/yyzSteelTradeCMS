import React, {PureComponent} from 'react';
import {connect} from 'dva';
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
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;
const Step = Steps.Step;

@connect(({factory}) => ({factory}))
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
    const {dispatch} = this.props;
    dispatch({
      type: 'factory/queryFactory',
    });
    this.refreshOrderSelectInfo(this.state.factoryId);
    // this.refreshCarInfo();
    // this.refreshCustomerInfo();
  }

  refreshOrderSelectInfo(factoryId) {
    const {dispatch} = this.props;
    dispatch({
      type: 'orderSelectInfo/refreshSelectInfo',
      payload: {
        factoryId: factoryId,
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
    const {getFieldProps, getFieldValue} = this.props.form;
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
    this.setState({current});
  }

  next() {
    const current = this.state.current + 1;
    this.setState({current});
  }

  getVisibleStyle(currCurrent) {
    return this.state.current === currCurrent ? orderAddStyle.stepShow : orderAddStyle.stepHidden;
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
        this.setState(({image}) => ({
          image: [file],
        }));
        return false;
      },
      fileList: this.state.image,
    };
    const {submitting, factory: {list, carList}} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    const {current} = this.state;
    const steps = this.steps;
    const that = this;
    return (
      <Card bordered={true} style={{borderRadius: 25, borderColor: '#96D7FB', backgroundColor: "#E7F7FF"}}>
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
            <a ref="javascript:void(0)"
               style={{textDecoration: "underline"}}
               onClick={() => {
                 this.setState({
                   speContractSelectModalVisible: true,
                 })
               }}>点击选择</a>
          </div>
          <OrderAddTable/>

          <Modal
            title="请选择'合同' 与 '规格'"
            visible={this.state.speContractSelectModalVisible}
            onOk={that.handleOk}
            onCancel={that.handleCancel}
          >
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title}/>)}
            </Steps>

            <div className={`${orderAddStyle.stepsContent} ${this.getVisibleStyle(0)}`}>
              <StockSelectView2/>
            </div>

            <div className={`${orderAddStyle.stepsContent} ${this.getVisibleStyle(1)}`}>
              <SpecificationSelectView2/>
            </div>
            <div className={orderAddStyle.stepsAction}>
              {
                this.state.current > 0
                &&
                (
                  <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                    上一步
                  </Button>
                )
              }

              {
                this.state.current < steps.length - 1
                &&
                <Button style={{marginLeft: 8}} type="primary" onClick={() => this.next()}>下一步</Button>
              }
              {
                this.state.current === steps.length - 1
                &&
                <Button style={{marginLeft: 8}} type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
              }
            </div>
          </Modal>


        </div>
      </Card>
    )
      ;
  }
}
