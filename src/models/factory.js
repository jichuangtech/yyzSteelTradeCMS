import { queryFactory } from '../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'factory',

  state: {
    list: [],
    loading: true,
    colors: [],
    submitting: false,
  },

  effects: {
    *queryFactory({ payload }, { call, put }) {
      const response = yield call(queryFactory);
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
      };
    },

  },
};
