<template>
  <div class="t-date-picker-demo">
    <div class="box_content">
      <div class="box_flex">
        <div>选择日</div>
        <t-date-picker v-model="date" @change="change($event,'date','date')" />
      </div>
      <div class="box_flex">
        <div>选择周</div>
        <t-date-picker v-model="date1" type="week" @change="change($event,'week','date1')" />
      </div>
      <div class="box_flex">
        <div>选择月</div>
        <t-date-picker v-model="date2" type="month" @change="change($event,'month','date2')" />
      </div>
      <div class="box_flex">
        <div>选择年</div>
        <t-date-picker v-model="date3" type="year" @change="change($event,'year','date3')" />
      </div>
    </div>
    <div class="box_content">
      <div class="box_flex">
        <div>选择日期范围（默认显示）</div>
        <t-date-picker
          v-model="date4"
          type="daterange"
          @change="change($event,'daterange','date4')"
        />
      </div>
      <div class="box_flex">
        <div>选择日期范围加00:00:00 23:59:59时分秒</div>
        <t-date-picker
          v-model="date12"
          type="daterange"
          plusTime
          @change="change($event,'daterange','date12')"
        />
      </div>
      <div class="box_flex">
        <div>快捷方式-选择日期范围</div>
        <t-date-picker
          v-model="date5"
          type="daterange"
          isPickerOptions
          @change="change($event,'daterange','date5')"
        />
      </div>
    </div>
    <div class="box_content">
      <div class="box_flex">
        <div>选择月份范围</div>
        <t-date-picker
          v-model="date6"
          type="monthrange"
          @change="change($event,'monthrange','date6')"
        />
      </div>
      <div class="box_flex">
        <div>快捷方式-选择月份范围</div>
        <t-date-picker
          v-model="date7"
          type="monthrange"
          isPickerOptions
          @change="change($event,'monthrange','date7')"
        />
      </div>
    </div>
    <div class="box_content">
      <div class="box_flex">
        <div>选择日期&时间</div>
        <t-date-picker v-model="date8" type="datetime" @change="change($event,'datetime','date8')" />
      </div>
      <div class="box_flex">
        <div>快捷方式-选择日期&时间</div>
        <t-date-picker
          v-model="date9"
          type="datetime"
          isPickerOptions
          @change="change($event,'datetime','date9')"
        />
      </div>
    </div>
    <div class="box_content">
      <div class="box_flex">
        <div>选择日期&时间范围</div>
        <t-date-picker
          v-model="date10"
          type="datetimerange"
          @change="change($event,'datetimerange','date10')"
        />
      </div>
      <div class="box_flex">
        <div>快捷方式-选择日期&时间范围</div>
        <t-date-picker
          v-model="date11"
          type="datetimerange"
          isPickerOptions
          :default-time="['12:00:00', '08:00:00']"
          @change="change($event,'datetimerange','date11')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      date1: '',
      date2: '',
      date3: '',
      date4: ['2022-12-09', '2022-12-31'],
      date5: '',
      date6: '',
      date7: '',
      date8: '',
      date9: '',
      date10: '',
      date11: '',
      date12: '',
      typeTxt: {
        date: '日期',
        week: '周',
        month: '月',
        year: '年',
        daterange: '日期范围',
        monthrange: '月份范围',
        datetime: '日期和时间',
        datetimerange: '日期和时间点范围',
      }
    }
  },
  // 方法
  methods: {
    change(date, type, value) {
      console.log(`change选择${this.typeTxt[type]}返回值是：`, date)
      console.log(`v-model绑定的值是：`, this[value])
    }
  }
}
</script>
<style lang="scss" scoped>
.t-date-picker-demo {
  overflow-y: auto;
  max-height: 300px;
  .box_content {
    display: flex;
    padding: 10px;
    border: 1px dashed #ccc;
    margin-top: 10px;
    flex-wrap: wrap;
    &:first-child {
      margin-top: 0;
    }
  }
  .box_flex {
    display: flex;
    flex-direction: column;
    margin-right: 5px;
  }
}
</style>
