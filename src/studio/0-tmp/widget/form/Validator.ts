interface IschemaObject {
  fields: Array<{}>;
}

export const validate = (schema: IschemaObject, data: object): object => {
  const fields = Object.keys(schema.fields);
  return fields.reduce((errorObject, fieldName) => {
    const fieldDef = schema.fields[fieldName];
    const value = data[fieldName];
    // skip from validating if the field is system generated or it is a relation ship field
    if (fieldDef.system || fieldDef.relationship) {
      return errorObject;
    }
    // if data object does not contain a value for a required field submit errors
    if (fieldDef.type !== "boolean" && fieldDef.required && !value) {
      const errMsg = "Mandatory field, cannot be left empty";
      return setError(errorObject, fieldName, errMsg);
    }
    // validate for number
    if (value && fieldDef.type === "number") {
      if (!/^\d+$/.test(value)) {
        const errMsg = "Only allow numeric values";
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // validate for email
    if (value && fieldDef.type === "email") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      if (!emailRegex.test(value)) {
        const errMsg = "Should be a valid email address";
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // validate for decimal
    if (value && fieldDef.type === "decimal") {
      if (!/^\d+(\.\d+)?$/.test(value)) {
        const errMsg = "Only allow decimal values";
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // pattern validation; skip unicode
    if (value && fieldDef.pattern && !isUnicode(value)) {
      const regexp = new RegExp(fieldDef.pattern);
      if (!regexp.test(value)) {
        const errMsg = fieldDef.errorMessage || "Invalid value";
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // boolean field validation
    if (value && fieldDef.type === "boolean") {
      const values = fieldDef.options.values;
      const validValues = values.map((item: { value: any }) => {
        return item.value;
      });
      if (typeof value !== "boolean") {
        const errMsg = `Only allow ${validValues.join(", ")}`;
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // Enum field validation
    if (value && fieldDef.type === "enum") {
      const values = fieldDef.enum.values;
      const validValues = values.map((enumObject: { key: any }) => {
        return enumObject.key;
      });
      if (validValues.indexOf(value) === -1) {
        const errMsg = "Select a valid value";
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // Timestamp validation
    if (value && fieldDef.type === "timestamp") {
      if (!/^-?\d+$/.test(value)) {
        const errMsg = "Should be a valid date";
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // Length validation
    if (value && fieldDef.length) {
      const valueLength = value.length;
      const lengthDef = fieldDef.length.slice();
      if (valueLength < lengthDef[0] || valueLength > lengthDef[1]) {
        // error = "[" + name + "] " + errlabel + fieldDef.length.join('-') + " " + crlabel;
        const errMsg = `Should have length between ${fieldDef.length.join("-")} characters`;
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // Check minus values
    if (value && fieldDef.min) {
      if (value < fieldDef.min) {
        const errMsg = `Should have length between ${fieldDef.min}`;
        return setError(errorObject, fieldName, errMsg);
      }
    }
    return errorObject;
  }, {});
};
export const passwordValidate = (password: string) => {
  const hasNotEnoughLength = password.length < 8;
  const hasNoUpperCase = !/[A-Z]/.test(password);
  const hasNoLowerCase = !/[a-z]/.test(password);
  const hasNoNumbers = !/\d/.test(password);
  const hasNoNonAlphaNumeric = !/[!@#$%&*]/.test(password);
  const hasAnyOtherSymbol = /[^A-Za-z\d!@#$%&*]/.test(password);
  if (
    hasNotEnoughLength ||
    hasNoUpperCase ||
    hasNoLowerCase ||
    hasNoNumbers ||
    hasNoNonAlphaNumeric ||
    hasAnyOtherSymbol
  ) {
    return false;
  }

  return true;
};

const setError = (errorObject: object, name: string, errMsg: string) => {
  return {
    ...errorObject,
    [name]: errMsg
  };
};

const isUnicode = (text: string) => {
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 127) {
      return true;
    }
  }
  return false;
};
