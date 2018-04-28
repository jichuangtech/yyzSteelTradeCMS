import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Checkbox, Form, Input, DatePicker, message, Upload, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;


@connect(({ factory }) => ({ factory }))
@Form.create()
export default class ContractAddForm extends PureComponent {
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
    };
    // 成员变量的定义
    this.colorData = {
      options: [],
      ids: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'factory/queryFactory',
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
    const factoryRadio = [];
    for(const index in factoryJson) {
      const factory = factoryJson[index];
      const radio = (<Radio key={factory.id} value={factory.id + ""}>{factory.name}</Radio>);
      factoryRadio.push(radio);
    }
    return factoryRadio;
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
    const { submitting, factory: { list } } = this.props;
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

    return (
      <PageHeaderLayout title="新增合同" content="">
        <Card bordered={false}>
          <Form
            onSubmit={e => this.handleSubmit(e)}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="合同号"
            >
              {getFieldDecorator('contractNo', {
                rules: [{
                  required: true, message: '请输入合同号',
                }],
              })(
                <Input placeholder="合同号" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="基价(元)"
            >
              {getFieldDecorator('price', {
                rules: [{
                  required: true, message: '请输入基本价格',
                }],
              })(
                <Input placeholder="基本价格" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="购买数量(吨)"
            >
              {getFieldDecorator('number', {
                rules: [{
                  required: true, message: '请输入购买数量',
                }],
              })(
                <Input placeholder="购买数量" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="工厂"
              help=""
            >
              <div>
                {getFieldDecorator('factoryId', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    {this.getFactoryRadio(list)}
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8, display: 'none' }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
