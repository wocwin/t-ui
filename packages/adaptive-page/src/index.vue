<template>
  <div class="t_adaptive_page">
    <div
      :style="{ width: isShow('leftContent') ? `${leftWidth}px` : '0px' }"
      v-if="isShow('leftContent')"
      class="left_content"
    >
      <div class="left_tree">
        <slot name="leftContent" />
      </div>
    </div>
    <t-layout-page class="right_content">
      <t-layout-page-item class="table_search">
        <t-query-condition ref="query-condition" v-bind="$attrs" v-on="$listeners">
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
          </template>
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-query-condition>
      </t-layout-page-item>
      <t-layout-page-item class="table_main">
        <t-table ref="t-table" v-bind="$attrs" v-on="$listeners">
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
          </template>
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-table>
      </t-layout-page-item>
    </t-layout-page>
  </div>
</template>
<script>
import TLayoutPage from '../../layout-page/src/index.vue'
import TLayoutPageItem from '../../layout-page-item/src/index.vue'
import TTable from '../../table/src/index.vue'
import TQueryCondition from '../../query-condition/src/index.vue'
export default {
  name: 'TAdaptivePage',
  components: {
    TLayoutPage,
    TLayoutPageItem,
    TTable,
    TQueryCondition
  },
  props: {
    leftWidth: {
      type: [String, Number],
      default: 260
    },
    queryRef: Object,
    tableRef: Object
  },
  mounted() {
    this.$emit('update:queryRef', this.$refs['query-condition'])
    this.$emit('update:tableRef', this.$refs['t-table'])
  },
  activated() {
    this.$emit('update:queryRef', this.$refs['query-condition'])
    this.$emit('update:tableRef', this.$refs['t-table'])
  },
  methods: {
    isShow(name) {
      return Object.keys(this.$slots).includes(name)
    }
  }
}
</script>
<style lang="scss" scoped>
.t_adaptive_page {
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .left_content {
    background-color: #fff;
    margin: 8px;
    margin-right: 0;
    .left_tree {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow-y: auto;
    }
  }
  .right_content {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .table_main {
      flex: 1;
      overflow-y: auto;
      .t-table {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        height: 100%;
        ::v-deep.el-table {
          height: fit-content;
          overflow: auto;
          &::before {
            height: 0px;
          }
          .el-table__fixed::before,
          .el-table__fixed-right::before {
            height: 0px;
          }
        }
      }
    }
  }
}
</style>
