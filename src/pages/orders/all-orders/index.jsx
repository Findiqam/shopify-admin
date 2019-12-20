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
  Tooltip,
} from 'antd';
import moment, { months } from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import maqiPagination from '@/pages/orders/components/maqiPagination';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class AllOrders extends React.Component {
  state = {
    created_at: { //暂存created_at相关属性
      name: 'created_at_min',
      value: '',
      created_at_date: '',
      created_at_time: '',
    },
    updated_at: { //暂存updated_at相关属性
      name: 'updated_at_min',
      value: '',
      updated_at_date: '',
      updated_at_time: '',
    },
    paymentStatusOption: false, //paymenStatus是否可操作
    fulfillmentStatusOption: false, //fulfillmentStatus是否可操作
    moreFilter: false,//是否展示更多过滤器
  }
  componentDidMount() {
    const { getOrders } = this.props;
    getOrders();
  }
  render() {
    const { ordersData, filter, nowPage, previous, next, loading, getOrders, setFilter, resetFilter, previousPage, nextPage, setSort, setLimit } = this.props;
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
    const sort_SelectValues = ["Default", "Created date (oldest first)", "Created date (newest first)", "Updated date (oldest first)", "Updated date (newest first)"];
    const sort_SelectOptions = sort_SelectValues.map((item) => (<Option value={item.toLowerCase()}>{item}</Option>))

    return (
      <>
        <PageHeaderWrapper>
          <Card>
            <Card
              title={
                <>Filter and sort by
                  <Select
                    size="small"
                    style={{ marginLeft: 10, width: 210 }}
                    defaultValue="default"
                    onChange={
                      (value) => {
                        let sort = { order: '', sort: '' };
                        if (value === "created date (oldest first)") {
                          sort.order = "created_at";
                          sort.sort = "asc";
                        } else if (value === "created date (newest first)") {
                          sort.order = "created_at";
                          sort.sort = "desc";
                        } else if (value === "updated date (oldest first)") {
                          sort.order = "updated_at";
                          sort.sort = "asc";
                        } else if (value === "updated date (newest first)") {
                          sort.order = "updated_at";
                          sort.sort = "desc";
                        }
                        setSort(sort);
                        getOrders();
                      }
                    }
                  >
                    {sort_SelectOptions}
                  </Select>
                </>
              }
              extra={
                <>
                  <Tooltip title="重置所有过滤选项">
                    <Button
                      size="small"
                      style={{ marginRight: 20 }}
                      onClick={
                        () => {
                          resetFilter();
                          this.setState({
                            moreFilter: false
                          })
                          getOrders();
                        }
                      }
                    >
                      All reset
                    </Button>
                  </Tooltip>
                  <Tooltip title={this.state.moreFilter ? "关闭更多过滤并重置更多过滤中的过滤选项" : "更多过滤器"}>
                    <Button
                      size="small"
                      onClick={
                        () => {
                          if (this.state.moreFilter) {
                            this.setState({
                              moreFilter: !this.state.moreFilter
                            });
                            const value = '';
                            setFilter({ name: "name", value });
                            setFilter({ name: "created_at_min", value });
                            setFilter({ name: "created_at_max", value });
                            setFilter({ name: "updated_at_min", value });
                            setFilter({ name: "updated_at_max", value });
                            getOrders();
                          } else {
                            this.setState({
                              moreFilter: !this.state.moreFilter
                            });
                          }

                        }
                      }
                    >
                      {this.state.moreFilter ? <>Close and reset<Icon type="up"></Icon> </> : <>More filter<Icon type="down"></Icon></>}
                    </Button>
                  </Tooltip>
                </>
              }
            >
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label={<Tooltip title="根据订单的状态进行筛选">Status</Tooltip>}>
                      <Select
                        defaultValue="any"
                        value={filter.status}
                        onChange={
                          (value) => {
                            setFilter({ name: "status", value });
                            getOrders();
                          }
                        }
                      >
                        {status_SelectOptions}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={<Tooltip title="根据订单的支付状态进行筛选">Payment status</Tooltip>}>
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
                    <Form.Item label={<Tooltip title="根据订单的履行状态进行筛选">Fulfillment status</Tooltip>}>
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
                  {
                    this.state.moreFilter &&
                    <Col span={24}>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item label={<Tooltip title="创建时间在该时间之前/之后的订单">Created at or</Tooltip>}>
                            <InputGroup compact>
                              <Select
                                defaultValue={this.state.created_at.name}
                                onChange={
                                  value => {
                                    this.setState({
                                      created_at: {
                                        ...this.state.created_at,
                                        name: value
                                      }
                                    });
                                    setFilter({ name: value, value: this.state.created_at.value });
                                  }
                                }
                              >
                                <Option value="created_at_min">After</Option>
                                <Option value="created_at_max">Before</Option>
                              </Select>
                              <DatePicker
                                format='YYYY-MM-DD'
                                onChange={
                                  (d, dstr) => {
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
                                    });
                                    setFilter({ name: this.state.created_at.name, value: created_at_value });
                                  }
                                }
                              />
                              <TimePicker
                                format='HH:mm:ss'
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
                                    });
                                    setFilter({ name: this.state.created_at.name, value: created_at_value });
                                  }
                                }
                              />
                              <Button
                                type="primary"
                                onClick={
                                  () => {
                                    getOrders();
                                  }
                                }
                              >
                                Screen
                  </Button>
                            </InputGroup>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label={<Tooltip title="更新时间在该时间之前/之后的订单">Updated at or</Tooltip>}>
                            <InputGroup compact>
                              <Select
                                defaultValue={this.state.updated_at.name}
                                onChange={
                                  value => {
                                    this.setState({
                                      updated_at: {
                                        ...this.state.updated_at,
                                        name: value
                                      }
                                    });
                                    setFilter({ name: value, value: this.state.updated_at.value });
                                  }
                                }
                              >
                                <Option value="updated_at_min">After</Option>
                                <Option value="updated_at_max">Before</Option>
                              </Select>
                              <DatePicker
                                format='YYYY-MM-DD'
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
                                    });
                                    setFilter({ name: this.state.updated_at.name, value: updated_at_value });
                                  }
                                }
                              />
                              <TimePicker
                                format='HH:mm:ss'
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
                                    });
                                    setFilter({ name: this.state.updated_at.name, value: updated_at_value });
                                  }
                                }
                              />
                              <Button
                                type="primary"
                                onClick={
                                  () => {
                                    getOrders();
                                  }
                                }
                              >
                                Screen
                  </Button>
                            </InputGroup>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label={<Tooltip title="匹配订单号前几位（带#不带都可以）">Name like</Tooltip>}>
                            <Search
                              placeholder="input search text"
                              defaultValue={filter.name}
                              allowClear={true}
                              enterButton="Screen"
                              onSearch={
                                value => {
                                  setFilter({ name: "name", value });
                                  getOrders();
                                }
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  }
                </Row>
              </Form>
            </Card>

            <Table
              columns={columns}
              dataSource={ordersData}
              rowSelection={rowSelection}
              pagination={false}
              loading={loading}
            />
            <maqiPagination
              showSizeDefault={10}
              showSizeSelect={[5, 10, 15, 20]}
              onShowSizeChange={
                (value) => {
                  setLimit(value);
                  getOrders();
                }
              }
              nowPage={nowPage}
              previousPage={previousPage}
              nextPage={nextPage}
              previousDisabled={previous === ''}
              nextDisabled={next === ''}
            >
            </maqiPagination>
            {/* <Row type="flex" justify="end">
              <Select
                style={{ margin: 20 }}
                defaultValue={10}
                onChange={
                  (value) => {
                    setLimit(value);
                    getOrders();
                  }
                }
              >
                <Option value={5}>
                  5 条/页
                </Option>
                <Option value={10}>
                  10 条/页
                </Option>
                <Option value={15}>
                  15 条/页
                </Option>
                <Option value={20}>
                  20 条/页
                </Option>
              </Select>
              <Button.Group style={{ margin: 20 }}>
                <Button type="primary" disabled={previous === ''} onClick={() => previousPage()}>
                  <Icon type="left" />
                </Button>
                <Button disabled>{nowPage + " pages"}</Button>
                <Button type="primary" disabled={next === ''} onClick={() => nextPage()}>
                  <Icon type="right" />
                </Button>
              </Button.Group>
            </Row> */}
            
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
  setSort: (sort) => dispatch({
    type: 'orders/setSort_r',
    payload: sort,
  }),
  setLimit: (value) => dispatch({
    type: 'orders/setLimit_r',
    payload: value,
  }),
})
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(AllOrders));

