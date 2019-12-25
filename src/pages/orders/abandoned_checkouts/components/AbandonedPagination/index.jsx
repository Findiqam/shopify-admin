import { connect } from 'dva';
import { MaqiPagination } from '@/pages/orders/components';

const mapStateToProps = ({ abandonedcheckouts, loading }) => ({
    tableData: abandonedcheckouts.tableData,
    pageSize: abandonedcheckouts.limit,
    nowPage: abandonedcheckouts.nowPage,
    previous: abandonedcheckouts.previous,
    next: abandonedcheckouts.next,
    loading: loading.models["abandonedcheckouts"],
})
const mapDispatchToProps = (dispatch) => ({
    getTableData: () => dispatch({
        type: 'abandonedcheckouts/setTableData_e'
    }),
    previousPage: () => dispatch({
        type: 'abandonedcheckouts/previousPage_e'
    }),
    nextPage: () => dispatch({
        type: 'abandonedcheckouts/nextPage_e'
    }),
    setLimit: (value) => dispatch({
        type: 'abandonedcheckouts/setLimit_r',
        payload: value,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
export default class AbandonedPagination extends React.Component {
    render() {
        const { pageSize, nowPage, previous, next, getTableData, previousPage, nextPage, setLimit } = this.props;
        return (
            <MaqiPagination
                showSizeDefault={pageSize}
                showSizeSelect={[5, 10, 15, 20]}
                onShowSizeChange={
                    (value) => {
                        setLimit(value);
                        getTableData();
                    }
                }
                nowPage={nowPage}
                previousPage={previousPage}
                nextPage={nextPage}
                previousDisabled={previous === ''}
                nextDisabled={next === ''}
            />
        )
    }
}
