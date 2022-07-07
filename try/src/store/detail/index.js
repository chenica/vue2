//引入接口函数
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid-生产一个随机字符串（有就不能变了）
import {getUUID} from'@/utils/uuid_token'

//search模块小仓库
const state = {
    goodsInfo: {},
uuid_token:getUUID(),
};
//mutions是唯一修改state的地方
const mutations = {
    GOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    },

};
// action 用户触发派发action地方 可以写异步数据。自己的需要的逻辑
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GOODSINFO", result.data);
        }
    },
    async addOrUpdateShopCart({ commit },{ skuId, skuNum }) {
        //加入购物车以后返回的解析
        //加入购物车以后（发请求）前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据。只返回code==200表示成功
        //因为服务器没有返回其他数据 所有不用存储
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return 'ok'
        } else {
            commit();
            return Promise.reject(); 
            
        }

       
    },


};
//计算属性
const getters = {
    //路径导航简化
    categoryView(state) {
        //当数据没回来时会报错，所以给一个空对象让categoryView.category1Id不会
        return state.goodsInfo.categoryView || {}
    },
    //简化产品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
};