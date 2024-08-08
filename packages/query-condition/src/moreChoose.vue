<template>
  <el-popover
    popper-class="t_query_condition_more"
    :bind="popoverAttrsBind"
    ref="popover"
    v-if="allcheckList.length>0"
  >
    <div class="inside_box">
      <div class="inside_box_title">
        <div>{{popoverAttrsBind.title||'所有条件'}}</div>
        <div class="check-box">
          <el-button
            size="mini"
            type="text"
            @click="handlecheckAll"
          >{{popoverAttrsBind.allTxt||'全选'}}</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleReset"
          >{{popoverAttrsBind.clearTxt||'清空'}}</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleReverseCheck"
          >{{popoverAttrsBind.reverseTxt||'反选'}}</el-button>
        </div>
      </div>
      <el-checkbox-group v-model="checkList" class="inside_box_main" @change="getcheck">
        <el-checkbox v-for="(item,index) of allcheckList" :key="index" :label="item.label"></el-checkbox>
      </el-checkbox-group>
    </div>
    <span class="more_dropdown_icon" slot="reference">
      <span class="out_box">{{popoverAttrsBind.showTxt||'更多'}}</span>
      <i class="el-icon-arrow-down"></i>
    </span>
  </el-popover>
</template>
<script>
export default {
  name: 'MoreChoose',
  props: {
    // 以下拉方式展示更多条件---数据源
    moreCheckList: {
      type: Array,
      default: () => []
    },
    // 更多条件--el-popover属性
    popoverAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      checkList: [],
      isCheckList: [], // 已选中
      allcheckList: this.moreCheckList // 全部可选项
    }
  },
  watch: {
    // 全部可选项
    moreCheckList: {
      handler(list) {
        this.allcheckList = list
      },
      deep: true
    },
    // 选中项
    checkList: {
      handler(nval, oval) {
        let list = []
        oval.forEach(ele => {
          if (!nval.some(val => val == ele)) {
            list.push(ele)
          }
        })
        this.isCheckList.forEach((ele, j) => {
          if (list.filter(val => val == ele.label)[0]) {
            delete this.isCheckList[j]
          }
        })
      }
    }
  },
  computed: {
    // 以下拉方式展示更多条件--属性
    popoverAttrsBind() {
      const popoverAttrs = { showTxt: '更多', title: '所有条件', allTxt: '全选', reverseTxt: '反选', clearTxt: '清空', ...this.popoverAttrs }
      return { placement: 'bottom', width: 240, trigger: 'click', ...popoverAttrs }
    }
  },
  methods: {
    // 全选
    handlecheckAll() {
      const allcheckList = JSON.parse(JSON.stringify(this.allcheckList))
      this.checkList = allcheckList.map((item) => item.label)
      // console.log('全选', this.checkList)
      this.isCheckList = allcheckList
      const checkObj = this.analysisObj(this.isCheckList)
      this.$emit('getCheckList', checkObj)
    },
    // 反选
    handleReverseCheck() {
      const checkList = JSON.parse(JSON.stringify(this.checkList))
      this.checkList = []
      this.isCheckList = []
      this.allcheckList.forEach((ele, j) => {
        if (!checkList.filter((item1) => item1 == ele.label)[0]) {
          this.checkList.push(ele.label)
          this.isCheckList.push(ele)
        }
      })
      const checkObj = this.analysisObj(this.isCheckList)
      // console.log('反选', checkObj)
      this.$emit('getCheckList', checkObj)
    },
    // 清空
    handleReset() {
      // console.log('清空')
      this.checkList = []
      this.isCheckList = []
      this.$emit('getCheckList', {})
    },
    // 单选
    getcheck(val) {
      this.allcheckList.forEach((ele, j) => {
        if (val.filter(item1 => item1 == ele.label)[0]) {
          this.isCheckList.push(ele)
        }
      })
      // console.log('isCheckList---', this.allcheckList)
      const checkObj = this.analysisObj(this.isCheckList)
      // console.log('checkObj--222', checkObj)
      this.$emit('getCheckList', checkObj)
    },
    // 格式化
    analysisObj(val) {
      return val.reduce((obj, item) => {
        obj[item.prop] = {
          label: item.label,
          comp: item.comp,
          event: item?.event,
          bind: item?.bind,
          child: item?.child,
          slotName: item?.slotName,
          span: item?.span,
          defaultVal: item?.defaultVal
        }
        if (item.comp === 'el-select') {
          obj[item.prop].child = item.list.reduce((acc, cur) => {
            acc.push({
              comp: 'el-option',
              value: cur[item.valueKey || 'key'],
              bind: {
                label: cur[item.labelKey || 'label'],
                key: cur[item.valueKey || 'key']
              }
            })
            return acc
          }, [])
        }
        return obj
      }, {})
    }
  }
}
</script>
<style lang="scss">
.t_query_condition_more.el-popover {
  padding: 10px 15px;
  padding-top: 5px;
  .inside_box {
    display: flex;
    flex-direction: column;
    .inside_box_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .inside_box_main {
      display: grid;
      grid-template-columns: repeat(2, minmax(100px, 50%));
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          min-width: 90px;
        }
      }
    }
  }
}
</style>
