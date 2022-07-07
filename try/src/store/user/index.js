//登录与注册
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userIofo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userIofo) {
        state.userIofo = userIofo
    },
    CLEAR(state) {
        state.token = '';
        state.userIofo = {};
        localStorage.removeItem('TOKEN')
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码的接口把验证码返回了。正常情况验证码是返回给手机号（省钱）
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        //获取验证码的接口把验证码返回了。正常情况验证码是返回给手机号（省钱）
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            commit
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务{token令牌}确认唯一标识
    async userLogin({ commit }, data) {
        //获取验证码的接口把验证码返回了。正常情况验证码是返回给手机号（省钱）
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit(('USERLOGIN'), result.data.token);
            //持久化存储token
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit(('GETUSERINFO'), result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //只是向服务器发一次请求。通知服务器清楚token
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },



};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters,
};