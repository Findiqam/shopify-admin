import { connect } from 'dva';
import {
    Card,
    Row, Col,
    List,
    Avatar,

} from 'antd';

const mapStateToProps = ({ abandonedcheckoutdetails, loading }) => ({
    line_items: abandonedcheckoutdetails.thisDetails.line_items,
    subtotal_price: abandonedcheckoutdetails.thisDetails.subtotal_price,
    total_price: abandonedcheckoutdetails.thisDetails.total_price,
    note: abandonedcheckoutdetails.thisDetails.note,
    loading: loading.models["abandonedcheckoutdetails"],
})
const mapDispatchToProps = (dispatch) => ({

})
@connect(mapStateToProps, mapDispatchToProps)
class CheckoutDetails extends React.Component {

    render() {
        const { line_items, subtotal_price, total_price, note } = this.props;
        return (
            <>
                <Card
                    title="Checkout details"
                    bordered={false}
                >
                    <List
                        dataSource={line_items}
                        renderItem={
                            (item) => (
                                <List.Item
                                    extra={'$' + item.line_price}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar shape="square" size={64} icon="user" />}
                                        title={<a>{item.title}</a>}
                                        description={'SKU:' + item.sku}
                                    />
                                    <div style={{ margin: '50px 50px' }}>{'$' + item.price + ' x ' + item.quantity}</div>
                                </List.Item>
                            )
                        }

                    />
                    <Row>
                        <Col span={18}></Col>
                        <Col span={6}>
                            <Row>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    Subtotal
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    {'$' + subtotal_price}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={11} style={{ textAlign: 'right', fontWeight: 600 }}>
                                    Total
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11} style={{ textAlign: 'right', fontWeight: 600 }}>
                                    {'$' + total_price}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Card
                    title="Additional details"
                    bordered={false}
                >
                    <Row>
                        <Col span={24}>
                            Note
                    </Col>
                        <Col span={24}>
                            {note}
                        </Col>
                    </Row>
                </Card>
            </>
        );
    }
}

export default CheckoutDetails;
