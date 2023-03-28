// 引入 mockjs 模块
import Mock from 'mockjs'
// 引入 json 文件，json 文件默认对外暴露
import banners from './banners.json'
import floors from './floors.json'

// mock 数据：第一个参数为请求地址，第二个参数为请求数据
Mock.mock('/mock/banners', { code: 200, data: banners })
Mock.mock('/mock/floors', { code: 200, data: floors })
