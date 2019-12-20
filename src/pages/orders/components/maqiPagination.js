
import {
    Row,
    Select,
    Button,
    Icon,
} from 'antd';
import { connect } from 'dva';

const { Option } = Select;
//showSizeDefault:每页条目数默认值
class maqiPagination extends React.Component {

    render() {
        const { showSizeDefault, showSizeSelect, onShowSizeChange, nowPage, previousPage, nextPage, previousDisabled, nextDisabled } = this.props;
        const showSizeSelectOption = showSizeSelect.map((item) => { <Option value={item}>{item} 条/页</Option> })
        return (
            <Row type="flex" justify="end">
                <Select
                    style={{ margin: 20 }}
                    defaultValue={showSizeDefault}
                    onChange={
                        (value)=>onShowSizeChange(value)
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

export default connect()(maqiPagination);