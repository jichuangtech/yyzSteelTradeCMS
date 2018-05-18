import { queryRule, removeRule, addRule, queryGoodsCategories } from '../services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    /**
     * @param state   是目前的状态
     * @param action  是本次要处理的action，其中 action中的 key字段是必须的，其他字段可选
     * {  type: xxx, payload: yyyy }
     * @returns {{data}}
     */
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
