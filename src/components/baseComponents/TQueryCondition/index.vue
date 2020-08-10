<template>
  <div class="t-query-condition" :class="className">
    <div class="tool-bar">
      <div class="el-row form-horizontal">
        <div class="el-col-8" v-for="(item, index) in getConfigList()" :key="index">
          <div class="form-group">
            <label class="el-col-12 control-label">{{item.label}}</label>
            <div class="el-col-16">
              <!-- 输入框 -->
              <el-input
                class="form-control"
                v-if="item.type === 'input'"
                v-model="searchQuery[item.value]"
                :class="`filter-${item.type}`"
                :type="item.type"
                :disabled="item.disabled"
                :clearable="item.clearable === false ? item.clearable : true"
                :placeholder="getPlaceholder(item)"
                @focus="handleEvent(item.event)"
              />
              <!-- 选择框 -->
              <el-select
                class="form-control"
                v-if="item.type === 'select'"
                v-model="searchQuery[item.value]"
                :class="`filter-${item.type}`"
                :disabled="item.disabled"
                :clearable="item.clearable === false ? item.clearable : true"
                :filterable="item.filterable === false ? item.filterable : true"
                :placeholder="getPlaceholder(item)"
                @change="handleEvent(item.event)"
              >
                <el-option
                  v-for="(childItem, childIndex) in listTypeInfo[item.list]"
                  :key="childIndex"
                  :label="childItem.key"
                  :value="childItem.value"
                />
              </el-select>
              <!-- 时间选择框 -->
              <el-time-select
                v-if="item.type === 'time'"
                v-model="searchQuery[item.value]"
                :class="`filter-${item.type}`"
                :picker-options="item.TimePickerOptions"
                :clearable="item.clearable === false ? item.clearable : true"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
              />
              <!-- 日期选择框 -->
              <el-date-picker
                v-if="item.type === 'date'"
                v-model="searchQuery[item.value]"
                :class="`filter-${item.type}`"
                :picker-options="item.datePickerOptions || datePickerOptions"
                :type="item.dateType"
                :clearable="item.clearable === false ? item.clearable : true"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                @change="handleEvent($event,item.event)"
              />
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div
          class="el-col-8 flex-box flex-ver-v flex-ver-h-right t-margin-top-5"
          :class="remainder===0?'el-col-24':remainder===1?'el-col-16':''"
        >
          <el-button
            v-for="item in getOperatorList()"
            :key="item.label"
            @click="item.fun(item)"
            :type="item.type"
            :icon="item.icon"
            :size="item.size||'medium'"
          >{{item.label}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TQueryCondition',
  props: {
    // 自定义类名
    className: {
      type: String
    },
    // 相关列表(下拉选择)
    listTypeInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 查询条件list
    queryList: {
      type: Array
    },
    // 参数
    query: {
      type: Object
    }
  },
  data () {
    return {
      // 时间相关设置
      datePickerOptions: {
        // disabledDate (time) {
        //   // 大于当前的时间都不能选 (+十分钟让点击此刻的时候可以选择到当前时间)
        //   return time.getTime() > +new Date() + 1000 * 600 * 1
        // }
      },
      remainder: null,
      flag: 'inner', // 内 inner  外outside
      searchQuery: {},
      // 操作按钮
      operatorList: [
        { label: '清空', type: 'danger', icon: 'el-icon-delete', fun: this.reset },
        { label: '查询', type: 'primary', icon: 'el-icon-search', fun: this.search },
        { label: '收起', type: 'danger', icon: 'el-icon-arrow-up', fun: this.unfold },
        { label: '展开', type: 'danger', icon: 'el-icon-arrow-down', fun: this.unfold, show: false }
      ]
    }
  },
  watch: {
    searchQuery: {
      handler (val) {
        // 传入参数修改，不派发
        if (this.flag === 'outside') {
          this.flag = 'inner'
          return
        }
        // 修改传入进来的参数
        this.$emit('update:query', { ...this.query, ...val })
      },
      deep: true // 深度监听
    },
    query (val) {
      this.flag = 'outside' // 标识为传入参数修改
      this.searchQuery = val
    }
  },
  mounted () {
    this.initParams()
    this.initBtn()
  },
  methods: {
    // 查询
    search () {
      const remainderArr = []
      this.queryList.map(item => {
        // 默认查询所以不清除
        if (Object.values(this.query).every(res => res === '')) {
          this.$set(item, 'show', true)
          remainderArr.push(item)
        } else {
          if (!this.query[item.value]) {
            this.$set(item, 'show', false)
          } else {
            remainderArr.push(item)
          }
          this.operatorList.map(item => {
            if (item.label === '收起') {
              this.$set(item, 'show', false)
            } else {
              this.$set(item, 'show', true)
            }
          })
        }
      })
      this.remainder = remainderArr.length % 3
    },
    // 收起与展开
    unfold (val) {
      if (val.label === '收起') {
        this.queryList.map((item, index) => {
          if (index !== 0 && index !== 1) {
            this.$set(item, 'show', false)
          }
        })
        this.operatorList.map(item => {
          if (item.label === '收起') {
            this.$set(item, 'show', false)
          } else {
            this.$set(item, 'show', true)
          }
        })
      } else {
        this.queryList.map(item => {
          this.$set(item, 'show', true)
        })
        // 初始化按钮位置
        this.initBtn()
        // 控制按钮是收起还是展示
        this.operatorList.map(item => {
          if (item.label === '展开') {
            this.$set(item, 'show', false)
          } else {
            this.$set(item, 'show', true)
          }
        })
      }
    },
    // 重置
    reset () {
      this.$emit('reset')
    },
    // 按钮位置
    initBtn () {
      this.remainder = Object.keys(this.query).length % 3
    },
    // 初始化参数
    initParams () {
      const obj = {}
      for (const key in this.query) {
        if (this.query[key]) {
          obj[key] = this.query[key]
        }
      }
      this.searchQuery = obj
    },
    // 获取列表
    getConfigList () {
      // eslint-disable-next-line no-prototype-builtins
      return this.queryList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },
    // 获取操作按钮
    getOperatorList () {
      // eslint-disable-next-line no-prototype-builtins
      return this.operatorList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },
    // placeholder的显示
    getPlaceholder (row) {
      let placeholder
      if (row.type === 'input' || row.type === 'textarea') {
        placeholder = '请输入' + row.label
      } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
        placeholder = '请选择' + row.label
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    // 绑定的相关事件
    handleEvent (event, type) {
      this.$emit('handleEvent', event, type)
    }
  }
}
</script>
