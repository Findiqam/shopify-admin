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
    customer: orderdetails.customer,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class Customer extends React.Component {
    render() {
        const { customer } = this.props;
        return (
            <>
                <Card
                    title="Customer"
                    bordered={false}
                    extra={
                        <Avatar icon="user" />
                    }
                >
                    {customer === null ? 'No customer' :
                        <Row>
                            <Col span={24}>{customer.first_name + ' ' + customer.last_name}</Col>
                            <Col span={24}>{customer.orders_count + ' ' + 'orders'}</Col>
                        </Row>
                    }
                </Card>
            </>
        )
    }
}

export default Form.create()(Customer);