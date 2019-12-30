import { connect } from 'dva';
import {
    Card,
    Row, Col,
    List,
    Avatar,
    Input,
    InputNumber,
    Button,
    Icon,
} from 'antd';
const { TextArea } = Input;
const mapStateToProps = ({ draftorderdetails, loading }) => ({
    line_items: draftorderdetails.line_items,
    note: draftorderdetails.note,
    loading: loading.models["draftorderdetails"],
})
const mapDispatchToProps = (dispatch) => ({
    setLineItemsQuantity: (item) => dispatch({
        type: 'draftorderdetails/setLineItemsQuantity_e',
        payload: item,
    }),
    removeItem: (id) => dispatch({
        type: 'draftorderdetails/removeItem_e',
        payload: id,
    }),
    setNote: (note) => dispatch({
        type: 'draftorderdetails/setNote_r',
        payload: note,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
class LineItems extends React.Component {

    render() {
        const { line_items, note, loading, setLineItemsQuantity, removeItem, setNote } = this.props;
        return (
            <>
                <Card bordered={false}>
                    <List
                        dataSource={line_items}
                        renderItem={
                            (item) => (
                                <List.Item
                                    extra={
                                        <Button
                                            type="danger"
                                            shape="circle"
                                            onClick={
                                                () => {
                                                    removeItem(item.id);
                                                }
                                            }
                                        >
                                            <Icon type="close" />
                                        </Button>
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<img src={item.image_src} style={{ width: 50 }} />}
                                        title={<a>{item.product_title}</a>}
                                        description={
                                            <>
                                                <div>{item.title}</div>
                                                <div>SKU: {item.sku}</div>
                                            </>
                                        }
                                    />
                                    <div style={{ margin: '48px 48px', width: 240 }}>
                                        {'$' + item.price + ' x '}
                                        <InputNumber
                                            style={{ marginRight: 40 }}
                                            min={1}
                                            max={10}
                                            step={1}
                                            defaultValue={item.quantity}
                                            onChange={
                                                (value) => {
                                                    setLineItemsQuantity({
                                                        id: item.id,
                                                        quantity: value,
                                                    });
                                                }
                                            } />
                                        {'$' + (item.price * item.quantity).toFixed(2)}
                                    </div>
                                </List.Item>
                            )
                        }

                    />
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col span={24}>
                                    Notes
                            </Col>
                                <Col span={24}>
                                    <TextArea
                                        id="noteTextArea"
                                        rows={2}
                                        defaultValue={note}
                                        onChange={
                                            (e) => {
                                                setNote(document.getElementById('noteTextArea').value)
                                            }
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}></Col>
                        <Col span={6}>
                            <Row>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    Add discount
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    --
                            </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    Subtotal
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    {'$' + line_items.reduce((amount, { price, quantity }) => price * quantity + amount, 0).toFixed(2)}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    Add shipping
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    --
                            </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    Taxes
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11} style={{ textAlign: 'right' }}>
                                    {'$' + 0.00.toFixed(2)}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={11} style={{ textAlign: 'right', fontWeight: 600 }}>
                                    Total
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11} style={{ textAlign: 'right', fontWeight: 600 }}>
                                    {'$' + line_items.reduce((amount, { price, quantity }) => price * quantity + amount, 0).toFixed(2)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </>
        );
    }
}

export default LineItems;
