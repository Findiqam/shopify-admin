import { connect } from 'dva';
import {
  Table,
  Card
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect()(OrderDetails);
