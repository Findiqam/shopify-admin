import { connect } from 'dva';
import {
  Table,
  Card
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AbandonedFilter from './components/AbandonedFilter';
import AbandonedTable from './components/AbandonedTable';
import AbandonedPagination from './components/AbandonedPagination';
class AbandonedCheckouts extends React.Component {

  render() {

    return (
      <>
        <PageHeaderWrapper>
          <Card>
            <AbandonedFilter/>
            <AbandonedTable />
            <AbandonedPagination />
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect()(AbandonedCheckouts);
