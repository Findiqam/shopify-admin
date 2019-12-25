import {
    Row,
    Select,
    Button,
    Icon,
} from 'antd';
const { Option } = Select;

export class MaqiPagination extends React.Component {
    render() {
        //showSizeDefault:每页条目数默认值
        //showSizeSelect:每页条目数数组
        //onShowSizeChange:当每页条目数改变时触发；@param:value(value参数为改变后的值)
        //nowPage:当前页
        //previousPage:点击上一页触发的函数
        //nextPage:点击下一页触发的函数
        //previousDisabled:上一页是否可以点击
        //nextDisabled:下一页是否可以点击
        const { showSizeDefault, showSizeSelect, onShowSizeChange, nowPage, previousPage, nextPage, previousDisabled, nextDisabled } = this.props;
        const showSizeSelectOption = showSizeSelect.map((item, key) => (<Option value={item} key={key}>{item} 条/页</Option>))
        return (
            <Row type="flex" justify="end">
                <Select
                    style={{ margin: 20 }}
                    defaultValue={showSizeDefault}
                    onChange={
                        (value) => onShowSizeChange(value)
                    }
                >
                    {showSizeSelectOption}
                </Select>
                <Button.Group style={{ margin: 20 }}>
                    <Button type="primary" disabled={previousDisabled} onClick={() => previousPage()}>
                        <Icon type="left" />
                    </Button>
                    <Button disabled>{nowPage + " pages"}</Button>
                    <Button type="primary" disabled={nextDisabled} onClick={() => nextPage()}>
                        <Icon type="right" />
                    </Button>
                </Button.Group>
            </Row>
        )
    }
}