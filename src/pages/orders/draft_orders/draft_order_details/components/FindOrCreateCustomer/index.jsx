import { connect } from 'dva';
import {
    Card,
    Select,
    Avatar,
    Row, Col,
    Spin,
    Modal,
    Form,
    Input,

} from 'antd';
const { Option } = Select;

const mapStateToProps = ({ draftorderdetails, loading }) => ({
    customers: draftorderdetails.customers,
    loading: loading.models["draftorderdetails"],
})
const mapDispatchToProps = (dispatch) => ({
    setCustomers: () => dispatch({
        type: 'draftorderdetails/setCustomers_e',
    }),
    setCustomer: (id) => dispatch({
        type: 'draftorderdetails/setCustomer_e',
        payload: id,
    }),
    createCustomer: (customer) => dispatch({
        type: 'draftorderdetails/createCustomer_e',
        payload: customer,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
class FindOrCreateCustomer extends React.Component {
    state = {
        create_customer_visible: false,
    }
    render() {
        const { customers, setCustomer, setCustomers, createCustomer, loading } = this.props;
        const { getFieldDecorator, validateFields, setFieldsValue, getFieldsValue, getFieldValue } = this.props.form;
        const customers_Options = customers.map(
            (item, key) => (
                <Option
                    value={item.id}
                    key={key}
                    label={item.first_name + ' ' + item.last_name}
                    searchvalue={item.first_name + item.last_name + item.email}
                >
                    <Row gutter={24}>
                        <Col span={5}>
                            <Avatar size={48} icon="user" />
                        </Col>
                        <Col span={19}>
                            <div>{item.first_name + ' ' + item.last_name}</div>
                            <div>{item.email === null ? "No email provided" : item.email}</div>
                        </Col>
                    </Row>
                </Option>
            )
        );
        return (
            <>
                <Card
                    title="Find or create Customer"
                    bordered={false}
                >
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search customers"
                        optionLabelProp="value"
                        optionFilterProp="children"
                        filterOption={
                            (input, option) => {
                                const searchvalueStr = option.props.searchvalue + '';
                                return searchvalueStr.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        }
                        onSelect={
                            (value) => {
                                if (value !== 'Search customers') {
                                    setCustomer(value);
                                } else {
                                    setFieldsValue({
                                        country: 'China',
                                        province: 'Fujian',
                                    });
                                    this.setState({
                                        create_customer_visible: true,
                                    })
                                }

                            }
                        }
                        onFocus={
                            () => {
                                setCustomers();
                            }
                        }
                    >
                        <Option value='Search customers' label='Create a new customer'>
                            {loading && customers.length === 0 ? <Spin /> :
                                <Row gutter={24}>
                                    <Col span={5}>
                                        <Avatar size={48} icon="user-add" />
                                    </Col>
                                    <Col span={19}>
                                        <div style={{ lineHeight: 3 }}>Create a new customer</div>
                                    </Col>
                                </Row>
                            }
                        </Option>
                        {customers_Options}
                    </Select>
                </Card>
                <Modal
                    title="Create a new customer"
                    centered
                    visible={this.state.create_customer_visible}
                    okButtonProps={{
                        disabled: getFieldValue('first_name') === undefined || !/\S+/.test(getFieldValue('first_name')),
                    }}
                    onOk={
                        () => {
                            createCustomer(JSON.stringify({
                                customer: {
                                    ...getFieldsValue(['first_name', 'last_name', 'email', 'phone']),
                                    addresses: [
                                        {
                                            ...getFieldsValue(['first_name', 'last_name', 'phone', 'company', 'address1', 'city', 'country', 'province', 'zip']),
                                        }
                                    ]
                                }
                            }));
                            this.setState({
                                create_customer_visible: false,
                            })
                        }
                    }
                    onCancel={
                        () => {
                            this.setState({
                                create_customer_visible: false,
                            })
                        }
                    }
                >
                    <Form layout='vertical'>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label='first_name'>
                                    {getFieldDecorator('first_name')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='last_name'>
                                    {getFieldDecorator('last_name')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label='email'>
                                    {getFieldDecorator('email')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='phone'>
                                    {getFieldDecorator('phone')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='company'>
                                    {getFieldDecorator('company')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='address1'>
                                    {getFieldDecorator('address1')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='city'>
                                    {getFieldDecorator('city')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='country'>
                                    {getFieldDecorator('country')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='province'>
                                    {getFieldDecorator('province')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='zip'>
                                    {getFieldDecorator('zip')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Form.create()(FindOrCreateCustomer);