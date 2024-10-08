<script>
export default {
  name: 'RenderBtn',
  props: {
    createElementFunc: Function
  },
  render (h) {
    return this.createElementFunc(h)
  }
}
</script>
