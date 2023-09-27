# 自定义列标题 label

---

<common-code-format>
  <docsComponents-TTable-renderHeader slot="source"></docsComponents-TTable-renderHeader>

属性`columns`需配置<br/>

`renderHeader`：列标题 `Label` 区域渲染使用的 `Function(row)` 可以用 jsx 方式<br/>

#### JSX 方式如下：<br/>

```js
renderHeader: (row) => {
                return (
                  <div>
                    <span>{row.label}</span>
                    <i class="el-icon-question"></i>
                  </div>
                )
              },
```

<<<@/docs/.vuepress/components/docsComponents/TTable/renderHeader.vue
</common-code-format>
