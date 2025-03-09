import * as EditablePropTypes from './editable-props'
import IRenderElement from '~/interfaces/render-element'
import { IEditableProp } from 'lyst-core/dist/interfaces/editable-props'
import { BaseElementType } from 'lyst-core/dist/constants/types'

export interface IRenderTypeDescriptor {
  type: string
  label: string
  placeholder: string
  valueFunction: (x: IRenderElement) => any
  editableProps: IEditableProp<any>[]
}

type RenderTypeDescriptors = {
  [x in BaseElementType]: IRenderTypeDescriptor
}

export const renderTypeDescriptors: RenderTypeDescriptors = {
  lyst: {
    type: 'lyst',
    label: 'Lyst',
    placeholder: 'Lyst',
    valueFunction: x => null,
    editableProps: []
  },
  title: {
    type: "lyst-title",
    label: "Title",
    placeholder: "My New Lyst",
    valueFunction: x => null,
    editableProps: [
      EditablePropTypes.textColor()
    ]
  },
  "text-field": {
    type: "lyst-text-field",
    label: "Text Field Name",
    placeholder: "My New Text Field",
    valueFunction: x => x.dataObject.props.value,
    editableProps: [
      EditablePropTypes.indexField()
    ]
  },
  "date-picker": {
    type: "lyst-date-picker",
    label: "Date Picker",
    placeholder: "Date Picker Name",
    valueFunction: x => x.dataObject.props.value,
    editableProps: []
  },
  "time-picker": {
    type: "lyst-time-picker",
    label: "Time Picker",
    placeholder: "Time Picker Name",
    valueFunction: x => x.dataObject.props.value,
    editableProps: []
  },
  select: {
    type: "lyst-select",
    label: "Select",
    placeholder: "Select Name",
    valueFunction: x => x.dataObject.props.value,
    editableProps: [
      EditablePropTypes.selectItems()
    ]
  }
}