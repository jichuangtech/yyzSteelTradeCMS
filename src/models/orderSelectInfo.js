import {queryFactoryById, queryCar, queryCustomer} from '../services/api';
import {message} from 'antd';
import {routerRedux} from 'dva/router';

/**
 *
 */
export default {
  namespace: 'orderSelectInfo',

  state: {
    list: [],
    loading: true,
    colors: [],
    submitting: false,
    contractList: [],
    specificationList: [],
    factoryName: "",
    carId: -1,
    carList: [],
    customerId: -1,
    customerLis: [],
    testCount: 2,
  },

  effects: {
    *refreshTestCountAsync({ payload }, { call, put, select }) {
       const count = yield select( state => state.orderSelectInfo.testCount);
       yield put({
         type: 'refreshTestCount',
         testCount: count + 1,
       });
    },

    *refreshSelectInfo({payload}, {call, put}) {
      const response = yield call(queryFactoryById, payload.factoryId);
      // alert("refreshSelectInfo response: " + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response.data,
      });
    },

    *refreshCarInfo({payload}, {call, put}) {
      const response = yield call(queryCar);
      yield put({
        type: 'saveCar',
        payload: response.data,
      });
    },

    *refreshCustomerInfo({payload}, {call, put}) {
      const response = yield call(queryCustomer);
      yield put({
        type: 'saveCustomer',
        payload: response.data,
      });
    },

  },

  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {

        message.info(" pathname: " + pathname);
      });
    },
  },

  reducers: {
    refreshTestCount(state, action) {
      return {
        ...state,
        testCount: action.testCount,
      };
    },

    save(state, action) {
      return {
        ...state,
        list: action.payload,
        loading: false,
        contractList: action.payload.stockList,
        specificationList: action.payload.specList,
        factoryName: action.payload.name,
      };
    },

    saveCar(state, action) {
      let defId = -1;
      if (action.payload != null && action.payload.length > 0) {
        defId = action.payload[0].id;
      }
      return {
        ...state,
        carList: action.payload,
        carId: defId,
        loading: false,
      };
    },

    saveCustomer(state, action) {
      let defId = -1;
      if (action.payload != null && action.payload.length > 0) {
        defId = action.payload[0].id;
      }
      return {
        ...state,
        customerLis: action.payload,
        customerId: defId,
        loading: false,
      };
    },

  },
};
