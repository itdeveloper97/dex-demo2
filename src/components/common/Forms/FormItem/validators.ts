import {PropertiesInterface} from "../../../../store/property/types";

export const formItemRepeatingProp = (values: PropertiesInterface[]) => {
  if (!values) return undefined

  const errorArray: Array<{property: string}> = [];

  let arrCopy = values.slice();


  values.forEach((current: any): void => {
    if (current.property !== "") {
      arrCopy.shift();

      if (arrCopy.some(el => el.property.id === current.property.id || el.property.name === current.property.name)) {
        errorArray.push({property: "Нельзя добавлять повторяющиеся свойства"});
      }
    } else {
      errorArray.push({property: "Свойства не могут быть пустыми"});
    }
  })

  return errorArray;
}