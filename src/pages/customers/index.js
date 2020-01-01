import { Table, Button, Row, Col, Card, Input, Select, Form } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { connect } from 'dva';
const { Search } = Input;
const { Option } = Select;

class Customers extends Component {
  state = {
    name: undefined,
  };
  handleChange = value => {
    this.setState({
      name: value,
    });
    console.log(value);
  };
  componentDidMount() {
    const { get_Customers } = this.props;
    get_Customers();
  }
  handleSubmit(e) {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values); // values即为表单键值对，可以直接异步请求

        e.preventDefault();
      } else {
        e.preventDefault();
      }
    });
  }
  render() {
    const selectBefore = (
      <Select defaultValue="请选择过滤方式" onChange={value => this.handleChange(value)}>
        <Option value="name">名字</Option>
        <Option value="orders_count">订单数量</Option>
      </Select>
    );
    const {
      customers,
      setFilter,
      get_Customers,
      get_Customers_name,
      resetFilter,
      loading,
    } = this.props;
    // const { first_name, default_address, orders_count, total_spent, } = customers;
    // const {   } = default_address;
    const { resetFields } = this.props.form;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    const columns = [
      {
        title: '名字',
        dataIndex: 'first_name',
        key: 'name',
        render: (text, record) => record.first_name + ' ' + record.last_name,
      },
      {
        title: '地址',
        // dataIndex: 'default_address',
        // key: 'default_address',
        render: (text, record, index) => {
          if (record.default_address) {
            return record.default_address.province + '' + record.default_address.city;
          } else {
            return null;
          }
        },
      },
      {
        title: '订单数量',
        dataIndex: 'orders_count',
        key: 'orders_count',
        render: (text, record, index) => text,
      },
      {
        title: '订单总价',
        dataIndex: 'total_spent',
        key: 'total_spent',
        render: (text, record, index) => '￥' + text,
      },
    ];
    return (
      <PageHeaderWrapper>
        <Card>
          <Row type="flex">
            <Col span={1} order={3} offset={12}>
              <Button
                onClick={() => {
                  location.hash = '#/customers/Addcustomers';
                }}
              >
                添加客户
              </Button>
            </Col>
            <Col span={8} order={1}>
              <Search
                addonBefore={selectBefore}
                allowClear
                onSearch={value => {
                  if (this.state.name == 'name') {
                    setFilter({ name: this.state.name, value });
                    get_Customers_name();
                  } else {
                    setFilter({ name: this.state.name, value });
                    get_Customers();
                  }
                }}
              />
            </Col>
            <Col order={2}>
              <Button
                onClick={() => {
                  resetFilter(), get_Customers(), resetFields(Search);
                }}
              >
                重置
              </Button>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={customers}
            rowSelection={rowSelection}
            loading={loading}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
const mapStateToProps = ({ customers, loading }) => ({
  customers: customers.Customers,
  loading: loading.models['customers'],
});

const mapDispatchToProps = dispatch => ({
  get_Customers: () =>
    dispatch({
      type: 'customers/fetch',
    }),
  get_Customers_name: () =>
    dispatch({
      type: 'customers/byname',
    }),
  setFilter: filter =>
    dispatch({
      type: 'customers/query_Customers',
      payload: filter,
    }),
  resetFilter: () =>
    dispatch({
      type: 'customers/resetFilter',
    }),
});
Customers = Form.create()(Customers);
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
