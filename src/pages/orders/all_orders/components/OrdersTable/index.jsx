import { connect } from 'dva';
import {
    Table,
    Row, Col,
    Button,
    Icon,
    Card,
} from 'antd';
import moment from 'moment';
const mapStateToProps = ({ orders, loading }) => ({
    ordersData: orders.ordersData,
    loading: loading.models["orders"],
})
const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch({
        type: 'orders/setOrders_e'
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
export default class OrdersTable extends React.Component {
    componentDidMount() {
        const { getOrders } = this.props;
        getOrders();
    }
    render() {
        const { ordersData, loading, } = this.props;
        const columns = [
            {
                title: 'Order',
                dataIndex: 'name',
                key: 'name',
<<<<<<< HEAD:src/pages/orders/all_orders/components/OrdersTable/index.js
            render: (name,record) => (<Button type="link" onClick={()=>{location.hash="/orders/all_orders/order_details"}}>{name}</Button>)
=======
            render: (name,record) => (<Button type="link" size="small" onClick={()=>{location.hash="/orders/all_orders/order_details"}}>{name}</Button>)
>>>>>>> develop:src/pages/orders/all_orders/components/OrdersTable/index.jsx
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
        return (
            <>
                <Row type="flex" justify="end" style={{ marginBottom: 16 }}>
                    <Col span={3} style={{ marginRight: 24 }}>
                        <Button
                            type="primary"
                            block
                            onClick={
                                () => {
                                    location.hash = "/orders/draft_orders/new"
                                }
                            }
                        >
                            New order <Icon type="plus"></Icon>
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={ordersData}
                    rowSelection={rowSelection}
                    pagination={false}
                    loading={loading}
                />
            </>
        );
    }
}
