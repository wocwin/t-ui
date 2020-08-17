# TInputSearch简单使用(v1.0.0)

## 1. 简介
  TInputSearch 输入即时查询，下拉列表选中数据

## 2. 结构
  #####2.1 用法示例
  ```
                <select-ent
                  @inputChange="entChange"
                  @clickItem="selectItem"
                  ref="selectEnts"
                  :data="dataList"
                ></select-ent>

                
  ```
            
#####2.3 业务代码中方法示例：
  ```
  @uploadSuccess=
  @deleteSuccess=
  setKey=
  这三个字段结合使用保持上传、删除实时更新业务代码中的绑定属性(TODO:用一个属性功能代替三个)

methods: {
    ...
    // 输入时，触发的回调，这里可以做一些异步查询
    entChange (val, type) {
      setTimeout(() => {
        this.dataList = {
          total: 100,
          size: 10,
          page: 1,
          data: [
            {
              name: 'TCL金融集团',
              id: '23234342342'
            },
            {
              name: 'TCL金融集团asdf',
              id: '23234342222342'
            },
            {
              name: 'TCL金融集团按时发顺丰的asdf',
              id: '2323434222332342'
            }
          ]
        }
        this.$refs.selectEnts.loading = false // 关闭下拉列表内容加载的loading
      }, 500);
    },
    // 点击列表选中数据的回调
    selectItem (item) {
      console.log(item)
    }

  ```


## 3. 配置参数

| 参数               | 说明                                                     | 类型      |  是否必须|
| ------------       | --------------------------------                        | -------   | ------- |
| inputChange      |   输入时触发的回调函数                                      | function    | 是    |
| clickItem      |   点击列表选中数据时触发的回调函数                             | function    | 是    |
| dataList             |   下拉列表的数据                                        | Object      | 是    |
| ref             |   ref                                                       | String      | 是    |


## 4. Dome