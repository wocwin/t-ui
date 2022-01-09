<script>
export default {
  name: 'RenderComp',
  props: {
    createElementFunc: Function
  },
  render (h) {
    return this.createElementFunc(h)
  }
}
</script>
