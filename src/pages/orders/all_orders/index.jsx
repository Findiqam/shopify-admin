import {
  Card,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import OrdersFilterAndSort from './components/OrdersFilterAndSort';
import OrdersPagination from './components/OrdersPagination';
import OrdersTable from './components/OrdersTable';

class AllOrders extends React.Component {
  render() {
    return (
        <PageHeaderWrapper>
          <Card>
            <OrdersFilterAndSort />
            <OrdersTable />
            <OrdersPagination />
          </Card>
        </PageHeaderWrapper>
    );
  }
}
export default AllOrders;
