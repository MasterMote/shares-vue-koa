class ResponseParams {
  constructor(code, success, msg, data) {
    this.code = code
    this.success = success
    this.msg = msg
    this.data = data
  }
}

module.exports = ResponseParams