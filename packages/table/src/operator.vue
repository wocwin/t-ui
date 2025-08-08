<template>
  <el-table-column
    v-if="table.operator"
    :fixed="table.operatorConfig && table.operatorConfig.fixed"
    :label="(table.operatorConfig && table.operatorConfig.label) || '操作'"
    :min-width="table.operatorConfig && table.operatorConfig.minWidth"
    :width="table.operatorConfig && table.operatorConfig.width"
    :align="
          (table.operatorConfig && table.operatorConfig.align) || align
        "
    v-bind="{
          ...(table.operatorConfig && table.operatorConfig.bind),
          ...$attrs,
        }"
    class-name="operator"
  >
    <template slot-scope="scope">
      <div class="operator_btn" :style="table.operatorConfig && table.operatorConfig.style">
        <template v-for="(item, index) in table.operator">
          <template v-if="!item.isMore">
            <el-button
              :key="index"
              @click="item.fun && item.fun(scope.row, scope.$index, tableData)"
              v-bind="{
                    type: 'text',
                    size: 'mini',
                    ...item.bind,
              }"
              :disabled="item.isDisabled && item.isDisabled(scope.row, item)"
              v-show="checkIsShow(scope, item)"
            >
              <!-- customRender渲染 -->
              <template v-if="item.customRender">
                <OptComponent
                  v-for="(comp, i) in item.customRender.comps"
                  :key="scope.$index + i.toString()"
                  v-bind="comp"
                  :scope="scope"
                />
              </template>
              <!-- render渲染 -->
              <template v-if="item.render">
                <render-col
                  :column="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="scope.$index"
                />
              </template>
              <span v-if="!item.render && !item.customRender">{{item.text}}</span>
            </el-button>
          </template>
        </template>
        <template v-if="hasMoreOper()">
          <el-dropdown v-bind="hasMoreBind" class="oper_more_dropdown">
            <span class="more_dropdown-link">
              <el-button
                v-bind="{
                      type: 'text',
                      size: 'mini',
                      ...hasMoreBind.btnBind
                    }"
              >
                {{ hasMoreBind.btnTxt || "更多" }}
                <i
                  v-if="hasMoreBind.isShowArrwIcon"
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </el-button>
            </span>
            <template #dropdown>
              <el-dropdown-menu v-bind="hasMoreBind.menuBind" class="oper_more_dropdown_menu">
                <template v-for="(item, index) in table.operator">
                  <el-dropdown-item
                    v-if="item.isMore"
                    @click.native.stop="item.fun && item.fun(scope.row, scope.$index, tableData)"
                    :key="'more_' + index"
                    v-bind="{
                          disabled: item.isDisabled && item.isDisabled(scope.row, item),
                          ...item.itemBind
                        }"
                  >
                    <el-button
                      :key="'morebtn_' + index"
                      v-bind="{ type: 'text', size: 'mini',disabled: item.isDisabled && item.isDisabled(scope.row, item), ...item.bind }"
                      v-show="checkIsShow(scope, item)"
                    >
                      <!-- customRender渲染 -->
                      <template v-if="item.customRender">
                        <OptComponent
                          v-for="(comp, i) in item.customRender.comps"
                          :key="scope.$index + i.toString()"
                          v-bind="comp"
                          :scope="scope"
                        />
                      </template>
                      <!-- render渲染 -->
                      <template v-if="item.render">
                        <render-col
                          :column="item"
                          :row="scope.row"
                          :render="item.render"
                          :index="scope.$index"
                        />
                      </template>
                      <span v-if="!item.render && !item.customRender">{{ item.text }}</span>
                    </el-button>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import RenderCol from './renderCol.vue'
import OptComponent from './OptComponent.vue'
export default {
  name: 'Operator',
  components: {
    RenderCol,
    OptComponent
  },
  props: {
    // table所需数据
    table: {
      type: Object,
      default: () => {
        return {}
      }
      // required: true
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 按钮权限store.getters接收字段
    btnPermissions: String,
    align: {
      type: String,
      default: 'center'
    }
  },

  computed: {
    hasMoreBind() {
      const btnBind = { type: 'text', size: 'mini' } // 按钮属性
      const menuBind = {} // 下拉menu属性
      const setBind = {
        btnTxt: '更多',
        isShowArrwIcon: true, // 是否显示下拉箭头
        ...menuBind, // 下拉menu属性
        ...btnBind, // 按钮属性
        ...this.table.operatorConfig.dropdownBind // 下拉属性
      }
      return { ...setBind }
    },
    // 按钮权限数组
    btnPremList() {
      return this.$store.getters[this.btnPermissions]
    }
  },
  methods: {
    // 判断操作是否显示更多
    hasMoreOper() {
      return this.table.operator.some((item) => item.isMore === true)
    },
    // 是否显示表格操作按钮
    checkIsShow(scope, item) {
      let isNoShow = false
      if (item.noshow) {
        item.noshow.map((rs) => {
          rs.isShow =
            typeof rs.val === 'string'
              ? rs.val === 'isHadVal'
                ? scope.row[rs.key]
                  ? 'true'
                  : 'false'
                : 'true'
              : rs?.val?.includes(scope.row[rs.key])
                ? 'false'
                : 'true'
        })
        isNoShow = item.noshow.every((key) => {
          return key.isShow === 'true'
        })
      } else {
        isNoShow = true
      }
      // 单独判断
      // let isShow =
      //   !item.show || item?.show?.val?.includes(scope.row[item.show.key])
      let isShow = true
      if (Array.isArray(item.show)) {
        for (const condition of item.show) {
          if (!condition.val.includes(scope.row[condition.key])) {
            isShow = false
            break
          }
        }
      } else if (item.show) {
        isShow = item.show.val.includes(scope.row[item.show.key])
      }
      // 按钮权限
      let isPermission =
        item.hasPermi && this.btnPermissions
          ? this.btnPremList?.includes(item.hasPermi)
          : true
      // table页面合计
      let totalTxt = Object.values(scope.row).every((key) => {
        return key !== '当页合计'
      })
      // table全部合计
      let totalTxt1 = Object.values(scope.row).every((key) => {
        return key !== '全部合计'
      })
      return isShow && isNoShow && isPermission && totalTxt && totalTxt1
    }
  }
}
</script>
<style lang="scss" scoped>
.oper_more_dropdown_menu {
  padding: 5px;
  .el-dropdown-menu__item {
    padding: 5px 15px;
    &.el-dropdown-menu__item--divided::before {
      display: none;
    }
    &.is-disabled:hover {
      cursor: not-allowed;
    }
  }
}
</style>
