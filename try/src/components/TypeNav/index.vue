<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件代理 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件委派和编程式导航实现路由跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 二级、三级 -->
                <div class="item-list clearfix" v-show="currentIndex == index">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//按需引入lodash的throttle节流模块
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕：可以想服务器发请求
  mounted() {
    //当组件挂在完毕，让show属性变为false
    //如果不是Home路由组件。将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数。当使用这个计算属性的时候。右侧函数会立即执行一次
      //注入一个参数state。其实即为大仓库的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //鼠标进入修改响应式数据date里的currentIndex属性
    //throttle节流模块 回调函数不要用箭头
    changeIndex: throttle(function (index) {
      //index:鼠标移上某一个一级分类的元素索引值
      //卡顿现象
      //正常情况（用户慢慢操作）鼠标进入每一个h3都会触发鼠标事件
      //非正常情况（用户操作很快导致浏览器反应不过来）会有部分h3没有触发鼠标事件，
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标移出的事件回调
    leaveIndex() {
      this.currentIndex = -1;
      //当鼠标离开的时候，让商品分类列表进行隐藏
      //判断如果是Seach路由组件才会执行
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      //把子节点当中a标签，加上自定义data-categoryname，其余的子节点是没有的
      let element = event.target;
      //获取到当前触发这个事件的节点可能是{h3、a、dt、dl} 需要带有data-categoryname这样的节点一定是a标签
      //节点有一个属性dataset属性。可以获取节点自定义的属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //整理路由跳转的参数
        let loction = { name: "search" };
        let query = { categoryName: categoryname };
        //一级、二级、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //判断：如果路由跳转的时候有带params参数。需要一起带过去
        if (this.$route.params) {
          loction.params = this.$route.params
          //整理完参数
          loction.query = query;
          //路由跳转
          this.$router.push(loction);
        }
      }
    },
    //当鼠标移入的时候，让商品列表展示
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style  scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            //v-show="currentIndex == index"解决了
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //v-show="currentIndex == index"解决了
          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
      }

      .cur {
        //动态移入绑定样式
        background: skyblue;
      }
    }
    //过度动画的样式
    //过度动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    //过度动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    //定义动画事件、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>