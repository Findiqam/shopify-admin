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
const mapStateToProps = ({ orderdetails, loading }) => ({
    shipping_address: orderdetails.shipping_address,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class ShippingAddress extends React.Component {
    render() {
        const { shipping_address } = this.props;
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
                                }
                            }
                        >
                            Edit
                </Button>
                    }
                >
                    <Row>
                        {/* <Col span={24}>{shipping_address.first_name + ' ' + shipping_address.last_name}</Col>
                        <Col span={24}>{shipping_address.phone}</Col>
                        <Col span={24}>{shipping_address.company}</Col>
                        <Col span={24}>{shipping_address.address1 + ' ' + shipping_address.city}</Col>
                        <Col span={24}>{shipping_address.zip + ' ' + shipping_address.province}</Col>
                        <Col span={24}>{shipping_address.country}</Col> */}
                    </Row>
                </Card>
            </>
        )
    }
}

export default Form.create()(ShippingAddress);