import { connect } from 'dva';
import {
  Table,
  Card,
  Pagination,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,

} from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
const InputGroup = Input.Group;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class AllOrders extends React.Component {
  componentDidMount() {
    const { initialization } = this.props;
    initialization();
  }
  render() {
    const { orders, loading, getFilter } = this.props;
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
        render: customer => (customer ? customer.first_name + " " + customer.last_name : "没有客户"),
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
        // disabled: record.customer.first_name === '', // Column configuration not to be checked
      }),
    };
    const status_SelectValues = ["Any", "Open", "Closed","Cancelled"];
    const status_SelectOptions = status_SelectValues.map((item) => (<Option value={item.toLowerCase()}>{item}</Option>));
    const paymentStatus_SelectValues = ["Authorized", "Paid", "Pending","Partially_paid", "Refunded", "Voided","Partially_refunded","Unpaid"];
    const paymentStatus_SelectOptions = paymentStatus_SelectValues.map((item) => (<Option value={item.toLowerCase()}>{item}</Option>));
    const fulfillmentStatus_SelectValues = ["Shipped", "Partial", "Unshipped", "Unfulfilled"];
    const fulfillmentStatus_SelectOptions = fulfillmentStatus_SelectValues.map((item) => (<Option value={item.toLowerCase()}>{item}</Option>));
    return (
      <>
        <PageHeaderWrapper>
          <Card>
            <Form layout="inline">
              <Form.Item label="Status">
                <Select defaultValue="any" style={{ width: 100 }} onChange={(value) => getFilter({ name:"status", value })} >
                  {status_SelectOptions}
                </Select>
              </Form.Item>
              <Form.Item label="Payment status">
                <Select
                  mode="multiple"
                  style={{ width: 180 }}
                  placeholder="Please select"
                  allowClear={true}
                  onChange={(value) => getFilter({ name:"financial_status", value })}
                >
                  {paymentStatus_SelectOptions}
                </Select>
              </Form.Item>
              <Form.Item label="Fulfillment status">
                <Select
                  mode="multiple"
                  style={{ width: 180 }}
                  placeholder="Please select"
                  allowClear={true}
                >
                  {fulfillmentStatus_SelectOptions}
                </Select>
              </Form.Item>
            </Form>
            <Form layout="inline">
              <InputGroup compact>
                <Select defaultValue="created_at_min" style={{ width: 80 }} >
                  <Option value="created_at_min">After</Option>
                  <Option value="created_at_max">Before</Option>
                </Select>
                <DatePicker format='YYYY-MM-DD' ref="created_at_date" />
                <TimePicker format='HH:mm:ss' ref="created_at_time" />
              </InputGroup>
            </Form>
            <Button type="primary" >
              Commit
            </Button>
            <Button type="default" >
              Reset
            </Button>
            <Table
              columns={columns}
              dataSource={orders}
              rowSelection={rowSelection}
              pagination={
                {
                  hideOnSinglePage: true,
                  disabled: true
                }
              }
              loading={loading}
            />
          </Card>

        </PageHeaderWrapper>
      </>
    );
  }
}
const mapStateToProps = ({ orders, loading }) => ({
  orders: orders.ordersData,
  loading: loading.models["orders"],
})
const mapDispatchToProps = (dispatch) => ({
  initialization: () => dispatch({
    type: 'orders/getOrders'
  }),
  getFilter: (filter) => dispatch({
    type: 'orders/getFilter',
    payload: filter
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);

