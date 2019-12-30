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
    note: orderdetails.note,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class Notes extends React.Component {
    render() {
        const { note } = this.props;
        return (
            <>
                <Card
                    title="Notes"
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
                    {note}
                </Card>
            </>
        )
    }
}

export default Form.create()(Notes);