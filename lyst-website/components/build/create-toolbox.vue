<template>
  <v-navigation-drawer :right="true" v-model="isOpen" temporary fixed>
    <v-list three-line>
      <template v-for="listItem in toolboxItems">
        <v-list-item :key="listItem.title" @click="addElement(listItem.type)">
          <v-list-item-avatar>
            <v-icon>{{ listItem.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ listItem.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ listItem.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { buildStore } from '~/store'
import { BaseElementType } from 'lyst-core/dist/constants'
import { createNewElement } from '../../utils/elements'

interface IToolboxItem {
  title: string
  subtitle: string
  icon: string
  type: BaseElementType
}

@Component({})
class CreateToolbox extends Vue {
  toolboxItems: IToolboxItem[] = [
    {
      title: 'Text Field',
      subtitle: 'General text field for any kind of text',
      icon: 'mdi-card-text-outline',
      type: BaseElementType.TextField
    },
    {
      title: 'Date',
      subtitle: 'For selecting date',
      icon: 'mdi-calendar',
      type: BaseElementType.DatePicker
    },
    {
      title: 'Time',
      subtitle: 'For selecting time',
      icon: 'mdi-clock-outline',
      type: BaseElementType.TimePicker
    },
    {
      title: 'Select',
      subtitle: 'For selecting an item from a list',
      icon: 'mdi-format-list-bulleted',
      type: BaseElementType.Select
    }
  ]

  get isOpen(): boolean {
    return buildStore.createToolboxOpen
  }
  set isOpen(value: boolean) {
    buildStore.setCreateToolboxOpen(value)
  }

  addElement(type: BaseElementType) {
    buildStore.addElement(createNewElement(type))
  }
}

export default CreateToolbox
</script>