import { Button, PageHeader, Form, Icon, Input, Card, Select, Checkbox } from 'antd';

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

const { Option } = Select;
const countryData = ['中国', '日本'];
const provinceData = {
  中国: ['FuZhou', 'GuiZhou', 'ShangHai'],
  日本: ['Tokyo', 'Hokkaido', 'Osaka'],
};

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
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
  }
  handleConturyChange = value => {
    this.setState({
      countries: provinceData[value],
      provinces: provinceData[value][0],
    });
  };
  handleProvinceChange = value => {
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
    const { getFieldDecorator } = this.props.form;
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
        <PageHeader title="添加客户" breadcrumb={{ routes }}></PageHeader>
        {/* <PageHeaderWrapper title="添加客户"  onBack={() => location.hash="#/customers"}><Button onClick={()=>{location.hash="#/customers"}}>213</Button></PageHeaderWrapper> */}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h4 style={{ width: '400px' }}>顾客概述</h4>
          <Card style={{ width: '600px' }}>
            <Form>
              <Form.Item label="名字" colon={false}>
                <Input />
              </Form.Item>
              <Form.Item label="姓氏" colon={false}>
                <Input />
              </Form.Item>
            </Form>
            <Form>
              <Form.Item label="电子邮件" colon={false} style={{ margin: 0 }}>
                <Input />
              </Form.Item>
              <Form.Item label="电话号码" colon={false} style={{ margin: 0 }}>
                <Input addonAfter={prefixSelector} />
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
                <Input />
              </Form.Item>
              <Form.Item style={{ width: 270 }}>
                <label>姓</label>
                <Input />
              </Form.Item>
            </Form>
            <Form>
              <Form.Item label="公司" colon={false} style={{ margin: 0 }}>
                <Input />
              </Form.Item>
              <Form.Item label="地址" colon={false} style={{ margin: 0 }}>
                <Input />
              </Form.Item>
              <Form.Item label="公寓，套房等" colon={false} style={{ margin: 0 }}>
                <Input />
              </Form.Item>
              <Form.Item label="城市" colon={false} style={{ margin: 0 }}>
                <Input />
              </Form.Item>
              <Form style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item>
                  <label>国家</label>
                  <br />
                  <Select
                    onChange={this.handleConturyChange}
                    defaultValue={countryData[0]}
                    style={{ width: 160 }}
                  >
                    {countryData.map(countries => (
                      <Option key={countries}>{countries}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <label>省</label>
                  <br />
                  <Select
                    onChange={this.handleProvinceChange}
                    value={this.state.provinceData}
                    style={{ width: 160 }}
                  >
                    {countries.map(province => (
                      <Option key={province}>{province}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <label>邮政编码</label>
                  <br />
                  <Input style={{ width: 160 }} />
                </Form.Item>
              </Form>

              <Form.Item label="Phone" colon={false} style={{ margin: 0 }}>
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
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
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
                <Input />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Form.create()(Addcustomers);
