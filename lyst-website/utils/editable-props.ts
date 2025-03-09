import { EditablePropType } from 'lyst-core/dist/constants/types'
import { IEditableProp, ISelectItemsEditablePropValue } from 'lyst-core/dist/interfaces/editable-props'

export function textColor() : IEditableProp<string> {
  return {
    name: "Colour",
    propName: "color",
    type: EditablePropType.Color,
    value: "red"
  }
}
export function selectItems() : IEditableProp<ISelectItemsEditablePropValue> {
  return {
    name: "Items",
    propName: "items",
    type: EditablePropType.SelectItems,
    value: {
      useAnotherLyst: false,
      items: ["Item 1", "Item 2", "Item 3"]
    }
  }
}
export function indexField() : IEditableProp<boolean> {
  return {
    name: "Index Field",
    propName: "indexField",
    type: EditablePropType.Checkbox,
    value: false
  }
}