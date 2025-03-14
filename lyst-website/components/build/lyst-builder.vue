<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { buildStore } from '~/store'
import { CreateElement } from 'vue'

@Component({})
class LystBuilder extends Vue {
  get elements() {
    return buildStore.elements
  }

  render(createElement: CreateElement) {
    return createElement(
      "v-card",
      this.elements.map((x, i) =>
        createElement(x.type, { ...x.dataObject }, x.content)
      )
    );
  }
}

export default LystBuilder
</script>