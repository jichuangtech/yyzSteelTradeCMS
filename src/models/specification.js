import { querySpecification } from '../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'specification',

  state: {
    list: [],
    loading: true,
    colors: [],
    submitting: false,
  },

  effects: {
    *querySpec({ payload }, { call, put }) {
      const response = yield call(querySpecification);
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
