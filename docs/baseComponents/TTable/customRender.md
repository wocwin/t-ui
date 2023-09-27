# table 操作按钮自定义渲染

---

<common-code-format>
  <docsComponents-TTable-customRender slot="source"></docsComponents-TTable-customRender>
  在组件中需配置: `operator数组`
  
  `operator 数组`是显示按钮数且点击后将当前行数据传出

需要自定义渲染需配置`customRender`如下

```js
customRender: {
  comps: [
    {
      comp: "el-popconfirm",
      bind: {
        title: "确认删除该条数据？",
      },
      event: (scope) => {
        return {
          confirm: () => {
            this.handleDelete(scope.row);
          },
        };
      },
      child: (scope) => [
        {
          slot: "reference",
          comp: "el-link",
          text: "删除",
          bind: {
            type: "primary",
          },
          style: {
            display: scope.row.stocktakeJobStatus == 1, // stocktakeJobStatus为1时隐藏
          },
        },
      ],
    },
  ];
}
```

<<< @/docs/.vuepress/components/docsComponents/TTable/customRender.vue

</common-code-format>
