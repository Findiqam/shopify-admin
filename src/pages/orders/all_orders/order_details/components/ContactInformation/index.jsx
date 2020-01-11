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
                    {contact_information === null ?
                        <Row>
                            <Col span={24}>No email address</Col>
                            <Col span={24}>No phone number</Col>
                        </Row>
                        :
                        <Row>
                            <Col span={24}>{contact_information.email === null || contact_information.email === '' ? 'No email address' : contact_information.email}</Col>
                            <Col span={24}>{contact_information.phone === null || contact_information.phone === '' ? 'No phone number' : contact_information.phone}</Col>
                        </Row>
                    }
                </Card>
            </>
        )
    }
}

export default Form.create()(ContactInformation);