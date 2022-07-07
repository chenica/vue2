//引入接口函数
import { reqCategoryList, reqGetBannerList ,reqFloorList } from "@/api";

//search模块小仓库
const state = {
    //srate中数据默认初始值别瞎写。服务器返回对象。服务器返回数组
    categoryList:[],
    //轮播图数据
    bannerList:[],
    //floor数据
    floorList:[],
};
//mutions是唯一修改state的地方
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
// action 用户触发派发action地方 可以写异步数据。自己的需要的逻辑
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }){
           let result = await reqCategoryList();
           if(result.code==200){
              commit("CATEGORYLIST",result.data);
           }
    },
    //获取首页轮播图数据
    async getBannerList({ commit }){
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //获取Floor数据
    async getFloorList({ commit }){
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data);
        }
    }
};
//计算属性
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters,
};