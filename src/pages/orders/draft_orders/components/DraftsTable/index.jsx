import { connect } from 'dva';
import {
    Table,
    Row, Col,
    Button,
    Icon,
    Card,
    Tooltip,
} from 'antd';
import moment from 'moment';
const mapStateToProps = ({ drafts, loading }) => ({
    tableData: drafts.tableData,
    loading: loading.models["drafts"],
})
const mapDispatchToProps = (dispatch) => ({
    getTableData: () => dispatch({
        type: 'drafts/setTableData_e'
    }),
    setDetails: (details) => dispatch({
        type: 'drafts/setDetails_r',
        payload: details,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
export default class DraftsTable extends React.Component {
    componentDidMount() {
        const { getTableData } = this.props;
        getTableData();
    }
    render() {
        const { tableData, loading, setDetails, } = this.props;
        const columns = [
            {
                title: 'Draft',
                dataIndex: 'name',
                key: 'name',
                render: (name, record) => (
                    <>
                        <Button
                            type="link"
                            size="small"
                            onClick={
                                () => {
                                    setDetails(record.id);
                                    location.hash = "/orders/draft_orders/draft_order_details";
                                }
                            }
                        >
                            {name}
                        </Button>
                        {record.note !== null && record.note !== "" && <Tooltip title="This order has notes"><Icon type="file-text" /></Tooltip>}
                    </>
                )
            },
            {
                title: 'Date',
                dataIndex: 'updated_at',
                key: 'updated_at',
                render: updated_at => (moment(updated_at).format("YYYY-MM-DD HH:mm:ss"))
            },
            {
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
                render: customer => (customer ? customer.first_name + " " + customer.last_name : "没有客户"),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Total',
                dataIndex: 'subtotal_price',
                key: 'subtotal_price',
                render: subtotal_price => ('$' + subtotal_price)
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
                    dataSource={tableData}
                    rowSelection={rowSelection}
                    rowKey={record => record.id}
                    pagination={false}
                    loading={loading}
                />
            </>
        )
    }
}