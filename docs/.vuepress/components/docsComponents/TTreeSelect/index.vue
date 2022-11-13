<template>
  <t-tree-select
    :treeList="treeList"
    placeholder="请选择tree结构"
    width="50%"
    :treeProps="treeProps"
    @handleNodeClick="selectDrop"
  />
</template>
<script>
export default {
  name: 'TTreeSelectDemo',
  data() {
    return {
      defaultData: {
        id: '1-1-1', // ID字段名
        label: '三级 1-1-1' // 显示名称
      },
      treeProps: {
        value: 'id',
        children: 'children',
        label: 'name'
      },
      treeList: [
        {
          id: '1',
          name: '一级 1菈妮',
          children: [
            {
              id: '1-1',
              name: '二级 1-1',
              children: [
                {
                  id: '1-1-1',
                  name: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          name: '一级 2',
          id: '2',
          children: [
            {
              id: '2-1',
              name: '二级 2-1',
              children: [
                {
                  id: '2-1-1',
                  name: '三级 2-1-1',
                },
              ],
            },
            {
              id: '2-2',
              name: '二级 2-2',
              children: [
                {
                  id: '2-2-1',
                  name: '三级 2-2-1鸡腿'
                },
              ],
            },
          ],
        },
      ]
    }
  },
  methods: {
    selectDrop(val) {
      console.log('选中的id---->', val.id)
      console.log('选中的label----->', val.label)
    }
  }
}
</script>
