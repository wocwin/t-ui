# TCalendar

## 介绍

* 此组件是基于 [github地址](https://github.com/zwhGithub/vue-calendar) 改造得来
* 基于 vue 2.x 开发的轻量，高性能日历组件
* 占用内存小，性能好，样式好看，可扩展性强
* 原生 js 开发，没引入第三方库

## 使用
 import Calendar from '../../../../components/TCalendar'  // 引入组件

 components: {
    Calendar
  }

  <Calendar
    v-on:choseDay="clickDay"
    v-on:changeMonth="changeDate"
    v-on:dblclickDay="dblclickDay"
    // v-on:isToday="clickToday"
    // :markDate=arr // arr=['2020/4/1','2020/4/3'] 标记4月1日和4月3日 简单标记
    // :markDateMore=arr // 多种不同的标记 arr=[{date:'2020/4/1',className:"mark1"}, {date:'2020/4/13',className:"mark2"}]; 即2020/4/1这天会标上class="mark1", 2020/4/13这天会标上class="mark2"
    // 第一个标记和第二个标记不能同时使用
    // :agoDayHide='1514937600' //某个日期以前的不允许点击  时间戳10位
    // :futureDayHide='1525104000' //某个日期以后的不允许点击  时间戳10位
    // :sundayStart="true" //默认是周一开始 当是true的时候 是周日开始
  ></Calendar>

    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    },
    dblclickDay(data) {
      console.log(data); // 当前日期对象
    }

  // 多个标记示例
  arr=[{date:'2018/4/1',className:"mark1"}, {date:'2018/4/13',className:"mark2"}];
  //4月1 标记的className是mark1 根据class做出一些标记样式
```
### Attributes 注意markDate和markDateMore不能同时使用
| 属性          | 说明                                                                                                   |  默认  | 是否必传 |
| :------------ | :-----------------------------------------------------------------------------------------------------| :----: | :------: |
| textTop       | 日历头部的文字，默认是 [ '日','一', '二', '三', '四', '五', '六'] ，可以根据自己的需求进行不同的修改。       |  ---   |    否    |
| sundayStart   | 默认是周一开始 当是true的时候 是周日开始                                                                 | false  |    否    |
| futureDayHide | 某个日期以后的不允许点击 时间戳长度是 10 位                                                            |  很大  |    否    |
| agoDayHide    | 某个日期以前的不允许点击 时间戳长度是 10 位                                                            |   0    |    否    |
| markDate      | 如果需要某月的几天被标注，传当月的日期数组。如["2018/2/2","2018/2/6"]被会标注（相同的标记）               | 空数组 |    否    |
| markDateMore  | 需要不同的标记如上Usage 最后一行示例代码                                                               | 空数组 |    否    |



### Events
| 事件名称          | 说明                                                                                                   |  回调参数  |
| :------------ | :----------------------------------------------------------------------------------------------------- | :----: |
| choseDay      | 选中某天调用的方法，返回选中的日期 YY-MM-DD                                                            |   YY-MM-DD   |
| changeMonth   | 切换月份调用的方法，返回切换到某月的日期 YY-MM-DD                                                      |   YY-MM-DD   |
| isToday       | 切换月份的时候，如果切到当前月份，调用这个方法，返回当前月今天                                         |   无   |
| dblclickDay   | 双击某天调用的方法，返回当前日期的对象                                                              |  object   |




### JS调用组件内的方法
在 Calendar标签上添加 ref 属性, 暴露出三个方法可以 直接切换月份
例如: <Calendar ref="Calendar"></Calendar>

- this.$refs.Calendar.PreMonth();  //调用方法实现转到上个月
- this.$refs.Calendar.NextMonth(); //调用方法实现转到下个月
- this.$refs.Calendar.ChoseMonth('2018-12-12'); //调用方法实现转到某个月
- this.$refs.Calendar.ChoseMonth('2018-12-12',false); //跳转到18年12月12日 但是不选中当天，第二个参数 false表示不选中日期