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
    fulfilled: orderdetails.fulfilled,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class Fulfilled extends React.Component {
    render() {
        const { fulfilled } = this.props;
        return (
            <>
                <Card
                    title="Fulfilled"
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

export default Form.create()(Fulfilled);