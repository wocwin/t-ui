export default {
  data() {
    return {
      saveDATA: [], // 所有数据
      tableRef: null, // 设置了滚动的那个盒子
      tableWarp: null, // 被设置的transform元素
      fixLeft: null, // 固定左侧--设置的transform元素
      fixRight: null, // 固定右侧--设置的transform元素
      tableFixedLeft: null, // 左侧固定列所在的盒子
      tableFixedRight: null, // 右侧固定列所在的盒子
      scrollTop: 0,
      scrollNum: 0, // scrollTop / (itemHeight * pageList)
      start: 0,
      end: 30, // 3倍的pageList
      starts: 0, // 备份
      ends: 30, // 备份
      pageList: 10, // 一屏显示
      itemHeight: 48 // 每一行高度
    }
  },
  watch: {
    scrollNum(newV) {
      // 因为初始化时已经添加了3屏的数据，所以只有当滚动到第3屏时才计算位移量
      if (newV > 1) {
        this.start = (newV - 1) * this.pageList
        this.end = (newV + 2) * this.pageList
        requestAnimationFrame(() => {
          // 计算偏移量
          this.tableWarp.style.transform = `translateY(${this.start *
            this.itemHeight}px)`
          if (this.fixLeft) {
            this.fixLeft.style.transform = `translateY(${this.start *
              this.itemHeight}px)`
          }
          if (this.fixRight) {
            this.fixRight.style.transform = `translateY(${this.start *
              this.itemHeight}px)`
          }
          this.tableData = this.saveDATA.slice(this.start, this.end)
        })
      } else {
        requestAnimationFrame(() => {
          this.tableData = this.saveDATA.slice(this.starts, this.ends)
          this.tableWarp.style.transform = `translateY(0px)`
          if (this.fixLeft) {
            this.fixLeft.style.transform = `translateY(0px)`
          }
          if (this.fixRight) {
            this.fixRight.style.transform = `translateY(0px)`
          }
        })
      }
    }
  },
  created() {
    // 是否开启虚拟列表
    if (this.useVirtual) {
      this.init()
    }
  },
  mounted() {
    // 是否开启虚拟列表
    if (this.useVirtual) {
      this.initMounted()
    }
  },
  methods: {
    initMounted() {
      this.$nextTick(() => {
        // 设置了滚动的盒子
        this.tableRef = this.$refs['el-table'].bodyWrapper
        // 左侧固定列所在的盒子
        this.tableFixedLeft = document.querySelector(
          '.el-table .el-table__fixed .el-table__fixed-body-wrapper'
        )
        // 右侧固定列所在的盒子
        this.tableFixedRight = document.querySelector(
          '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper'
        )
        /**
         * fixed-left | 主体 | fixed-right
         */
        // 主体改造
        // 创建内容盒子divWarpPar并且高度设置为所有数据所需要的总高度
        let divWarpPar = document.createElement('div')
        // 如果这里还没获取到saveDATA数据就渲染会导致内容盒子高度为0，可以通过监听saveDATA的长度后再设置一次高度
        divWarpPar.style.height = this.saveDATA.length * this.itemHeight + 'px'
        // 新创建的盒子divWarpChild
        let divWarpChild = document.createElement('div')
        divWarpChild.className = 'fix-warp'
        // 把tableRef的第一个子元素移动到新创建的盒子divWarpChild中
        divWarpChild.append(this.tableRef.children[0])
        // 把divWarpChild添加到divWarpPar中，最把divWarpPar添加到tableRef中
        divWarpPar.append(divWarpChild)
        this.tableRef.append(divWarpPar)
        // left改造
        let divLeftPar = document.createElement('div')
        divLeftPar.style.height = this.saveDATA.length * this.itemHeight + 'px'
        let divLeftChild = document.createElement('div')
        divLeftChild.className = 'fix-left'
        this.tableFixedLeft &&
          divLeftChild.append(this.tableFixedLeft.children[0])
        divLeftPar.append(divLeftChild)
        this.tableFixedLeft && this.tableFixedLeft.append(divLeftPar)
        // right改造
        let divRightPar = document.createElement('div')
        divRightPar.style.height = this.saveDATA.length * this.itemHeight + 'px'
        let divRightChild = document.createElement('div')
        divRightChild.className = 'fix-right'
        this.tableFixedRight &&
          divRightChild.append(this.tableFixedRight.children[0])
        divRightPar.append(divRightChild)
        this.tableFixedRight && this.tableFixedRight.append(divRightPar)
        // 被设置的transform元素
        this.tableWarp = document.querySelector(
          '.el-table .el-table__body-wrapper .fix-warp'
        )
        this.fixLeft = document.querySelector(
          '.el-table .el-table__fixed .el-table__fixed-body-wrapper .fix-left'
        )
        this.fixRight = document.querySelector(
          '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper .fix-right'
        )
        this.tableRef.addEventListener('scroll', this.onScroll)
      })
    },
    init() {
      this.saveDATA = this.table?.data
      this.tableData = this.saveDATA.slice(this.start, this.end)
    },
    onScroll() {
      this.scrollTop = this.tableRef.scrollTop
      this.scrollNum = Math.floor(this.scrollTop / (this.itemHeight * this.pageList))
    }
  }
}
