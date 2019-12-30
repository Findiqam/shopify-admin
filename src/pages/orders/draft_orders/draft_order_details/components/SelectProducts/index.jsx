import { connect } from 'dva';
import {
    Card,
    Input,
    Col, Row,
    Modal,
    List,
    Button,
    Select,
    Table,

} from 'antd';
const InputGroup = Input.Group;
const { Option } = Select;
const { Search } = Input;
const mapStateToProps = ({ draftorderdetails, loading }) => ({
    products: draftorderdetails.products,
    line_items: draftorderdetails.line_items,
    loading: loading.models["draftorderdetails"],
})
const mapDispatchToProps = (dispatch) => ({
    setProducts: () => dispatch({
        type: 'draftorderdetails/setProducts_e',
    }),
    setLineItems: (setLineItems_e) => dispatch({
        type: 'draftorderdetails/setLineItems_r',
        payload: setLineItems_e,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
class SelectProducts extends React.Component {
    state = {
        productsModel_visible: false,
        searchProducts_input: '',
        selectProducts: [],
    }
    open_productsModel = () => {
        this.setState({
            productsModel_visible: true
        })
    }
    close_productsModel = () => {
        this.setState({
            productsModel_visible: false
        })
    }
    render() {
        const { products, loading, setProducts, line_items, setLineItems } = this.props;
        const { selectProducts, searchProducts_input } = this.state;
        return (
            <>
                <Card
                    title="Order details"
                    bordered={false}
                >
                    <InputGroup compact>
                        <Search
                            placeholder="Search products"
                            onSearch={
                                (value) => {
                                    setProducts();
                                    this.setState({
                                        searchProducts_input: value,
                                    })
                                    this.open_productsModel();
                                }
                            }
                            style={{ width: '70%' }}
                        />
                        <Button
                            type='primary'
                            style={{ width: '30%' }}
                            onClick={
                                () => {
                                    setProducts();
                                    this.open_productsModel();
                                }
                            }
                        >
                            Browse products
                        </Button>
                    </InputGroup>
                </Card>
                <Modal
                    title="Select products"
                    okText='Add to order'
                    visible={this.state.productsModel_visible}
                    onOk={
                        () => {
                            this.close_productsModel();
                            setLineItems(selectProducts);
                        }
                    }
                    onCancel={
                        () => {
                            this.close_productsModel();
                        }
                    }
                    destroyOnClose={true}
                    afterClose={
                        () => {
                            this.setState({
                                searchProducts_input: '',
                                selectProducts: [],
                            })
                        }
                    }
                >
                    <Search
                        placeholder="Search products"
                        defaultValue={searchProducts_input}
                        onSearch={
                            (value) => {
                                this.setState({
                                    searchProducts_input: value
                                })
                            }
                        }
                    />
                    <div style={{ height: 380, overflow: 'auto', marginTop: 24 }}>
                        <List
                            bordered
                            loading={loading && products.length === 0}
                            dataSource={products.filter((item) => {
                                const { title } = item;
                                return title.toLowerCase().indexOf(this.state.searchProducts_input.toLowerCase()) >= 0
                            })}
                            renderItem={
                                (item) => {
                                    const { title, variants, image: { src } } = item;
                                    const columns = [
                                        {
                                            title: <Row>
                                                <Col span={3}><img src={src} style={{ width: 40, marginTop: 8 }} /></Col>
                                                <Col span={21}>{title}</Col>
                                            </Row>,
                                            dataIndex: 'title',
                                            key: 'title',
                                            colSpan: 3,
                                            width: 200,
                                            align: 'left',
                                            render: (text, record) => {
                                                if (text === 'Default Title') {
                                                    return title;
                                                }
                                                return text;
                                            }
                                        },
                                        {
                                            title: 'stock',
                                            dataIndex: 'inventory_quantity',
                                            key: 'inventory_quantity',
                                            colSpan: 0,
                                            render: (text, record) => (text + ' in stock')
                                        },
                                        {
                                            title: 'price',
                                            dataIndex: 'price',
                                            key: 'price',
                                            colSpan: 0,
                                            render: (text, record) => ('$' + text)
                                        }
                                    ]
                                    return (
                                        <List.Item style={{ padding: 0 }}>
                                            <Table
                                                style={{ width: '100%' }}
                                                columns={columns}
                                                dataSource={variants}
                                                pagination={false}
                                                rowKey='id'
                                                rowSelection={{
                                                    getCheckboxProps: record => {
                                                        if (line_items.findIndex((item) => (item.id === record.id)) >= 0) {
                                                            return ({
                                                                disabled: true,
                                                            })
                                                        } else {
                                                            return ({
                                                                disabled: false,
                                                            })
                                                        }
                                                    },
                                                    onSelect: (record, selected, selectedRows) => {
                                                        if (selected) {
                                                            selectProducts.push(record);
                                                            this.setState({
                                                                selectProducts: selectProducts
                                                            })
                                                        } else {
                                                            selectProducts.splice(selectProducts.findIndex((item) => (item.id === record.id)), 1)
                                                            this.setState({
                                                                selectProducts: selectProducts
                                                            })
                                                        }
                                                    },
                                                    onSelectAll: (selected, selectedRows, changeRows) => {
                                                        if (selected) {
                                                            this.setState({
                                                                selectProducts: selectProducts.concat(changeRows)
                                                            });
                                                        } else {
                                                            this.setState({
                                                                selectProducts: selectProducts.filter((item) => (item.product_id !== changeRows[0].product_id))
                                                            })
                                                        }
                                                    }
                                                }}
                                            />
                                        </List.Item>
                                    )
                                }
                            }
                        />
                    </div>
                </Modal>
            </>
        );
    }
}

export default SelectProducts;
