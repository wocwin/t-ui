<script>
export default {
  name: 'RenderTooltip',
  props: {
    createElementFunc: Function
  },
  render (h) {
    return this.createElementFunc(h)
  }
}
</script>
