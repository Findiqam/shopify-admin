import { connect } from 'dva';
import { MaqiPagination } from '@/pages/orders/components';

const mapStateToProps = ({ drafts, loading }) => ({
    tableData: drafts.tableData,
    pageSize: drafts.limit,
    nowPage: drafts.nowPage,
    previous: drafts.previous,
    next: drafts.next,
    loading: loading.models["drafts"],
})
const mapDispatchToProps = (dispatch) => ({
    getTableData: () => dispatch({
        type: 'drafts/setTableData_e'
    }),
    previousPage: () => dispatch({
        type: 'drafts/previousPage_e'
    }),
    nextPage: () => dispatch({
        type: 'drafts/nextPage_e'
    }),
    setLimit: (value) => dispatch({
        type: 'drafts/setLimit_r',
        payload: value,
    }),
})
@connect(mapStateToProps, mapDispatchToProps)
export default class DraftsPagination extends React.Component {
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
