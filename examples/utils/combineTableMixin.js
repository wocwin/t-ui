/**
 * 合计要求
 * tableData是后台返回的数据（this.table.data）
 * code:是显示合计文字列的字段名
 * calcProp:指定求和的列的字段名（指定的列求和必须满足所有数据是number类型）
 */
export default {
  methods: {
    getCurrentSummaries(tableData, code, calcProp = []) {
      let obj = {}
      let retObj = {}
      if (!tableData.length) {
        return
      }
      for (let i = 0; i < tableData.length; i++) {
        const item = tableData[i]
        for (var key in item) {
          if (!obj[key]) obj[key] = []
          obj[key].push(item[key])
        }
      }
      for (const key in obj) {
        if (calcProp.includes(key)) {
          for (let i = 0; i < obj[key].length; i++) {
            const item = obj[key][i]
            if (!retObj[key]) retObj[key] = 0
            retObj[key] += Number(item)
          }
          retObj[key] = retObj[key].toFixed(3)
        }
        if (retObj[key] === 'NaN') {
          retObj[key] = ''
        }
      }
      retObj[code] = '当页合计'
      tableData.push(retObj)
    }
  }
}
