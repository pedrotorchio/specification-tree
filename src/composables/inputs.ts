import { JsonObject, JsonValue } from "type-fest";
import { SetupContext, toRefs } from "vue";

export type Props<ValueType = string> = { value: ValueType, label?: string, type: string };
export type Events<ValueType = string> = { input: (v: ValueType) => void };
export type Options<ValueType = string> = { context: SetupContext };
export function useInput<ValueType = string>(props: Props<ValueType>, { context }: Options<ValueType>) {
  const { value, label, type } = toRefs(props);
  const { emit } = context;

  const primitiveValue = (value: ValueType) => {
    if (!value) return value;
    if (type.value === 'json') return JSON.stringify(value);
    return value;
  }
  const parsedValue = (value: string) => {
    if (!value) return value;
    if (type.value === 'json') return JSON.parse(value);
    return value;
  }
  const extractValueFromInputEvent = (e:InputEvent) => (e.target as HTMLInputElement)?.value ?? null;
  const onValueUpdate = (e: InputEvent) => emit("update:value", parsedValue(extractValueFromInputEvent(e)));
  return {
    value,
    label,
    primitiveValue: primitiveValue(value.value),
    parsedValue: parsedValue(value.value),
    onValueUpdate
  }
}
export function isString(value: any): value is string {
  return typeof value === 'string';
}
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}
export function isRawJson(value: any): value is JsonObject {
  try {
    return Boolean(typeof value === 'object' && JSON.parse(value));
  } catch (e) {
    return false;
  }
}