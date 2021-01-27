import { TYPE } from '../../../core/types'
import { isFunction, isBoolean } from '../../../core/utils'
import { translateId2Name } from '../../../core/transfer'

export default {
  name: TYPE.CHECKBOX,
  inheritAttrs: false,
  render(h) {
    const { $data, value, editable, slots, formatter } = this.$attrs
    if(isBoolean(value)) {
      return editable ? <Checkbox {...{ props: this.$attrs, on: this.$listeners}}>
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </Checkbox> : <p>{ formatter || (value ? '是' : '否') }</p>
    }
    return (
      editable ? <CheckboxGroup {...{ props: this.$attrs, on: this.$listeners}} >
        { $data.map(item => <Checkbox key = { item.id } label = { item.id } disabled = { item.disabled }>{ item.render ? isFunction(item.render) ? item.render() : item.render : item.name }</Checkbox>) }
      </CheckboxGroup> : <p>{ formatter || translateId2Name($data, value, true) }</p>
    )
  }
}