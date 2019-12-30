import { connect } from 'dva';
import {
  Table,
  Card,
  Row, Col,
  Divider,
  Button,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import BillingAddress from './components/BillingAddress';
import ContactInformation from './components/ContactInformation';
import Customer from './components/Customer';
import Fulfilled from './components/Fulfilled';
import Notes from './components/Notes';
import OrderTimeLine from './components/OrderTimeLine';
import Payment from './components/Payment';
import ShippingAddress from './components/ShippingAddress';
import Unfulfilled from './components/Unfulfilled';


const mapStateToProps = ({ orderdetails, loading }) => ({
  loading: loading.models["orderdetails"],
  name: orderdetails.thisDetails.name,
})
const mapDispatchToProps = (dispatch) => ({
  setDetails: () => dispatch({
    type: 'orderdetails/setDetails_e',
  }),
})
@connect(mapStateToProps, mapDispatchToProps)
class OrderDetails extends React.Component {
  componentDidMount() {
    const { setDetails } = this.props;
    setDetails();
  }
  render() {
    const { name } = this.props;
    return (
      <>
        <PageHeaderWrapper
          onBack={
            () => {
              location.hash = '/orders/all_orders';
            }
          }
        >
          <Card
            title={name}
            bordered={false}
          >
            <Row>
              <Col span={17}>
                <Unfulfilled />
                <Fulfilled />
                <Payment />
                <OrderTimeLine />
              </Col>
              <Col span={7}>
                <Notes />
                <Customer />
                <ContactInformation />
                <ShippingAddress />
                <BillingAddress />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={22}>
              </Col>
              <Col span={2}>
                <Button type='primary' block >Save</Button>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}
export default OrderDetails;
