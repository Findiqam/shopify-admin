import { connect } from 'dva';
import {
  Table,
  Card
} from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
class AbandonedCheckouts extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orders/getAllOrders'
    });
  }
  render() {
    const { orders } = this.props;
    const columns = [
      {
        title: 'Order',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Date',
        dataIndex: 'created_at',
        key: 'created_at',
        render: created_at => (moment(created_at).format("YYYY-MM-DD HH:mm:ss"))
      },
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        render: customer => (customer.first_name + " " + customer.last_name),
      },
      {
        title: 'Payment',
        dataIndex: 'financial_status',
        key: 'financial_status',
      },
      {
        title: 'Fulfillment',
        dataIndex: 'fulfillment_status',
        key: 'fulfillment_status',
        render: fulfillment_status => {
          if (fulfillment_status === null) {
            return 'Unfulfilled'
          }
          else {
            return fulfillment_status
          }
        },
      },
      {
        title: 'Total',
        dataIndex: 'total_line_items_price',
        key: 'total_line_items_price',
        render: total_line_items_price => ('$' + total_line_items_price)
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.customer.first_name === '', // Column configuration not to be checked
      }),
    };
    return (
      <>
        <PageHeaderWrapper>
          <Card>
            <Table rowSelection={rowSelection} columns={columns} dataSource={orders} />
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}
const mapStateToProps = ({ orders }) => ({
  orders: orders.ordersData
})
const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(AbandonedCheckouts);
