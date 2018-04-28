import { queryFactoryById } from '../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

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
  },

  effects: {
    *refreshSelectInfo({ payload }, { call, put }) {
      const response = yield call(queryFactoryById, payload.factoryId);
      // alert("refreshSelectInfo response: " + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
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

  },
};
