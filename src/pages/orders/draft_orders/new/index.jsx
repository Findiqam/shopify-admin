import { connect } from 'dva';
import {
  Table,
  Card,
  Row,Col,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import OrderDetails from './components/OrderDetails';
import FindOrCreateCustomer from './components/FindOrCreateCustomer';

class New extends React.Component {

  render() {

    return (
      <>
        <PageHeaderWrapper
          onBack={
            () => {
              location.hash = '/orders/draft_orders';
            }
          }
        >
          <Card>
          <Row gutter={24}>
              <Col span={17}>
                <OrderDetails/>
              </Col>
              <Col span={7}>
              <FindOrCreateCustomer/>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect()(New);