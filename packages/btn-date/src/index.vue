  <template>
  <div class="t_btn_date">
    <el-button type="text" class="textButton" @click="Today">今天</el-button>
    <el-button type="text" class="textButton" @click="theWeek">本周</el-button>
    <el-button type="text" class="textButton" @click="theMonth">本月</el-button>
    <el-button type="text" class="textButton" @click="theMonth">本年</el-button>
    <el-button type="text" class="user_defined" @click="userDefined">自定义</el-button>
    <el-date-picker
      v-if="isShow"
      v-model="range"
      type="daterange"
      :placeholder="placeholder || '请选择时间范围'"
      @change="searchTime"
    ></el-date-picker>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'TBtnDate',
  data () {
    return {
      isShow: false,
      placeholder: '请选择时间范围',
      range: [],
      dateObj: {
        startTime: '',
        endTime: ''
      }
    }
  },
  methods: {
    // 自定义
    userDefined () {
      this.isShow = !this.isShow
    },
    searchTime () {
      if (this.range && this.range[0] && this.range[1]) {
        this.dateObj.startTime = moment(this.range[0])
        this.dateObj.endTime = moment(this.range[1])
      } else {
        this.dateObj = {
          startTime: '',
          endTime: ''
        }
      }
      this.submitDateRange()
    },
    Today () {
      this.range = []
      this.dateObj.startTime = moment(
        moment()
          .startOf('day')
          .valueOf()
      )
      this.dateObj.endTime = moment(moment().valueOf())
      this.submitDateRange()
    },
    theWeek () {
      this.range = []
      this.dateObj.startTime = moment(
        moment()
          .week(moment().week())
          .startOf('week')
          .add(1, 'days')
          .valueOf()
      )
      this.dateObj.endTime = moment(moment().valueOf())
      this.submitDateRange()
    },
    theMonth () {
      this.range = []
      this.dateObj.startTime = moment(
        moment()
          .month(moment().month())
          .startOf('month')
          .valueOf()
      )
      this.dateObj.endTime = moment(moment().valueOf())
      this.submitDateRange()
    },
    submitDateRange () {
      if (this.range.length === 0) {
        this.range.push(this.dateObj.startTime._d)
        this.range.push(this.dateObj.endTime._d)
      }
      this.$emit('getdateObj', {
        startTime: this.dateObj.startTime._d,
        endTime: this.dateObj.endTime._d
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.t_btn_date {
  .user_defined {
    margin-right: 10px;
  }
}
</style>
