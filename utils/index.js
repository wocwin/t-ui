// 下载文件转blod格式
export function downloadFile (data, fileName) {
  if (!data || !fileName) {
    console.log('下载数据解析失败，或者文件名为空')
    return
  }
  // 兼容IE浏览器
  let csvData = new Blob([data], { type: 'text/csv' })
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(csvData, fileName)
  } else {
    // 其他
    // new Blob([data],{type: ''}), 'application/zip' 'application/xlsx' ,类型未知传''
    // 转化文件类型最终以fileName后缀为准 所以blod类型可以不传
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  }
}
