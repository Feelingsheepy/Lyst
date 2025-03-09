<template>
  <v-select
    v-model="selectedLyst"
    :items="lysts"
    label="Select Lyst Test"
    item-text="name"
    return-object
  />
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { buildStore } from '~/store'
import { ILyst } from 'lyst-core/dist/interfaces'

@Component({})
class LystSelector extends Vue {
  @Prop({ type: Object, required: true }) value!: ILyst

  get lysts() : ILyst[] {
    return buildStore.availableLysts
  }

  get selectedLyst() : ILyst {
    return this.value
  }

  set selectedLyst(value) {
    this.$emit("input", value)
  }

  async mounted() {
    if(this.selectedLyst._id === undefined) {
      this.selectedLyst = this.lysts[0];
    }
  }
}

export default LystSelector
</script>