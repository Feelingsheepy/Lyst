export enum EntityType {
  lyst,
  base_elements
}

export enum MethodType {
  fetch,
  create,
  update,
  replace
}

export enum BaseElementType {
  Lyst = 'lyst',
  Title = 'title',
  TextField = 'text-field',
  DatePicker = 'date-picker',
  TimePicker = 'time-picker',
  Select = 'select'
}

export enum EditablePropType {
  Color,
  SelectItems,
  Checkbox
}