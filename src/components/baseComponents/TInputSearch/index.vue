<template>
  <div class="input-search-select">
    <el-input
      @focus="inputFocus"
      @blur="inputBlur"
      v-model.trim="value"
      v-input-debounce="[inputChange, 300]"
      :placeholder="placeholder"
    ></el-input>
    <div class="select-list" v-show="isShow" :id="id">
      <div v-loading="loading">
        <div
          class="li"
          v-for="(item) in data.data"
          :key="item.id"
          @click="clickItem(item)"
          :title="item.name"
        >{{ item.name }}</div>
      </div>
      <el-button
        v-if="data.data && data.data.length > 0 && data.data.length < data.total"
        :loading="btnLoading"
        class="load-more"
        @click="getMore"
      >加载更多({{ data.total }})</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TInputSearch',
  data () {
    return {
      isShow: false,
      isFocus: false,
      loading: false,
      btnLoading: false,
      value: '',
      id: new Date().getTime()
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  mounted () {
    window.addEventListener('click', this.onClickOutsideHandler)
  },
  // 方法
  methods: {
    inputFocus () {
      this.isShow = true
      this.isFocus = true
      this.loading = true
      this.$emit('inputChange', this.value)
    },
    inputChange (val) {
      this.loading = true
      this.$emit('inputChange', val)
    },
    inputBlur () {
      this.isFocus = false
    },
    onClickOutsideHandler (event) {
      const e = document.getElementById(this.id)
      if (this.isShow && !e.contains(event.target) && !this.isFocus) {
        this.isShow = false
      }
    },
    clickItem (item) {
      this.isShow = false
      this.value = item.name
      this.$emit('clickItem', item)
    },
    getMore () {
      this.btnLoading = true
      this.$emit('inputChange', this.value, 'more')
    }
  },
  destroyed () {
    window.removeEventListener('click', this.onClickOutsideHandler)
  }
}
</script>

<style lang="scss" scoped>
.input-search-select {
  position: relative;
  ::v-deep .el-input-group__append {
    padding: 0 17px;
  }
  .select-list {
    position: absolute;
    background-color: #fff;
    z-index: 1000;
    width: 100%;
    border: 1px solid #f1f1f1;
    box-shadow: 0 0 5px #ccc;
    border-radius: 4px;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    > div {
      min-height: 100px;
    }
    .li {
      border-bottom: 1px solid #f1f1f1;
      padding: 0 10px;
      line-height: 40px;
      cursor: pointer;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
  }
  ::v-deep .el-loading-spinner .circular {
    height: 26px;
    width: 26px;
  }
  .load-more {
    border: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style>
