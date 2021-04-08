class Utils {
  private getTypeOf(value: any): string {
    const str = Object.prototype.toString.call(value)
    return str.substring(8, str.length - 1).toLowerCase()
  }
  isString(value) {
    return this.getTypeOf(value) === 'string'
  }
  isNumber(value) {
    return this.getTypeOf(value) === 'number'
  }
  isArray(value) {
    return this.getTypeOf(value) === 'array'
  }
  isObject(value) {
    return this.getTypeOf(value) === 'object'
  }
  isUndefined(value) {
    return this.getTypeOf(value) === 'undefined'
  }
  isNull(value) {
    return this.getTypeOf(value) === 'null'
  }
  isEmpty(value) {
    return this.isUndefined(value) || this.isNull(value) || (this.isArray(value) && value.length === 0) || (this.isObject(value) && Object.keys(value).length === 0) || value === ''
  }
}

const _ = new Utils()
export default _
