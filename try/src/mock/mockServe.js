//先引入 mockjs 模块
import Mock from 'mockjs';
//把json数据格式引入 
//json没有暴露但是可以引入 因为webpack 默认对外暴露的：图片、json数据格式
import banner from  './banner.json';
import floor  from  './floor.json';
//mock数据:第一个参数请求地址  第二个参数请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大轮播图数据
Mock.mock("/mock/floor",{code:200,data:floor});