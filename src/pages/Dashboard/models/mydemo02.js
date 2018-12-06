import { mydemoInfo, availableOrgs } from '@/services/mydemo02';

export default {
  namespace: 'mydemo02',

  state: {
    list: [],
    orgs: [],
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(mydemoInfo, payload);
      yield put({
        type: 'getList',
        payload: response,
      });
    },
    *availableOrgs({ payload }, { call, put }) {
      const response = yield call(availableOrgs, payload);
      yield put({
        type: 'orgList',
        payload: response || [],
      });
    },
  },

  reducers: {
    getList(state, action) {
      const datalist = action.payload;
      return {
        ...state,
        list: datalist,
      };
    },
    orgList(state, action) {
      return {
        ...state,
        orgs: action.payload,
      };
    },
  },
};
