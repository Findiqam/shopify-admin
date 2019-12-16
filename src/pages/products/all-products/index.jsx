import { connect } from 'dva';
import {
  Table,

} from 'antd';
class AllProducts extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/getAllProducts'
    });
  }
  render() {
    const { products } = this.props;
    const columns = [
      {
        title: 'Products',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Inventory',
        dataIndex: 'variants',
        key: 'variants',
        render: variants => {
            let inventory=0;
            for(let variant of variants.values()){
                inventory=inventory+ variant.inventory_quantity;
            }
            return inventory+" in stock for "+variants.length+" variants";
        },
      },
      {
        title: 'Vendor',
        dataIndex: 'vendor',
        key: 'vendor',
      },
    ];
    return (
      <>
        <Table columns={columns} dataSource={products} />
      </>
    );
  }
}
const mapStateToProps = ({ products }) => ({
  products: products.allProducts
})
const mapDispatchToProps = (dispatch) => ({
  dispatch:dispatch
})
export default connect(mapStateToProps,mapDispatchToProps)(AllProducts);
