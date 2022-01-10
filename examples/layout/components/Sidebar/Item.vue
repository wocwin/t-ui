<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: [String, Boolean],
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const title = context.props.title
    const vnodes = []
    const icon = `i-icon icon iconfont ${context.props.icon}`
    if (icon) {
      vnodes.push(<i class={(icon)}></i>)
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
