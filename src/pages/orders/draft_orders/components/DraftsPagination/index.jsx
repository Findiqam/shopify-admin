import { connect } from 'dva';
import { MaqiPagination } from '@/pages/orders/components';

const mapStateToProps = ({ drafts, loading }) => ({
    draftsData: drafts.draftsData,
    pageSize: drafts.limit,
    nowPage: drafts.nowPage,
    previous: drafts.previous,
    next: drafts.next,
    loading: loading.models["drafts"],
})
const mapDispatchToProps = (dispatch) => ({
    getDrafts: () => dispatch({
        type: 'drafts/setDrafts_e'
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
        const { pageSize, nowPage, previous, next, getDrafts, previousPage, nextPage, setLimit } = this.props;
        return (
            <MaqiPagination
                showSizeDefault={pageSize}
                showSizeSelect={[5, 10, 15, 20]}
                onShowSizeChange={
                    (value) => {
                        setLimit(value);
                        getDrafts();
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
