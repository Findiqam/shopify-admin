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
} from 'antd';
const mapStateToProps = ({ orderdetails, loading }) => ({
    fulfilled: orderdetails.fulfilled,
})
const mapDispatchToProps = (dispatch) => ({
})
@connect(mapStateToProps, mapDispatchToProps)
class Fulfilled extends React.Component {
    render() {
        const { fulfilled } = this.props;
        return (
            <>
                {fulfilled.length === 0 ? <></> :
                    <Card
                        title={"Fulfilled(" + fulfilled.length + ')'}
                        bordered={false}
                    >
                        <List
                            dataSource={fulfilled}
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

export default Form.create()(Fulfilled);