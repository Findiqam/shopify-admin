import { connect } from 'dva';
import {
    Card,
    Avatar,
    Row, Col,
    Icon,
    Button,

} from 'antd';
const mapStateToProps = ({ abandonedcheckoutdetails, loading }) => ({
    customer: abandonedcheckoutdetails.thisDetails.customer,
    shipping_address: abandonedcheckoutdetails.thisDetails.shipping_address,
    billing_address: abandonedcheckoutdetails.thisDetails.billing_address,
    loading: loading.models["abandonedcheckoutdetails"],
})
const mapDispatchToProps = (dispatch) => ({

})
@connect(mapStateToProps, mapDispatchToProps)
class Customer extends React.Component {

    render() {
        const { customer, shipping_address, billing_address, } = this.props;
        return (
            <>
                <Card
                    title="Customer"
                    bordered={false}
                >
                    <Row>
                        <Col span={4}>
                            <Avatar size={64} icon="user" />
                        </Col>
                        <Col span={11}></Col>
                        <Col span={9}><Button type="link"><Icon type="container" />{customer.orders_count + " " + "orders"}</Button></Col>
                        <Col span={24}><Button type="link" style={{ paddingLeft: 0 }}>{customer.first_name + ' ' + customer.last_name}</Button></Col>
                        <Col span={24}>{customer.email !== null ? customer.email : 'No email provided'}</Col>
                        <Col span={24}>{customer.phone !== null ? customer.phone : 'No phone'}</Col>
                        <Col span={24}>{customer.account ? customer.account : 'No account'}</Col>

                    </Row>

                </Card>
                <Card
                    title="SHIPPING ADDRESS"
                    bordered={false}
                >
                    <Row>
                        <Col span={24}>{shipping_address.first_name + ' ' + shipping_address.last_name}</Col>
                        <Col span={24}>{shipping_address.address1 + ' ' + shipping_address.city}</Col>
                        <Col span={24}>{shipping_address.zip + ' ' + shipping_address.province}</Col>
                        <Col span={24}>{shipping_address.country}</Col>
                    </Row>
                </Card>
                <Card
                    title="BILLING ADDRESS"
                    bordered={false}
                >
                    {billing_address ? billing_address : 'No billing address'}
                </Card>
            </>
        );
    }
}

export default Customer;