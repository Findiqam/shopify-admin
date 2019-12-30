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
    customer: draftorderdetails.customer,
    loading: loading.models["draftorderdetails"],
})
const mapDispatchToProps = (dispatch) => ({
    setCustomer: () => dispatch({
        type: 'draftorderdetails/setCustomer_r',
        payload: '',
    })
})
@connect(mapStateToProps, mapDispatchToProps)
class Customer extends React.Component {

    state = {
        billing_address_visible: false,
    };
    render() {
        const { customer, setCustomer } = this.props;
        return (
            <>
                <Card
                    title="Customer"
                    bordered={false}
                    extra={<Button size='small' type='link' onClick={() => { setCustomer(); }}><Icon type="close" /></Button>}
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
            </>
        );
    }
}

export default Customer;