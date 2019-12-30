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
    billing_address: orderdetails.billing_address,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class BillingAddress extends React.Component {
    render() {
        const { billing_address } = this.props;
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
                                }
                            }
                        >
                            Edit
                </Button>
                    }
                >
                    <Row>
                    </Row>
                </Card>
            </>
        )
    }
}

export default Form.create()(BillingAddress);