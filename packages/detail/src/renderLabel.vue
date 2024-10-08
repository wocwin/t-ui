
<script>
export default {
  name: 'RenderLabel',
  functional: true,
  props: {
    render: Function,
    item: Object
  },
  render(h, ctx) {
    return ctx.props.render(ctx?.item)
  }
}
</script>

