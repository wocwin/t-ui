<template>
  <div class="t-edit-table">
    <div class="header_wrap">
      <div class="header_btn">
        <slot name="btn" />
        <div v-if="!$slots.btn">
          <el-button type="primary" @click="() => $emit('add')">新增</el-button>
        </div>
      </div>
    </div>
    <el-table
      ref="el-table"
      :data="tableData"
      v-bind="$attrs"
      v-on="$listeners"
      :border="table.border"
    >
      <!-- 序列号/复选框 -->
      <div v-if="table.firstColumn">
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width||50"
          :label="table.firstColumn.label"
          :align="table.firstColumn.align||'center'"
          v-if="table.firstColumn.type!=='index'"
        ></el-table-column>
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width||50"
          :label="table.firstColumn.label"
          :align="table.firstColumn.align||'center'"
          v-if="table.firstColumn.type==='index'"
        >
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
      </div>
      <el-table-column
        v-for="(item,index) in table.columns"
        :key="index+'i'"
        :type="item.type"
        :label="item.label"
        :prop="item.prop"
        :min-width="item['min-width'] || item.minWidth || item.width"
        :sortable="item.sort"
        :align="item.align || 'center'"
        :show-overflow-tooltip="item.noShowTip"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template slot-scope="scope">
          <edit-cell
            :configEdit="item.configEdit"
            v-model="scope.row[scope.column.property]"
            v-bind="$attrs"
            v-on="$listeners"
            ref="editCell"
          >
            <template v-for="(index, name) in $slots" :slot="name">
              <slot :name="name" />
            </template>
          </edit-cell>
        </template>
      </el-table-column>
      <slot></slot>
      <el-table-column
        v-if="table.operator"
        :fixed="table.operatorConfig && table.operatorConfig.fixed"
        :label="(table.operatorConfig && table.operatorConfig.label) || '操作'"
        :min-width="(table.operatorConfig && (table.operatorConfig.width || table.operatorConfig.minWidth)) || 100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in table.operator"
            :key="index"
            @click="item.fun(scope.$index,tableData)"
            :type="item.type"
            size="small"
          >{{item.text}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 按钮 -->
    <footer class="handle_wrap" v-if="footer!==null">
      <slot name="footer" />
      <div v-if="!$slots.footer">
        <el-button type="primary" @click="()=>$emit('save',tableData)">保存</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import EditCell from './EditCell.vue'
export default {
  name: 'TEditTable',
  components: {
    EditCell
  },
  props: {
    // table所需数据
    table: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    // 是否显示底部操作按钮 :footer="null"
    footer: Object
  },
  data() {
    return {
      tableData: this.table.data
    }
  }
}
</script>
<style lang="scss" scoped>
.t-edit-table {
  z-index: 0;
  background-color: #fff;
  padding: 10px;

  // border-radius: 4px;
  ::v-deep .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    // margin-right: 60px;
    margin-right: calc(2% - 20px);
    background-color: #fff;
  }

  .el-table th,
  .el-table td {
    padding: 8px 0;
  }

  .el-table--border th:first-child .cell,
  .el-table--border td:first-child .cell {
    padding-left: 5px;
  }

  .el-table .cell {
    padding: 0 5px;
  }

  .el-table--scrollable-y .el-table__fixed-right {
    right: 8px !important;
  }

  .header_wrap {
    display: flex;
    align-items: center;

    .header_btn {
      display: flex;
      align-items: center;
      flex: 0 30%;
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
      line-height: 35px;
      margin-left: 10px;
    }
  }

  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-x: auto;
  }

  .handle_wrap {
    position: sticky;
    z-index: 10;
    right: 0;
    bottom: -8px;
    margin: 0 -8px -8px;
    padding: 12px 16px;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
    text-align: right;

    .el-btn {
      margin-left: 8px;
    }
  }
}
</style>
