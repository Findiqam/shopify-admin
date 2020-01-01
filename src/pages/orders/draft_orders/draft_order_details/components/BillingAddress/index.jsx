import { connect } from 'dva';
import {
    Card,
    Avatar,
    Row, Col,
    Icon,
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
const mapStateToProps = ({ draftorderdetails, loading }) => ({
    billing_address: draftorderdetails.billing_address,
    loading: loading.models["draftorderdetails"],
})
const mapDispatchToProps = (dispatch) => ({
    setBillingAddress: (billing_address) => dispatch({
        type: 'draftorderdetails/setBillingAddress_r',
        payload: billing_address,
    })
})
@connect(mapStateToProps, mapDispatchToProps)
class BillingAddress extends React.Component {
    state = {
        billing_address_visible: false,
    }
    render() {
        const { billing_address, setBillingAddress } = this.props;
        const { getFieldDecorator, validateFields, setFieldsValue, getFieldsValue, getFieldValue } = this.props.form;
        const { first_name, last_name, phone, company, address1, city, zip, province, country, } = billing_address;
        return (
            <>
                <Card
                    title="BILLING ADDRESS"
                    bordered={false}
                    extra={
                        <Button
                            size='small'
                            type='link'
                            onClick={
                                () => {
                                    setFieldsValue({
                                        first_name: first_name,
                                        last_name: last_name,
                                        phone: phone,
                                        company: company,
                                        address1: address1,
                                        city: city,
                                        zip: zip,
                                        province: province,
                                        country: country,
                                    });
                                    this.setState({
                                        billing_address_visible: true
                                    })
                                }
                            }
                        >
                            Edit
                </Button>
                    }
                >
                    <Row>
                        <Col span={24}>{billing_address.first_name + ' ' + billing_address.last_name}</Col>
                        <Col span={24}>{billing_address.phone}</Col>
                        <Col span={24}>{billing_address.company}</Col>
                        <Col span={24}>{billing_address.address1 + ' ' + billing_address.city}</Col>
                        <Col span={24}>{billing_address.zip + ' ' + billing_address.province}</Col>
                        <Col span={24}>{billing_address.country}</Col>
                    </Row>
                </Card>
                <Modal
                    title="Edit billing address"
                    centered
                    visible={this.state.billing_address_visible}
                    onOk={
                        () => {
                            setBillingAddress(getFieldsValue())
                            this.setState({
                                billing_address_visible: false
                            })
                        }
                    }
                    onCancel={
                        () => {
                            this.setState({
                                billing_address_visible: false
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
        )
    }
}

export default Form.create()(BillingAddress);