<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div>Hey there are {{ wheels }} wheels</div>
      <lyst-selector v-model="selectedLyst" />
      <lyst-builder />
      <v-speed-dial
        v-model="speedDial"
        fixed
        bottom
        right
        direction="top"
        transition="slide-y-reverse-transition"
        open-on-hover
      >
        <v-btn slot="activator" v-model="speedDial" color="green" dark fab>
          <v-icon>mdi-file-edit</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn color="blue" dark fab small @click.stop="createToolboxOpen = true;snackbar = false">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn color="purple" dark fab small @click.stop="save()">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn color="red" dark fab small @click.stop="createToolboxOpen = true;snackbar = false">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-snackbar v-model="snackbar" :timeout="0" bottom>
        This is your lyst, you can add stuff to it by pressing the
        <v-icon small color="blue" dark>mdi-plus-circle</v-icon>button.
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <create-toolbox />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ILyst } from 'lyst-core/dist/interfaces'
import { buildStore } from '~/store'
// Component imports
import LystSelector from '~/components/shared/lyst-selector.vue'
import CreateToolbox from '~/components/build/create-toolbox.vue'
import LystBuilder from '~/components/build/lyst-builder.vue'

@Component({
  components: { LystSelector, CreateToolbox, LystBuilder }
})
class BuildPage extends Vue {
  wheels = buildStore.wheels
  snackbar = true
  speedDial = false

  get createToolboxOpen(): boolean {
    return buildStore.createToolboxOpen
  }

  set createToolboxOpen(value: boolean) {
    buildStore.setCreateToolboxOpen(value)
  }

  get selectedLyst(): ILyst {
    return buildStore.selectedLyst
  }

  set selectedLyst(value: ILyst) {
    buildStore.updateSelectedLyst(value)
  }

  async fetch({ store, payload }: { store: any; payload: any }) {
    await buildStore.fetchAvailableLysts()
  }
}

export default BuildPage
</script>
