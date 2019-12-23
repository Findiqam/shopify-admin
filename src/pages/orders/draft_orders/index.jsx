import { connect } from 'dva';
import {
  Card
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DraftsFilter from './components/DraftsFilter';
import DraftsTable from './components/DraftsTable';
import DraftsPagination from './components/DraftsPagination';

class Drafts extends React.Component {
  
  render() {
   
    return (
      <>
        <PageHeaderWrapper>
          <Card>
            <DraftsFilter/>
            <DraftsTable/>
            <DraftsPagination/>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect()(Drafts);