import { getSlider } from '../api/public.js';
import { SET_SLIDERS, CREATE_WEBSOCKET, SET_MESSAGE } from './action-types';

export default {
  state: {
    sliders: [],
    ws: null,
    message: '',
  },
  mutations: {
    [SET_SLIDERS](state, payload) {
      state.sliders = payload;
    },
    [CREATE_WEBSOCKET](state, ws) {
      state.ws = ws;
    },
    [SET_MESSAGE](state, msg) {
      state.message = msg;
    }
  },
  actions: {
    async [SET_SLIDERS]({ commit }) {
      let { data } = await getSlider();
      commit(SET_SLIDERS, data);
    },
    async [CREATE_WEBSOCKET]({ commit }) {
      // let ws = new WS();
    }
  },
}