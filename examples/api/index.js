import request from '@/utils/request'

// 数据字典-查询 all查询全部
export const getDicts = (dictType) => { return request({ url: `/system/dict/data/dictType/${dictType}`, method: 'GET' }) }

export default {
  getDicts
}
