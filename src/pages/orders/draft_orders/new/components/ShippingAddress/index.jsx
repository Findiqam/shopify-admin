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

const mapStateToProps = ({ newdrafts, loading }) => ({
    shipping_address: newdrafts.shipping_address,
    loading: loading.models["newdrafts"],
})
const mapDispatchToProps = (dispatch) => ({
    setShippingAddress_r: (shipping_address) => dispatch({
        type: 'newdrafts/setShippingAddress_r',
        payload: shipping_address,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
class ShippingAddress extends React.Component {
    state = {
        shipping_address_visible: false,
    }
    render() {
        const { shipping_address, setShippingAddress_r } = this.props;
        const { getFieldDecorator, validateFields, setFieldsValue, getFieldsValue, getFieldValue } = this.props.form;
        const { first_name, last_name, phone, company, address1, city, zip, province, country, } = shipping_address;
        return (
            <>
                <Card
                    title="SHIPPING ADDRESS"
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
                                        shipping_address_visible: true
                                    })
                                }
                            }
                        >
                            Edit
                    </Button>
                    }
                >
                    <Row>
                        <Col span={24}>{first_name + ' ' + last_name}</Col>
                        <Col span={24}>{phone}</Col>
                        <Col span={24}>{company}</Col>
                        <Col span={24}>{address1 + ' ' + city}</Col>
                        <Col span={24}>{zip + ' ' + province}</Col>
                        <Col span={24}>{country}</Col>
                    </Row>
                </Card>
                <Modal
                    title="Edit shipping address"
                    centered
                    visible={this.state.shipping_address_visible}
                    onOk={
                        () => {
                            setShippingAddress_r(getFieldsValue());
                            this.setState({
                                shipping_address_visible: false
                            })
                        }
                    }
                    onCancel={
                        () => {
                            this.setState({
                                shipping_address_visible: false
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

export default Form.create()(ShippingAddress);