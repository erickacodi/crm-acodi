import {combineReducers} from 'redux';
import products from './products.reducer';
import product from './product.reducer';
import orders from './orders.reducer';
import order from './order.reducer';
import state from './state.reducer';
import interest from './interest.reducer';


const reducer = combineReducers({
    products,
    product,
    orders,
    order,
    state,
    interest
});

export default reducer;
