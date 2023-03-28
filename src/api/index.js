// API 统一管理
import request from './request'
import requestMock from './requestMock'

// 三级联动接口管理
//  /api/product/getBaseCategoryList
export const reqCategoryList = () => request.get('/product/getBaseCategoryList')

// 获取 banner 接口
export const reqGetBannerList = () => requestMock.get('/banners')

// 获取 floor 接口
export const reqGetFloorList = () => requestMock.get('/floors')

// 获取 searchList 接口
export const reqGetSearchInfo = (params) =>
  request({ url: '/list', method: 'POST', data: params })

// 获取 detail 商品详情接口
export const reqGetGoodsInfo = (skUid) =>
  request({ url: `/item/${skUid}`, method: 'GET' })

// 加入购物车
export const reqAddOrUpdateGoods = (skUid, skuNum) =>
  request({ url: `/cart/addToCart/${skUid}/${skuNum}`, method: 'POST' })

// 获取购物车列表
export const reqGetCartList = () => request.get('/cart/cartList')

// 删除购物车 /api/cart/deleteCart/{skuId}
export const reqDeleteCartList = (skuId) =>
  request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

// 切换选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqChangeCheckCart = (skuID, isChecked) =>
  request({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'GET' })

// 获取验证码
export const reqGetCode = (phone) =>
  request({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

// 注册用户
export const reqRegister = (params) =>
  request({ url: '/user/passport/register', method: 'POST', data: params })

// 登录 /api/user/passport/login
export const reqLogin = (params) =>
  request({ url: '/user/passport/login', method: 'POST', data: params })

// 登录成功 /api/user/passport/auth/getUserInfo
export const reqUserInfo = () =>
  request({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

// 退出登录 /api/user/passport/logout
export const reqLogout = () =>
  request({ url: '/user/passport/logout', method: 'GET' })

// 订单
export const reqTrade = () =>
  request({ url: '/order/auth/trade', method: 'GET' })

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (params) =>
  request({
    url: `/order/auth/submitOrder?tradeNo=${params.tradeNo}`,
    method: 'POST',
    data: params
  })

// 获取订单信息 /api/payment/weixin/createNative/{orderId}
export const reqGetOrderInfo = (orderId) =>
  request({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

// 支付状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayState = (orderId) =>
  request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

// 订单列表 /api/order/auth/{page}/{limit}
export const reqGetOrderList = (page, limit) =>
  request({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
