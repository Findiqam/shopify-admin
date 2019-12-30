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
    contact_information: orderdetails.contact_information,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class ContactInformation extends React.Component {
    render() {
        const { contact_information } = this.props;
        return (
            <>
                <Card
                    title="CONTACT INFORMATION"
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

export default Form.create()(ContactInformation);