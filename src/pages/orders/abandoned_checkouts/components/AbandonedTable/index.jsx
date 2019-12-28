import { connect } from 'dva';
import {
    Table,
    Row, Col,
    Button,
    Icon,
    Card,
    Tooltip,
    Tag,

} from 'antd';
import moment from 'moment';
const mapStateToProps = ({ abandonedcheckouts, loading }) => ({
    tableData: abandonedcheckouts.tableData,
    loading: loading.models["abandonedcheckouts"],
})
const mapDispatchToProps = (dispatch) => ({
    getTableData: () => dispatch({
        type: 'abandonedcheckouts/setTableData_e'
    }),
    setDetails: (details) => dispatch({
        type: 'abandonedcheckouts/setDetails_r',
        payload: details,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
export default class AbandonedTable extends React.Component {
    componentDidMount() {
        const { getTableData } = this.props;
        getTableData();
    }
    render() {
        const { tableData, loading, setDetails, } = this.props;
        const columns = [
            {
                title: 'Checkout',
                dataIndex: 'name',
                key: 'name',
                render: (name, record) => (
                    <>
                        {record.closed_at !== null ? <Tooltip title="This order has been closed"><Icon type="folder" theme="filled" /></Tooltip> : <Tooltip title="This order is open"><Icon type="folder-open" /></Tooltip>}
                        <Button
                            type="link"
                            size="small"
                            onClick={
                                () => {
                                    setDetails(record);
                                    location.hash = "/orders/abandoned_checkouts/abandoned_checkouts_details";
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
                dataIndex: 'created_at',
                key: 'created_at',
                render: created_at => (moment(created_at).format("YYYY-MM-DD HH:mm:ss"))
            },
            {
                title: 'Placed by',
                dataIndex: 'customer',
                key: 'customer',
                render: customer => (customer ? customer.first_name + " " + customer.last_name : "没有客户"),
            },
            {
                title: 'Email Status',
                dataIndex: 'email',
                key: 'email',
                render: email => (email ? email : <Tag color='orange'>Not Sent</Tag>),
            },
            {
                title: 'Recovery Status',
                dataIndex: 'abandoned_checkout_url',
                key: 'abandoned_checkout_url',
                render: abandoned_checkout_url => (abandoned_checkout_url === "" ? 'Recovered' : <Tag color='orange'>Not Recovered</Tag>)
            },
            {
                title: 'Total',
                dataIndex: 'subtotal_price',
                key: 'subtotal_price',
                render: subtotal_price => ('$' + subtotal_price),
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