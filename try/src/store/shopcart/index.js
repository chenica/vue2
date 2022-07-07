import { reqCartList, reqDeleteCartById, reqUpdareCheckedByid } from "@/api";
//search模块小仓库
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    },

};
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            commit()
            return Promise.reject()
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdareCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            console.log(commit);
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选状态
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(element => {
            let promise = element.isChecked == 1 ? dispatch('deleteCartListBySkuId', element.skuId) : '';
            PromiseAll.push(promise);
        });
        //只要全部的promis都成功返回结果成功
        return Promise.all(PromiseAll)
    },
    //修改全部产品状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll =[]
        state.cartList[0].cartInfoList.forEach(o=>{
            let promise= dispatch('updateCheckedById',{skuId:o.skuId,isChecked})
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll)
    },





};
//计算属性
//在项目当中getters主要作用是简化 state仓库中的数据
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },


};
export default {
    state,
    mutations,
    actions,
    getters,
};