const appId = "wxf3ec55152da7afbe";
const secret = "05f3bc082143f52cff9f8daadc6924e6";
import {
  getToken,
  setToken
} from '../../utils/auth.js'
import {
  getStorage,setStorage
} from '../../utils/storage.js'
import { login } from '../../api/common';
export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    openId: getStorage('openId') || '',
  },
  mutations: {
    SET_TOKEN(state, value) {
      state.token = value;
      setToken(value);
    },
    SET_OPEN_ID(state, value) {
      state.openId = value;
      setStorage('openId', value);
    },
    /**
     * @param {array} value
     */
    changeParticipant(state, value) {
      const {
        participant
      } = state;
      // 清空数据
      if (!value) {
        state.participant = [];
        return;
      }
    }
  },
  actions: {
    //  登录用户 获取token和 openId
    loginUser({
      commit, state
    }) {
      return new Promise((resolve, reject) => {
        uni.$customAPI('login', { provider: 'weixin'}).then((res) => {
          const data = {
            appid: appId, //微信小程序唯一标识,可不传,不传则为后端默认
            secret: secret, //微信小程序 secret,可不传,不传则为后端默认
            code: res.code, //登录code，小程序通过wx.login方法获得
            grantType: '' // 可以不用传,授权类型，值为 authorization_code
          };
          login(data).then(result => {
            commit('SET_TOKEN', result.accessToken);
            commit('SET_OPEN_ID', result.openId);
            resolve(result)
          }).catch(e => {
             reject(e)
          })
        })   
      })

    }
  }
};