import {
  Button,
  PageHeader,
  Form,
  Icon,
  Input,
  Card,
  Select,
  Checkbox,
  Affix,
  Layout,
  Row,
  Col,
  BackTop,
  Alert,
  message,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

function Hidden(props) {
  if (props.warn) {
    return null;
  }
  return (
    <Form>
      <Form.Item>
        <Input />
      </Form.Item>
    </Form>
  );
}
const info = () => {
  message.info('客户必须拥有姓名');
};
const { Option } = Select;
const { Header } = Layout;
const countryData = ['China', 'Japan'];
const provinceData = {
  China: ['福建', '贵州', '上海'],
  Japan: ['东京', '北海道', '大阪'],
};
const mapStateToProps = ({ customers, loading }) => ({
  customers: customers.Customers,
  loading: loading.models['customers'],
});

const mapDispatchToProps = dispatch => ({
  addCustomers: customer =>
    dispatch({
      type: 'customers/addcus',
      payload: customer,
    }),
});
@connect(mapStateToProps, mapDispatchToProps)
class Addcustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      countries: provinceData[countryData[0]],
      provinces: provinceData[countryData[0]][0],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleConturyChange = this.handleConturyChange.bind(this);
    this.handleProvinceChange = this.onProvinceChange.bind(this);
  }
  handleConturyChange = value => {
    this.setState({
      countries: provinceData[value],
      provinces: provinceData[value][0],
    });
  };
  onProvinceChange = value => {
    this.setState({
      provinces: value,
    });
  };
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }
  render() {
    const { getFieldDecorator, getFieldsValue, getFieldValue } = this.props.form;
    const { addCustomers } = this.props;
    const { countries } = this.state;
    const routes = [
      {
        path: '/customers',
        breadcrumbName: '客户页面',
      },
      {
        path: 'first',
        breadcrumbName: '添加客户',
      },
    ];
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70, hight: 32, margin: 0 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    return (
      <div>
        <div>
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <PageHeader title="添加客户" breadcrumb={{ routes }}></PageHeader>
            </Col>
            <Col>
              <Card style={{ background: 'pink' }}>
                客户必须拥有名字，姓氏或电子邮件，电话号码必须是有效的
              </Card>
            </Col>
            <Col>
              <Button
                disabled={
                  getFieldValue('first_name') === undefined ||
                  !/\S+/.test(getFieldValue('first_name'))
                }
                onClick={() => {
                  addCustomers(
                    JSON.stringify({
                      customer: {
                        ...getFieldsValue([
                          'first_name',
                          'last_name',
                          'email',
                          'phone',
                          'note',
                          'tags',
                        ]),
                        addresses: [
                          {
                            ...getFieldsValue([
                              'first_name',
                              'last_name',
                              'phone',
                              'company',
                              'address1',
                              'address2',
                              'city',
                              'country',
                              'province',
                              'zip',
                            ]),
                          },
                        ],
                      },
                    }),
                  );
                }}
                href="#/customers"
              >
                提交
              </Button>
            </Col>
          </Row>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h4 style={{ width: '400px' }}>顾客概述</h4>
            <Card style={{ width: '600px' }}>
              <Form>
                <Form.Item label="名字" colon={false}>
                  {getFieldDecorator('first_name')(<Input />)}
                </Form.Item>
                <Form.Item label="姓氏" colon={false}>
                  {getFieldDecorator('last_name')(<Input />)}
                </Form.Item>
              </Form>
              <Form>
                <Form.Item label="电子邮件" colon={false} style={{ margin: 0 }}>
                  {getFieldDecorator('email')(<Input />)}
                </Form.Item>
                <Form.Item label="电话号码" colon={false} style={{ margin: 0 }}>
                  {getFieldDecorator('phone')(<Input addonAfter={prefixSelector} />)}
                </Form.Item>
              </Form>
            </Card>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '400px' }}>
              <h4>地址</h4>
              <p>顾客的主要地址</p>
            </div>
            <Card style={{ width: '600px' }}>
              <Form style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item style={{ width: 270 }}>
                  <label>名字</label>
                  {getFieldDecorator('first_name')(<Input />)}
                </Form.Item>
                <Form.Item style={{ width: 270 }}>
                  <label>姓</label>
                  {getFieldDecorator('last_name')(<Input />)}
                </Form.Item>
              </Form>
              <Form>
                <Form.Item label="公司" colon={false} style={{ margin: 0 }}>
                  {getFieldDecorator('company')(<Input />)}
                </Form.Item>
                <Form.Item label="地址" colon={false} style={{ margin: 0 }}>
                  {getFieldDecorator('address1')(<Input />)}
                </Form.Item>
                <Form.Item label="公寓，套房等" colon={false} style={{ margin: 0 }}>
                  {getFieldDecorator('address2')(<Input />)}
                </Form.Item>
                <Form.Item label="城市" colon={false} style={{ margin: 0 }}>
                  {getFieldDecorator('city')(<Input />)}
                </Form.Item>
                <Form style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item>
                    <label>国家</label>
                    <br />
                    {getFieldDecorator('country')(
                      <Select
                        onChange={this.handleConturyChange}
                        initialValue={countryData[0]}
                        style={{ width: 160 }}
                      >
                        {countryData.map(countries => (
                          <Option key={countries}>{countries}</Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <label>省</label>
                    <br />
                    {getFieldDecorator('province')(
                      <Select
                        setFieldsValue={this.state.provinces}
                        onChange={this.onProvinceChange}
                        style={{ width: 160 }}
                      >
                        {countries.map(province => (
                          <Option key={province}>{province}</Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <label>邮政编码</label>
                    <br />
                    {getFieldDecorator('zip')(<Input style={{ width: 160 }} />)}
                  </Form.Item>
                </Form>
                <Form.Item label="电话" colon={false} style={{ margin: 0 }}>
                  <Input />
                </Form.Item>
              </Form>
            </Card>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '400px' }}>
              <h4>税金豁免</h4>
            </div>
            <Card style={{ width: '600px' }}>
              <Checkbox onClick={this.handleClick}>收税</Checkbox>
              <Hidden warn={this.state.isToggleOn} />
            </Card>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '400px' }}>
              <h4>备注</h4>
              <p>添加关于您客户的说明</p>
            </div>
            <Card style={{ width: '600px' }}>
              <Form>
                <Form.Item label="备注" colon={false}>
                  {getFieldDecorator('note')(
                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />,
                  )}
                </Form.Item>
              </Form>
            </Card>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '400px' }}>
              <h4>标签</h4>
              <p>标签可用于对客户进行分组</p>
            </div>
            <Card style={{ width: '600px' }}>
              <Form>
                <Form.Item label="标签" colon={false}>
                  {getFieldDecorator('tags')(<Input />)}
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
        <BackTop />
      </div>
    );
  }
}
Addcustomers = Form.create()(Addcustomers);

export default Addcustomers;
