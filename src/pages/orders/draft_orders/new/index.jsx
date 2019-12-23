import { connect } from 'dva';
import {
  Table,
  Card
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect()(New);