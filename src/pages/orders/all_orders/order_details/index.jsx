import { connect } from 'dva';
import {
  Table,
  Card,
  Row, Col,

} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const mapStateToProps = ({ orderdetails, loading }) => ({
  loading: loading.models["orderdetails"],
})
const mapDispatchToProps = (dispatch) => ({
  setDetails: () => dispatch({
    type: 'orderdetails/setDetails_e',
  }),
})
@connect(mapStateToProps, mapDispatchToProps)
class OrderDetails extends React.Component {
  componentDidMount() {
    const { setDetails } = this.props;
    setDetails();
  }
  render() {

    return (
      <>
        <PageHeaderWrapper
          onBack={
            () => {
              location.hash = '/orders/all_orders';
            }
          }
        >
          <Card>
            <Row>
              <Col span={17}>
                <Card>

                </Card>
              </Col>
              <Col span={7}>
                <Card>

                </Card>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }
}
export default OrderDetails;
