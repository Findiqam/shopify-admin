import { connect } from 'dva';
import {
  Table,
  Card,
  Row,Col,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

@connect()
class OrderDetails extends React.Component {

  render() {

    return (
      <>
        <PageHeaderWrapper
          onBack={
            () => {
              location.hash='/orders/all_orders';
            }
          }
        >
          <Card>
            <Row>
              <Col span={17}>
                <Card>

                </Card>
              </Col>
              <Col span={7}>
              <Card>
                  
                  </Card>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}
export default OrderDetails;
