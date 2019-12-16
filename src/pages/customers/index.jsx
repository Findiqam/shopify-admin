import { connect } from 'dva';
import {
  Table,

} from 'antd';
class AllCustomers extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/getAllCustomers'
    });
  }
  render() {
    const { customers } = this.props;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'first_name',
        key: 'name',
        render:(first_name,record)=>(first_name+" "+record.last_name)
      },
      {
        title: 'Address',
        dataIndex: 'default_address',
        key: 'default_address',
        render: default_address => (default_address.province+","+default_address.country_code),
      },
      {
        title: 'OrdersCount',
        dataIndex: 'orders_count',
        key: 'orders_count',
        render:orders_count=>(orders_count+" order")
      },
      {
        title: 'TotalSpent',
        dataIndex: 'total_spent',
        key: 'total_spent',
        render:total_spent=>("$"+total_spent+"spent")
      },
    ];
    return (
      <>
        <Table columns={columns} dataSource={customers} />
      </>
    );
  }
}
const mapStateToProps = ({ customers }) => ({
    customers: customers.allCustomers
})
const mapDispatchToProps = (dispatch) => ({
  dispatch:dispatch
})
export default connect(mapStateToProps,mapDispatchToProps)(AllCustomers);
