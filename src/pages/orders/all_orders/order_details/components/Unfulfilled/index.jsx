import { connect } from 'dva';
import {
    Card,
    Avatar,
    Row, Col,
    Icon,
    Button,
    Modal,
    Form,
    Input,
    List,

} from 'antd';
const mapStateToProps = ({ orderdetails, loading }) => ({
    unfulfilled: orderdetails.unfulfilled,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class Unfulfilled extends React.Component {
    render() {
        const { unfulfilled } = this.props;
        return (
            <>
                {unfulfilled.length === 0 ? <></> :
                    <Card
                        title={"Unfulfilled(" + unfulfilled.length + ')'}
                        bordered={false}
                    >
                        <List
                            dataSource={unfulfilled}
                            renderItem={
                                (item) => (
                                    <List.Item
                                        extra={'$' + (item.price * item.quantity).toFixed(2)}
                                    >
                                        <List.Item.Meta
                                            avatar={<img src={item.image_src} style={{ width: 50 }} />}
                                            title={<a>{item.title}</a>}
                                            description={
                                                <>
                                                    <div>{item.variant_title}</div>
                                                    <div>SKU: {item.sku}</div>
                                                </>
                                            }
                                        />
                                        <div style={{ margin: '48px 48px', width: 240 }}>
                                            {'$' + item.price + ' x ' + item.quantity}

                                        </div>
                                    </List.Item>
                                )
                            }
                        />
                    </Card>
                }
            </>
        )
    }
}

export default Form.create()(Unfulfilled);