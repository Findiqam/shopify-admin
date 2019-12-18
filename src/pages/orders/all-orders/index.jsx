import { connect } from 'dva';
import {
  Table,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Icon,
  Row, Col,
} from 'antd';
import moment, { months } from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class AllOrders extends React.Component {
  state = {
    created_at: {
      name: 'created_at_min',
      value: '',
      created_at_date: '',
      created_at_time: '',
    },
    updated_at: {
      name: 'updated_at_min',
      value: '',
      updated_at_date: '',
      updated_at_time: '',
    },
    paymentStatusOption: false,
    fulfillmentStatusOption: false,
  }
  componentDidMount() {
    const { getOrders } = this.props;
    getOrders();
  }
  render() {
    const { ordersData, filter, nowPage, previous, next, loading, getOrders, setFilter, resetFilter, previousPage, nextPage } = this.props;
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
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        // disabled: record.customer.first_name === '', // Column configuration not to be checked
      }),
    };
    const status_SelectValues = ["Any", "Open", "Closed", "Cancelled"];
    const status_SelectOptions = status_SelectValues.map((item) => (<Option value={item.toLowerCase()}>{item}</Option>));
    const paymentStatus_SelectValues = ["Authorized", "Paid", "Pending", "Partially_paid", "Refunded", "Voided", "Partially_refunded", "Unpaid"];
    const paymentStatus_SelectOptions = paymentStatus_SelectValues.map((item) => (<Option value={item.toLowerCase()} disabled={!this.state.paymentStatusOption}>{item}</Option>));
    const fulfillmentStatus_SelectValues = ["Shipped", "Partial", "Unshipped", "Unfulfilled"];
    const fulfillmentStatus_SelectOptions = fulfillmentStatus_SelectValues.map((item) => (<Option value={item.toLowerCase()} disabled={!this.state.fulfillmentStatusOption}>{item}</Option>));
    return (
      <>
        <PageHeaderWrapper>
          <Card>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Status">
                    <Select
                      defaultValue="any"
                      value={filter.status}
                      onChange={
                        (value) => {
                          setFilter({ name: "status", value })
                          getOrders();
                        }
                      }
                    >
                      {status_SelectOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Payment status">
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      allowClear={true}
                      value={filter.financial_status}
                      onChange={
                        (value) => {
                          setFilter({ name: "financial_status", value });
                        }
                      }
                      onBlur={
                        () => {
                          this.setState({
                            paymentStatusOption: false
                          })
                          getOrders();
                        }
                      }
                      onFocus={
                        () => {
                          this.setState({
                            paymentStatusOption: true
                          })
                        }
                      }
                    >
                      {paymentStatus_SelectOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Fulfillment status">
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      value={filter.fulfillment_status}
                      allowClear={true}
                      onChange={(value) => setFilter({ name: "fulfillment_status", value })}
                      onBlur={
                        () => {
                          this.setState({
                            fulfillmentStatusOption: false
                          })
                          getOrders();
                        }
                      }
                      onFocus={
                        () => {
                          this.setState({
                            fulfillmentStatusOption: true
                          })
                        }
                      }
                    >
                      {fulfillmentStatus_SelectOptions}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Name like">
                <Search
                  placeholder="input search text"
                  defaultValue={filter.name}
                  allowClear={true}
                  enterButton="Screen"
                  onSearch={value => setFilter({ name: "name", value })}
                />
              </Form.Item>
              <Form.Item label="Created at or">
                <InputGroup compact>
                  <Select
                    defaultValue="created_at_min"
                    style={{ width: 80 }}
                    onChange={
                      value => {
                        this.setState({
                          created_at: {
                            ...this.state.created_at,
                            name: value
                          }
                        })
                      }
                    }
                  >
                    <Option value="created_at_min">After</Option>
                    <Option value="created_at_max">Before</Option>
                  </Select>
                  <DatePicker
                    format='YYYY-MM-DD'
                    ref="created_at_date"
                    onChange={
                      (d, dstr) => {
                        console.log(moment(d).format(), dstr)
                        let created_at_value = moment(dstr + " " + this.state.created_at.created_at_time).format();
                        if (created_at_value === "Invalid date") {
                          created_at_value = '';
                        }
                        this.setState({
                          created_at: {
                            ...this.state.created_at,
                            value: created_at_value,
                            created_at_date: dstr,
                          }
                        })
                      }
                    }
                  />
                  <TimePicker
                    format='HH:mm:ss'
                    ref="created_at_time"
                    onChange={
                      (t, tstr) => {
                        let created_at_value = moment(this.state.created_at.created_at_date + " " + tstr).format();
                        if (created_at_value === "Invalid date") {
                          created_at_value = '';
                        }
                        this.setState({
                          created_at: {
                            ...this.state.created_at,
                            value: created_at_value,
                            created_at_time: tstr,
                          }
                        })
                      }
                    }
                  />
                  <Button
                    type="primary"
                    onClick={
                      () => {
                        setFilter({ name: this.state.created_at.name, value: this.state.created_at.value });
                        getOrders();
                      }
                    }
                  >
                    Screen
                  </Button>
                </InputGroup>
              </Form.Item>
              <Form.Item label="Updated at or">
                <InputGroup compact>
                  <Select
                    defaultValue="updated_at_min"
                    style={{ width: 80 }}
                    onChange={
                      value => {
                        this.setState({
                          updated_at: {
                            ...this.state.updated_at,
                            name: value
                          }
                        })
                      }
                    }
                  >
                    <Option value="updated_at_min">After</Option>
                    <Option value="updated_at_max">Before</Option>
                  </Select>
                  <DatePicker
                    format='YYYY-MM-DD'
                    ref="updated_at_date"
                    onChange={
                      (d, dstr) => {
                        let updated_at_value = moment(dstr + " " + this.state.updated_at.updated_at_time).format();
                        if (updated_at_value === "Invalid date") {
                          updated_at_value = '';
                        }
                        this.setState({
                          updated_at: {
                            ...this.state.updated_at,
                            value: updated_at_value,
                            updated_at_date: dstr,
                          }
                        })
                      }
                    }
                  />
                  <TimePicker
                    format='HH:mm:ss'
                    ref="updated_at_time"
                    onChange={
                      (t, tstr) => {
                        let updated_at_value = moment(this.state.updated_at.updated_at_date + " " + tstr).format();
                        if (updated_at_value === "Invalid date") {
                          updated_at_value = '';
                        }
                        this.setState({
                          updated_at: {
                            ...this.state.updated_at,
                            value: updated_at_value,
                            updated_at_time: tstr,
                          }
                        })
                      }
                    }
                  />
                  <Button
                    type="primary"
                    onClick={
                      () => {
                        setFilter({ name: this.state.updated_at.name, value: this.state.updated_at.value });
                        getOrders();
                      }
                    }
                  >
                    Screen
                  </Button>
                </InputGroup>
              </Form.Item>
              <Button
                type="default"
                onClick={
                  () => {
                    resetFilter();
                  }
                }
              >
                Reset
            </Button>
            </Form>
            <Table
              columns={columns}
              dataSource={ordersData}
              rowSelection={rowSelection}
              pagination={false}
              loading={loading}
            />
            <Button.Group>
              <Button type="primary" disabled={previous === ''} onClick={() => previousPage()}>
                <Icon type="left" />
                previous
              </Button>
              {"    第" + nowPage + "页    "}
              <Button type="primary" disabled={next === ''} onClick={() => nextPage()}>
                next
                <Icon type="right" />
              </Button>
            </Button.Group>
          </Card>

        </PageHeaderWrapper>
      </>
    );
  }
}
const mapStateToProps = ({ orders, loading }) => ({
  ordersData: orders.ordersData,
  filter: orders.filter,
  nowPage: orders.nowPage,
  previous: orders.previous,
  next: orders.next,
  loading: loading.models["orders"],
})
const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch({
    type: 'orders/setOrders_e'
  }),
  setFilter: (filter) => dispatch({
    type: 'orders/setFilter_e',
    payload: filter
  }),
  resetFilter: () => dispatch({
    type: 'orders/resetFilter_r'
  }),
  previousPage: () => dispatch({
    type: 'orders/previousPage_e'
  }),
  nextPage: () => dispatch({
    type: 'orders/nextPage_e'
  }),
})
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(AllOrders));

