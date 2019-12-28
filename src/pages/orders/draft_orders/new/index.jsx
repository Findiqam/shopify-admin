import { connect } from 'dva';
import {
  Table,
  Card,
  Row, Col,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import OrderDetails from './components/OrderDetails';
import FindOrCreateCustomer from './components/FindOrCreateCustomer';
import Customer from './components/Customer';
import ShippingAddress from './components/ShippingAddress';
import BillingAddress from './components/BillingAddress';
const mapStateToProps = ({ newdrafts, loading }) => ({
  customer: newdrafts.customer,
  default_address: newdrafts.customer.default_address,
  loading: loading.models["newdrafts"],
})
const mapDispatchToProps = (dispatch) => ({
  setCustomer: () => dispatch({
    type: 'newdrafts/setCustomer_r',
    payload: '',
  })
})
@connect(mapStateToProps, mapDispatchToProps)
class New extends React.Component {

  render() {
    const { customer } = this.props;
    return (
      <>
        <PageHeaderWrapper
          onBack={
            () => {
              location.hash = '/orders/draft_orders';
            }
          }
        >
          <Card
            title={<><div style={{ fontWeight: 500, fontSize: 35 }}>Create order</div></>}
          >
            <Row gutter={24}>
              <Col span={17}>
                <OrderDetails />
              </Col>
              <Col span={7}>
                {customer === '' ? <FindOrCreateCustomer /> : <><Customer /><ShippingAddress /><BillingAddress /></>}
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default New;