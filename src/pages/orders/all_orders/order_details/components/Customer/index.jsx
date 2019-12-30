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

export default Form.create()(Customer);