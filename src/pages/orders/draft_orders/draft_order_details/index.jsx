import { connect } from 'dva';
import {
  Table,
  Card,
  Row, Col,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

class DraftOrderDetails extends React.Component {

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
              </Col>
              <Col span={7}>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect()(DraftOrderDetails);
