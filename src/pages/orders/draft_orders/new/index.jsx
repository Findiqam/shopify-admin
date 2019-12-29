import { connect } from 'dva';
import {
  Table,
  Card,
  Row, Col,
  Divider,
  Button,
  Icon,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelectProducts from './components/SelectProducts';
import FindOrCreateCustomer from './components/FindOrCreateCustomer';
import Customer from './components/Customer';
import ShippingAddress from './components/ShippingAddress';
import BillingAddress from './components/BillingAddress';
import LineItems from './components/LineItems';
const mapStateToProps = ({ newdrafts, loading }) => ({
  customer: newdrafts.customer,
  line_items: newdrafts.line_items,
  loading: loading.models["newdrafts"],
})
const mapDispatchToProps = (dispatch) => ({
  setCustomer: () => dispatch({
    type: 'newdrafts/setCustomer_r',
    payload: '',
  }),
  createDraftOrder: () => dispatch({
    type: 'newdrafts/createDraftOrder_e',
  }),
})
@connect(mapStateToProps, mapDispatchToProps)
class New extends React.Component {

  render() {
    const { customer, line_items, createDraftOrder } = this.props;
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
            extra={
              <Button type='primary' block disabled={line_items.length === 0}>Save</Button>
            }
          >
            <Row gutter={24}>
              <Col span={17}>
                <SelectProducts />
                <Divider />
                <LineItems />
                <Divider />
                <Card bordered={false}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <div style={{ lineHeight: '32px', fontWeight: 500 }}>
                        <Icon type="credit-card" style={{ marginRight: 24 }} />ACCEPT PAYMENT
                      </div>
                    </Col>
                    <Col span={16}>
                      <Button disabled={line_items.length === 0} style={{ marginLeft: 24 }}>Mark as paid</Button>
                      <Button disabled={line_items.length === 0} style={{ marginLeft: 24 }}>Mark as pending</Button>
                      <Button disabled={true} style={{ marginLeft: 24 }}>Pay with credit card</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={7}>
                {customer === '' ? <FindOrCreateCustomer /> : <><Customer /><ShippingAddress /><BillingAddress /></>}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={20}>
              </Col>
              <Col span={4}>
                <Button type='primary' block disabled={line_items.length === 0} onClick={() => { createDraftOrder() }}>Save draft order</Button>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default New;