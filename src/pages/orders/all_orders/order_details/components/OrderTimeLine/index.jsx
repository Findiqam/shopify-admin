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
    Timeline,

} from 'antd';
import moment from 'moment';

const mapStateToProps = ({ orderdetails, loading }) => ({
    thisEvents: orderdetails.thisEvents,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class OrderTimeLine extends React.Component {
    render() {
        const { thisEvents } = this.props;
        let eventsTimelineItem = [];
        if (thisEvents.length !== 0) {
            eventsTimelineItem = thisEvents.map((item, key) => (<Timeline.Item key={key}>
                <Row>
                    <Col span={18}>
                        {item.description}
                    </Col>
                    <Col span={6}>
                        {moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </Col>
                </Row>
            </Timeline.Item>))
        }
        return (
            <>
                <Card
                    title="TimeLine"
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
                    <Timeline>
                        {eventsTimelineItem}
                    </Timeline>
                </Card>
            </>
        )
    }
}

export default Form.create()(OrderTimeLine);