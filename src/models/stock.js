import { queryFactory, saveStock, queryStockByFactoryId } from '../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'stock',

  state: {
    list: [],
    loading: true,
    colors: [],
    submitting: false,
  },

  effects: {
    *queryStockByFactory({ payload }, { call, put }) {
      const response = yield call(queryStockByFactoryId, payload.factoryId);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },

    *saveStock({ payload }, { call, put }) {
      const response = yield call(saveStock, payload);
      if (response.statusCode === 200) {
        message.success('合同新增成功.');
        yield put(routerRedux.push('/factory/contract-query'));
      } else {
        message.error(`合同新增失败: ${response.statusCode}`);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    },

  },
};
