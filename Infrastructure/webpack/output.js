;(function(modules) {
  var installedModules = {}

  // 传入 './src/test.js'
  // 执行 './src/test.js' 对应的函数
  // 在 module.exports 中添加 default 属性
  // 最后返回值给 './src/index.js' 中的参数
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    var module = (installedModules[moduleId] = {
      exports: {}
    })

    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )

    return module.exports
  }
  // 首先进来执行入口文件
  return __webpack_require__((__webpack_require__.s = './src/index.js'))
})({
  './src/index.js': function(module, __webpack_exports__, __webpack_require__) {
    var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      './src/test.js'
    )
    // 取出 module.exports.default
    console.log(_test__WEBPACK_IMPORTED_MODULE_0__['default'])
  },

  './src/test.js': function(module, __webpack_exports__, __webpack_require__) {
    const a = 1
    // 等于 module.exports.default = a
    __webpack_exports__['default'] = a
  }
})
