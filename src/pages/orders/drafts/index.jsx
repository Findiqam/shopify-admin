import { connect } from 'dva';
import {
  Table,
  Card
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
class Drafts extends React.Component {
  
  render() {
   
    return (
      <>
        <PageHeaderWrapper>
          <Card>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect( )(Drafts);