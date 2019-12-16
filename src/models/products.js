import { queryAllProducts } from '@/services/shopify';

const ProductsModel = {
    namespace: 'products',
    state: {
        allProducts:[]
    },
    effects:{
        *getAllProducts(action, { call, put }){
            const response = yield call(queryAllProducts);
            yield put({
                type:'setAllProducts',
                payload:response.products
            })
        }
    },
    reducers:{
        setAllProducts(state, action){
            return {
                ...state,
                allProducts:action.payload
            }
        }
    }
}

export default ProductsModel;