import { connect } from 'dva';
import moment from 'moment';
import {
    Table,
    Card,
    Row, Col,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import CheckoutDetails from './components/CheckoutDetails';
import Customer from './components/Customer';

const mapStateToProps = ({ abandonedcheckoutdetails, loading }) => ({
    name: abandonedcheckoutdetails.thisDetails.name,
    created_at: abandonedcheckoutdetails.thisDetails.created_at,
    thisDetails: abandonedcheckoutdetails.thisDetails,
    loading: loading.models["abandonedcheckoutdetails"],
})
const mapDispatchToProps = (dispatch) => ({
    setDetails: () => dispatch({
        type: 'abandonedcheckoutdetails/setDetails_e',
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
class AbandonedCheckoutDetails extends React.Component {
    componentDidMount() {
        const { setDetails } = this.props;
        setDetails();
    }
    render() {
        const { name, created_at, thisDetails, loading } = this.props;
        return (
            <>
                <PageHeaderWrapper
                    onBack={
                        () => {
                            location.hash = '/orders/abandoned_checkouts';
                        }
                    }
                >
                    <Card
                        title={<><div style={{ fontWeight: 500, fontSize: 35 }}>{name}</div>{moment(created_at).format("YYYY年MM月DD日 hh:mm:ss")}</>}
                        loading={loading&&thisDetails===''}
                    >
                        {
                            thisDetails === "" ? "" :
                                <Row gutter={24}>
                                    <Col span={17}>
                                        <CheckoutDetails />
                                    </Col>
                                    <Col span={7}>
                                        <Customer />
                                    </Col>
                                </Row>
                        }
                    </Card>
                </PageHeaderWrapper>
            </>
        );
    }
}

export default connect()(AbandonedCheckoutDetails);
