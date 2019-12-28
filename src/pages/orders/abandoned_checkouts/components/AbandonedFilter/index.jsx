
import { connect } from 'dva';
import {
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
import moment from 'moment';
const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

class DateTimeAt extends React.Component {
    render() {
        const { onChange, value, screenOnClick, } = this.props;
        return (
            <InputGroup compact>
                <Select
                    value={value.name}
                    onChange={
                        nameValue => {
                            if (onChange) {
                                onChange({
                                    ...value,
                                    name: nameValue,
                                })
                            }
                        }
                    }
                >
                    <Option value="_min">After</Option>
                    <Option value="_max">Before</Option>
                </Select>
                <DatePicker
                    format='YYYY-MM-DD'
                    value={value.udate}

                    onChange={
                        (d, dstr) => {
                            if (onChange) {
                                if (dstr === "") {
                                    onChange({
                                        ...value,
                                        udate: dstr,
                                    })
                                } else {
                                    onChange({
                                        ...value,
                                        udate: moment(dstr, "YYYY-MM-DD"),
                                    })
                                }
                            };
                        }
                    }
                />
                <TimePicker
                    format='HH:mm:ss'
                    value={value.utime}
                    onChange={
                        (t, tstr) => {
                            if (onChange) {
                                if (tstr === "") {
                                    onChange({
                                        ...value,
                                        utime: moment("00:00:00", "hh:mm:ss"),
                                    })
                                } else {
                                    onChange({
                                        ...value,
                                        utime: moment(tstr, "hh:mm:ss"),
                                    })
                                }
                            };
                        }
                    }
                />
                <Button
                    type="primary"
                    onClick={
                        () => {
                            screenOnClick();
                        }
                    }
                >
                    Screen
                </Button>
            </InputGroup>
        )
    }
}



const mapStateToProps = ({ abandonedcheckouts, loading }) => ({
    filter: abandonedcheckouts.filter,
    // loading: loading.models["abandonedcheckouts"],
})
const mapDispatchToProps = (dispatch) => ({
    getTableData: () => dispatch({
        type: 'abandonedcheckouts/setTableData_e'
    }),
    setFilter: (filter) => dispatch({
        type: 'abandonedcheckouts/setFilter_e',
        payload: filter
    }),
    resetFilter: () => dispatch({
        type: 'abandonedcheckouts/resetFilter_r'
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
class AbandonedFilter extends React.Component {
    render() {
        const { filter, loading, getTableData, setFilter, resetFilter, } = this.props;
        const { getFieldDecorator, getFieldValue, resetFields, } = this.props.form;
        const status_SelectValues = ["Any", "Open", "Closed",];
        const status_SelectOptions = status_SelectValues.map((item, key) => (<Option value={item.toLowerCase()} key={key}>{item}</Option>));

        return (
            <Card
                bodyStyle={{ paddingBottom: 0 }}
                bordered={false}
                title="Filter"
                extra={
                    <Tooltip title="重置所有过滤选项">
                        <Button
                            size="small"
                            onClick={
                                () => {
                                    resetFilter();
                                    resetFields();
                                    getTableData();
                                }
                            }
                        >
                            All reset
                        </Button>
                    </Tooltip>
                }
            >
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={4}>
                            <Form.Item label={<Tooltip title="根据订单的状态进行筛选">Status</Tooltip>}>
                                <Select
                                    defaultValue="any"
                                    value={filter.status}
                                    onChange={
                                        (value) => {
                                            setFilter({ name: "status", value });
                                            getTableData();
                                        }
                                    }
                                >
                                    {status_SelectOptions}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label={<Tooltip title="创建时间在该时间之前/之后的订单">Created at or</Tooltip>}>
                                {
                                    getFieldDecorator(
                                        'created_at',
                                        {
                                            initialValue: {
                                                name: '_min',
                                                udate: "",
                                                utime: moment("00:00:00", "hh:mm:ss"),
                                            }
                                        }
                                    )(
                                        <DateTimeAt screenOnClick={
                                            () => {
                                                const created_at = getFieldValue('created_at');
                                                const created_at_date = moment(created_at.udate).format("YYYY-MM-DD");
                                                const created_at_time = moment(created_at.utime).format("hh:mm:ss");
                                                let created_at_value = moment(created_at_date + " " + created_at_time).format();
                                                if (created_at_value === "Invalid date") {
                                                    created_at_value = '';
                                                }
                                                setFilter({ name: 'created_at' + created_at.name, value: created_at_value });
                                                getTableData();
                                            }
                                        }
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label={<Tooltip title="更新时间在该时间之前/之后的订单">Updated at or</Tooltip>}>
                                {
                                    getFieldDecorator(
                                        'updated_at',
                                        {
                                            initialValue: {
                                                name: '_min',
                                                udate: "",
                                                utime: moment("00:00:00", "hh:mm:ss"),
                                            }
                                        }
                                    )(
                                        <DateTimeAt screenOnClick={
                                            () => {
                                                const updated_at = getFieldValue('updated_at');
                                                const updated_at_date = moment(updated_at.udate).format("YYYY-MM-DD");
                                                const updated_at_time = moment(updated_at.utime).format("hh:mm:ss");
                                                let updated_at_value = moment(updated_at_date + " " + updated_at_time).format();
                                                if (updated_at_value === "Invalid date") {
                                                    updated_at_value = '';
                                                }
                                                setFilter({ name: 'updated_at' + updated_at.name, value: updated_at_value });
                                                getTableData();
                                            }
                                        }
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(AbandonedFilter);