import request from "../utils/request.js";
const ENV = require('./../.env.js')

// 用户-------------------
// 登录 
export function login(data) {
	return request.post("user/login", data);
}

// 商品-------------------
// 获取仓库列表
export function findDepotByCurrentUser(data) {
	return request.get("third/invenbtory/findDepotByCurrentUser", data);
}
// 获取所有结算账户
export function getAccount(data) {
	return request.get("third/invenbtory/getAccount", data);
}

// 获取所有会员
export function getorganList(data) {
	return request.post("supplier/findBySelect_retail", data);
}

// 获取单据明细列表
export function getHeadList(data) {
	return request.post("third/invenbtory/getHeadListByPage", data);
}
// 获取商品列表
// number
export function getOrderInfo(data) {
	return request.get("third/invenbtory/getDetailByNumber", data);
}
// 获取商品列表
// 【depotId】、【page】、【rows】、【q】q字段为搜索条件包括 条码、名称、规格、颜色【categoryId】类别ID
export function getGoodsList(data) {
	return request.get("third/invenbtory/findCategoryBySelect", data);
}
// 单据编号生成接口
export function buildNumber(data) {
	return request.get("third/invenbtory/buildNumber", data);
}
// 商品零售
export function addDepotHeadAndDetail(data) {
	return request.post("third/invenbtory/addDepotHeadAndDetail", data);
}
// 查询扫码支付结果
export function queryPayStaus(data) {
	return request.post("pay/queryPayStaus", data);
}
// 退货
export function chargebackHead(data) {
	return request.post("third/invenbtory/chargebackHead", data);
}

// 获取广告列表
export function getAdvertisingByAreaCode(data) {
	return request.get("advertising/getAdvertisingByAreaCode", data);
}
// 获取活动列表
export function getActivitiesByAreaCode(data) {
	return request.get("activities/getActivitiesByAreaCode", data);
}

// 商品报废
export function addScrapped(data) {
	return request.post("discard/addDiscardMaterial", data);
}
// 商品报废记录列表
export function scrappedList(data) {
	return request.post("discard", data);
}
