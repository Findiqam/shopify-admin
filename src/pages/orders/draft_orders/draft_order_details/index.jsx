import { connect } from 'dva';
import {
  Table,
  Card,
  Row, Col,
  Divider,
  Button,
  Icon,
  Popconfirm,
  message,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelectProducts from './components/SelectProducts';
import FindOrCreateCustomer from './components/FindOrCreateCustomer';
import Customer from './components/Customer';
import ShippingAddress from './components/ShippingAddress';
import BillingAddress from './components/BillingAddress';
import LineItems from './components/LineItems';
const mapStateToProps = ({ draftorderdetails, loading }) => ({
  thisDetails: draftorderdetails.thisDetails,
  name: draftorderdetails.thisDetails.name,
  customer: draftorderdetails.customer,
  line_items: draftorderdetails.line_items,
  loading: loading.models["draftorderdetails"],
})
const mapDispatchToProps = (dispatch) => ({
  setDetails: () => dispatch({
    type: 'draftorderdetails/setDetails_e',
  }),
  resetState: () => dispatch({
    type: 'draftorderdetails/resetState_r',
  }),
  deleteDraftOrder: (draft_order_id) => dispatch({
    type: 'draftorderdetails/deleteDraftOrder_e',
    payload: draft_order_id,
  }),
  updateDraftOrder: () => dispatch({
    type: 'draftorderdetails/updateDraftOrder_e',
  }),
})
@connect(mapStateToProps, mapDispatchToProps)
class DraftOrderDetails extends React.Component {
  componentDidMount() {
    const { setDetails, resetState } = this.props;
    resetState();
    setDetails();
  }
  render() {
    const { thisDetails, name, loading, setDetails, customer, line_items, deleteDraftOrder, updateDraftOrder } = this.props;
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
            title={<><div style={{ fontWeight: 500, fontSize: 35 }}>{name}</div></>}
            loading={loading && thisDetails === ''}
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
              <Col span={4}>
                <Popconfirm
                  title={"Are you sure you want to delete draft order " + name + "? This action cannot be reversed."}
                  onConfirm={
                    async () => {
                      await deleteDraftOrder(thisDetails.id);
                      message.success('You delete draft order ' + name);
                    }
                  }
                  onCancel={
                    () => {
                      message.error('You cancel');
                    }
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type='danger' block disabled={line_items.length === 0} >Delete draft order</Button>
                </Popconfirm>
              </Col>
              <Col span={16}>
              </Col>
              <Col span={4}>
                <Button type='primary' block disabled={line_items.length === 0} onClick={() => { updateDraftOrder() }}>Save draft order</Button>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect()(DraftOrderDetails);
