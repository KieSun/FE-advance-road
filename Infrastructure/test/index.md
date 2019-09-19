# 基于 Jest 的单元测试

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20190918233147.png)

在这部分的内容中，你将学习到以下几点：

- 单元测试的作用
- 最应该对哪些模块进行单元测试
- React 和 Vue 这两大框架的单元测试学习路径
- 如何在 React 和 Vue 这两大框架中进行单元测试以及 Demo 实战

单元测试是用来测试程序中一小块功能的，比如说一个函数、一个类。它能很显著地提高项目的代码质量，降低出现 Bug 的频率，并且也利于维护代码。

但是实际情况是绝大部分开发者是不愿意做这件事情的。因为平时开发都忙不过来，哪还有时间去做这些事情。

我个人其实认为业务代码的测试应该是不强求的，毕竟需求经常在变化。如果对业务代码进行高覆盖率的测试，那么一旦需求变动就需要同步修改测试用例。这样编码的压力是双份的，很可能达不到快节奏上线的目的。

但是对于依赖的基础组件库以及公共函数是一定需要编写单元测试的。因为这些内容会被多个模块使用到，并且也不会频繁变更这些基础的功能，编写单元测试的收益相对来说高得多。就比如各种知名的开源项目的测试覆盖率往往是高于 90% 的，测试覆盖率低或者压根不写测试的开源项目一般很少直接用于项目中。

那么我们如何学习这方面的内容呢？首先无论你使用什么技术栈，都需要先选择一个测试框架。Jest 是其中一个相对来说优秀的框架（很多知名开源项目也都在使用它），开箱即用，内部集成了断言库、Mock、快照功能等等。当然你也可以同样选择别的框架，核心内容都是一样的，无非 API 有所改变罢了。

## Jest 入门

Jest 总归是个使用起来很简单的框架，不需要太多的学习时间就能上手了。另外如果你想学习如何用好这个框架，最好的办法其实是阅读工具库以及组件库的测试用例。

以下是对 Jest 一些重要功能的简单介绍。

### 断言

在 Jest 中使用最多的就是内部的断言库了，因为我们需要用它来测试函数的输出是否与我们预期的一致。

它的用法也很简单，你稍微会点英文就能看懂一段测试代码的用途，甚至于不需要去翻阅文档。比如说你期望一个函数的输出为 `2`

```js
// 翻译出来就是我测试一段代码，期望函数(输入)等于我期望的输出
test('测试 1 + 1 = 2', () => {
  expect(sum(1, 1)).toBe(2)
})
```

关于这部分的内容大家只需要翻阅下[文档](https://jestjs.io/docs/zh-Hans/expect)就能熟练使用了。

### 异步代码测试

异步获取数据肯定是一个常见场景了。异步代码通常会有两种写法，分别为：

- 回调函数
- 函数返回 promise

在测试异步代码的时候，通常返回的数据是不确定的，因此我们只需要测试异步代码是否正常返回数据即可。

```js
// 回调函数的写法，通过 done 来让测试代码一直等待
test('fetch success', done => {
  fetch(data => {
    expect(data.success).toBe(true)
    done()
  })
})
// 函数返回 promise 的写法，注意要加上 return
// 当然对于返回 promise 的函数我们也可以直接使用 await
test('fetch success', () => {
  return fetch().then(data => {
    expect(data.success).toBe(true)
  })
})
```

### Mock 函数

假设我们需要测试一个回调函数是否被执行、参数或者返回值是否正确，这时候我们就可以使用 Mock 函数。

```js
function foo(cb) {
  cb(1)
}
const mockCallback = jest.fn(value => value + 1)
// 回调被调用
expect(mockCallback).toBeCalled()
// 回调函数参数为 1
expect(mockCallback.mock.calls[0][0]).toBe(1)
// 回调函数返回值为 2
expect(mockCallback.mock.results[0].value).toBe(2)
```

当然 Mock 函数还有更多用法。比如模拟返回值，追踪函数被调用的各种情况等等，更多的内容可以阅读[文档](https://jestjs.io/docs/zh-Hans/mock-functions)去学习。

### 快照

快照在测试组件时是个很有用的功能，可以帮助我们确保在维护代码的过程中不会对组件的 UI 进行改变。

用法相当简单：

```js
expect(组件实例).toMatchSnapshot()
```

以上代码在第一次执行时会生成快照，在接下来的测试中每次都会去对比两者的内容是否一致。

### 配置文件

Jest 和 Babel 一样，使用的时候都需要一个配置文件。对于 Jest 来说，你需要在根目录中创建一个名为 `jest.config.js` 的文件。

以下是一些常见的配置选项：

```js
module.exports = {
  // 文件后缀
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  // 文件如何转换
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  // 忽略的文件
  transformIgnorePatterns: ['/node_modules/'],
  // 生成快照需要的插件
  snapshotSerializers: ['jest-serializer-vue'],
  // 需要执行哪些目录下的测试用例
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  // 在执行用例前的配置文件
  setupFiles: ['./tests/setup.js'],
  // 测试覆盖率配置
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './test/coverage',
  collectCoverageFrom: ['components/**/*.vue']
}
```

更多的配置属性可以查阅[文档](https://doc.ebichu.cc/jest/docs/zh-Hans/configuration.html)学习。

## Vue 中实践 Jest

### 配置

不管你是现有项目还是新项目需要使用 Jest，都可以通过 Vue Cli 3 解决。

**对于现有项目**，只需要在项目文件夹中执行一条命令即可

```bash
vue add unit-jest
```

脚手架会自动在项目中帮你安装 Jest 需要的配置，安装完成后你会发现根目录中新增了一个文件夹

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20190919171612.png)

文件夹中包含了一个测试用例，你只需执行 `yarn test:unit` 即可运行测试用例。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20190919171900.png)

**对于新项目来说**，在创建项目过程中需要选择 Manually select features，然后按照以下内容选择即可集成 Jest 环境。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20190919172525.png)
![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20190919172526.png)

### 实践
