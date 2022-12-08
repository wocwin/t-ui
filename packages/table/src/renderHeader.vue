<script>
export default {
  name: 'RenderHeader',
  functional: true,
  props: {
    render: Function,
    column: {
      type: Object,
      default: null
    }
  },
  render(h, ctx) {
    return ctx.props.render(ctx?.props?.column)
  }
}
</script>
