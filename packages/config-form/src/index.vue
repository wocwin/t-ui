<template>
  <a-form-model
    ref="form"
    class="dh_config_form"
    :style="{'grid-template-areas': gridAreas, 'grid-template-columns': `repeat(${colLength}, minmax(220px, ${100 / colLength}%))`}"
    :model="form"
    :rules="rules"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
  >
    <config-form-item
      v-for="(opt, i) in cOpts"
      :key="i"
      :opt="opt"
      :value="form[opt.dataIndex]"
      :i="i"
      :style="{gridArea: i}"
      @change="change"
    />
  </a-form-model>
</template>
<script>
import ConfigFormItem from './configFormItem.vue'
export default {
  name: 'TAntConfigform',
  components: {
    ConfigFormItem
  },
  props: {
    labelCol: Object,
    wrapperCol: Object,
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.initForm(this.opts)
    }
  },
  computed: {
    cOpts () { // 二次封装配置
      return Object.keys(this.opts).reduce((acc, field) => {
        let opt = { ...this.opts[field] }
        opt.dataIndex = field
        acc[field] = opt
        return acc
      }, {})
    },
    rules () {
      return Object.keys(this.opts).reduce((acc, field) => {
        if (this.opts[field].rules) {
          acc[field] = this.opts[field].rules
        }
        return acc
      }, {})
    },
    colLength () { // 行列数
      const width = window.innerWidth
      let colLength = 4
      if (width > 768 && width < 1280) {
        colLength = 3
      } else if (width <= 768) {
        colLength = 2
      }
      return colLength
    },
    gridAreas () {
      let template = "'. . . .'"
      let length = 1
      switch (this.colLength) {
        case 3:
          template = "'. . .'"
          break
        case 2:
          template = "'. .'"
          break
      }
      let areas = [template]
      Object.keys(this.opts).forEach(key => { // 根据控件描述注定占用多少列及顺序
        // console.log(999, key)
        let gutter = 1
        if (this.opts[key].gutter > 1 || this.opts[key].gutter <= 2) { // 最多占用2列
          gutter = this.opts[key].gutter
        }
        // 计算剩余多少未占用的位置
        let count = 0
        let scrstr = areas[areas.length - 1]
        // eslint-disable-next-line eqeqeq
        while (scrstr.indexOf('.') != -1) {
          scrstr = scrstr.replace(/\./, '')
          count++
        }
        // 若剩余位置不足以放下下一个控件
        if (count < gutter) {
          areas.push(template)
        }
        let i = 0
        while (i < gutter) {
          areas[areas.length - 1] = areas[areas.length - 1].replace(/\./, key)
          i++
          length++
        }
      })
      return (areas + '').replace(/,/g, '')
    },
    cellLength () { // 占用单元格长度
      let length = 0
      Object.keys(this.opts).forEach(key => {
        let gutter = this.opts[key].gutter || 1
        length += gutter
      })
      return length
    }
  },
  methods: {
    initForm (opts, keepVal = false) { // keepVal 是否保持表单已有数据
      return Object.keys(opts).reduce((acc, field) => {
        acc[field] = (keepVal && this.form && this.form[field]) || opts[field].defaultVal || null
        return acc
      }, {})
    },
    updateFields (keepVal = true) {
      this.form = this.initForm(this.opts, keepVal)
    },
    change (v, dataIndex) {
      // this.form[dataIndex] = v
      this.$set(this.form, dataIndex, v)
      this.$emit('change', { ...this.form })
    },
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve({
              valid,
              formData: Object.keys(this.form).reduce((acc, field) => {
                if (typeof this.form[field] === 'string') { // 去除前后空格
                  this.form[field] = this.form[field].trim()
                }
                acc[field] = this.form[field]
                return acc
              }, {})
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              valid,
              formData: null
            })
          }
        })
      })
    },
    resetFields () {
      return this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="scss">
.dh_config_form {
  display: grid;
  grid-gap: 0 16px;
  // @media screen and (min-width: 1440px) {
  //   grid-template-columns: repeat(4, 1fr);
  // }
  // @media screen and (max-width: 1440px) {
  //   grid-template-columns: repeat(3, 1fr);
  // }
  // @media screen and (max-width: 992px) {
  //   grid-template-columns: repeat(2, 1fr);
  // }
  // @media screen and (max-width: 768px) {
  //   grid-template-columns: repeat(1, 1fr);
  // }
  .ant-select,
  .ant-calendar-picker {
    width: 100%;
  }
  .ant-form-item {
    display: flex;
    flex-direction: column;
  }
}
</style>
