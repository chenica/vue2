import { reqGetSearchInfo } from "@/api";
//search模块小仓库
const state = {
        searchList: {},
        ce:['hh','ss'],
};
const mutations = {
        GETSEARCHLIST(state, searchList) {
                state.searchList = searchList;
        },
        // jia(commit) {
        //         commit.ce.push('ll')   
        //         console.log(commit);         
        // }
};
const actions = {

        //获取search模块数据
        async getSearchList({ commit }, params = {}) {
                //当前这个接口。给服务器传递参数params，至少是一个空对象 reqGetSearchInfo()
                //params形参，是当派发action的时候，第二个参数传递过来的至少是一个空对象
                let result = await reqGetSearchInfo(params);
                if (result.code == 200) {
                        commit('GETSEARCHLIST', result.data);
                }
                
        },
      
};
//计算属性
//在项目当中getters主要作用是简化 state仓库中的数据
const getters = {
        //当前形参state是当前仓库state 并不是大仓库的state
        goodsList(state) {
                //假如没网络没有获取到数据 可以返回一个数组
                return state.searchList.goodsList || []
        },
        attrsList(state) {
                return state.searchList.attrsList 
        },
        trademarkList(state) {
                return state.searchList.trademarkList 
        },
       
       
};
export default {
        state,
        mutations,
        actions,
        getters,
};