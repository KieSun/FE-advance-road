> 本文永远首发自我的 [Github](https://github.com/KieSun/FE-advance-road)，大家可以关注点赞，通常会早于发布各大平台一周时间以上。

本文涉及到的源码及视频地址：

- [源码](https://github.com/KieSun/p-cop)

## 前言

经常有读者问我什么是前端工程化？该怎么开始做前端工程化？

聊下来以后得出一些结论：这类读者普遍就职于中小型公司，前端人员个位数，平时疲于开发，团队内部几乎没有基础建设，工具很蛮荒。工程化对于这些读者来说很陌生，基本不知道这到底是什么，或者说认为 Webpack 就是前端工程化的全部了。

笔者目前就职于某厂的基础架构组，为百来号前端提供基础服务建设，对于这个领域有些许皮毛经验。因此有了一些想法，前端搞工程化会是笔者今年开坑的一个系列作品，每块内容会以文章 + 源码 + 视频的方式呈现。

这个系列的产出适用于以下群体：

- 中小厂前端，基建蛮荒，平时疲于业务，不知道业务外怎么做东西能提高自己的竞争力、丰富简历

- 公司暂时没有做基建计划，只能业余做一些低成本收益高的产品

- 想了解前端工程化

需要说明的是产出只会是一个低成本下的最小可用产品，你可以拿来按需增加功能、参考思路或者纯粹当学习一点知识。

## 什么是前端工程化？

因为是该系列第一篇文章，就先来大致说下什么是前端工程化。

我的理解是前端工程化大体上可以理解为是做提效工程，从写代码开始的每一步都可以做工程化。比如说你用 IDE 对比记事本写代码的体验及效率肯定是不一样的；比如说 Webpack 等这类工具也是在帮助我们提升开发、构建的效率，其他的工具也就不一一列出了，大家知道意思就好。

当然了，今天要聊到的性能检测也是工程化的一部分。毕竟我们需要有个工具去协助找到应用到底在哪块地方存在性能短板，能帮助开发者更快地定位问题，而不是在生产环境中让用户抱怨产品卡顿。

## 为什么需要性能检测？

性能优化是很多前端都绕不开的话题，先不说项目是否需要性能优化，面试的时候这类问题是很常见的。

但是光会性能优化的手段还是不够的，我们最后还是需要做出前后数据对比才能体现出这次优化的价值到底有多少，毕竟数据的量化在职场中还是相当重要的。老板不知道你具体做的事情，很多东西都得从数据中来看，数据越好看就说明你完成工作的能力越高。

想获取性能的前后数据变化，我们肯定得用一些工具来做性能检测。

## 性能该怎么检测？

性能检测的方式有很多：

- Chrome 自带的开发者工具：Performance

- Lighthouse 开源工具

- 原生 Performance API

- 各种官方库、插件

这些方法各有各的好处，前两种方式简单快捷，能够可视化各类指标，但是很难拿到用户端的数据，毕竟你不大可能让用户去跑这些工具，当然除此之外还有一些很小的缺点，比如说拿不到重定向次数等等。

官方库、插件相比前两者来说会逊色很多，并且只提供一部分核心指标。

原生 Performance API 存在兼容问题，但是能覆盖到开发生产阶段，并且功能也能覆盖自带的开发者工具：Performance 工具。不仅在开发阶段能了解到项目的性能指标，还能获取用户端的数据，帮助我们更好地制定优化方案。另外能获取的指标也很齐全，因此是此次我们产品的选择。

当然了这不是多选一的选择题，我们在开发阶段还是需要将 Performance 工具及 API 结合起来使用，毕竟他们还是有着相辅相成的作用。

## 实战

这是此处产品的源码：[地址](https://github.com/KieSun/p-cop)。

### 一些性能指标

在开始实战前，我们还是得来了解一些性能指标，随着时代发展，其实一些老的性能优化文章已经有点过时了。谷歌一直在更新性能优化这块的指标，笔者之前写过一篇文章来讲述当下的[最新性能指标有哪些](https://juejin.cn/post/6850037270729359367)，有兴趣的读者可以先详细的读一下。

当然如果你嫌太长不看，可以先通过以下思维导图简单了解一下：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108854792871.jpg)

当然除了这个指标以外，我们还需要获取网络、文件传输、DOM等信息丰富指标内容。

### Performance 使用

`Performance` 接口可以获取到当前页面中与性能相关的信息，并且提供高精度的时间戳，秒杀 `Date.now()`。首先我们来看下这个 API 的兼容性：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108854440873.png)


这个百分比其实已经算是兼容度很高了，主流浏览器的版本都能很好的支持。

对于 Performance 上 API 具体的讲解文中就不赘述了，有兴趣的可以阅读 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)，笔者在这里只讲几个后续用到的重要 API。

#### getEntriesByType

这个 [API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType) 可以让我们通过传入 `type` 获取一些相应的信息：

- frame：事件循环中帧的时间数据。
- resource：加载应用程序资源的详细网络计时数据
- mark：`performance.mark` 调用信息
- measure：`performance.measure` 调用信息
- longtask：长任务（执行时间大于 50ms）信息。这个类型已被废弃（文档未标注，但是在 Chrome 中使用会显示已废弃），我们可以通过别的方式来拿
- navigation：浏览器文档事件的指标的方法和属性
- paint：获取 FP 和 FCP 指标

最后两个 `type` 是性能检测中获取指标的关键类型。当然你如果还想分析加载资源相关的信息的话，那可以多加上 `resource` 类型。

#### PerformanceObserver

`PerformanceObserver` 也是用来获取一些性能指标的 API，用法如下：

```js
const perfObserver = new PerformanceObserver((entryList) => {
    // 信息处理
})
// 传入需要的 type
perfObserver.observe({ type: 'longtask', buffered: true })
```

结合 `getEntriesByType` 以及 `PerformanceObserver`，我们就能获取到所有需要的指标了。

### 上代码！

因为已经贴了[源码地址](https://github.com/KieSun/p-cop)，笔者就不贴大段代码上来了，会把主要的从零到一过程梳理一遍。

首先我们肯定要设计好用户如何调用 SDK（代指性能检测库）？需要传递哪些参数？如何获取及上报性能指标？

一般来说调用 SDK 多是构建一个实例，所以这次我们选择 `class` 的方式来写。参数的话暂定传入一个 `tracker` 函数获取各类指标以及 `log` 变量决定是否打印指标信息，签名如下：

```ts
export interface IPerProps {
  tracker?: (type: IPerDataType, data: any, allData: any) => void
  log?: boolean
}

export type IPerDataType =
  | 'navigationTime'
  | 'networkInfo'
  | 'paintTime'
  | 'lcp'
  | 'cls'
  | 'fid'
  | 'tbt'
```

接下来我们写 `class` 内部的代码，首先在前文中我们知道了 Performance API 是存在兼容问题的，所以我们需要在调用 Performance 之前判断一下浏览器是否支持：

```ts
export default class Per {
  constructor(args: IPerProps) {
    // 存储参数
    config.tracker = args.tracker
    if (typeof args.log === 'boolean') config.log = args.log
    // 判断是否兼容
    if (!isSupportPerformance) {
      log(`This browser doesn't support Performance API`)
      return
    }
}

export const isSupportPerformance = () => {
  const performance = window.performance
  return (
    performance &&
    !!performance.getEntriesByType &&
    !!performance.now &&
    !!performance.mark
  )
}
```

以上前置工作完毕以后，就可以开始写获取性能指标数据的代码了。

我们首先通过 `performance.getEntriesByType('navigation')` 来获取关于文档事件的指标

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108632582435.png)

这个 API 还是能拿到挺多事件的时间戳的，如果你想了解这些事件具体含义，可以阅读[文档](https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings#performance_timings)，这里就不复制过来占用篇幅了。

看到那么多字段，可能有的读者就晕了，那么多东西我可怎么算指标。其实不需要担心，看完下图结合刚才的[文档](https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings#performance_timings)就行了：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108721308865.jpg)

我们不需要全部利用上获得的字段，重要的指标信息暴露出来即可，照着图和文档依样画葫芦就能得出代码：

```ts
export const getNavigationTime = () => {
  const navigation = window.performance.getEntriesByType('navigation')
  if (navigation.length > 0) {
    const timing = navigation[0] as PerformanceNavigationTiming
    if (timing) {
    //   解构出来的字段，太长不贴
      const {...} = timing

      return {
        redirect: {
          count: redirectCount,
          time: redirectEnd - redirectStart,
        },
        appCache: domainLookupStart - fetchStart,
        // dns lookup time
        dnsTime: domainLookupEnd - domainLookupStart,
        // handshake end - handshake start time
        TCP: connectEnd - connectStart,
        // HTTP head size
        headSize: transferSize - encodedBodySize || 0,
        responseTime: responseEnd - responseStart,
        // Time to First Byte
        TTFB: responseStart - requestStart,
        // fetch resource time
        fetchTime: responseEnd - fetchStart,
        // Service work response time
        workerTime: workerStart > 0 ? responseEnd - workerStart : 0,
        domReady: domContentLoadedEventEnd - fetchStart,
        // DOMContentLoaded time
        DCL: domContentLoadedEventEnd - domContentLoadedEventStart,
      }
    }
  }
  return {}
}
```

大家可以发现以上获得的指标中有不少是和网络有关系的，因此我们还需要结合网络环境来分析，获取网络环境信息很方便，以下是代码：

```ts
export const getNetworkInfo = () => {
  if ('connection' in window.navigator) {
    const connection = window.navigator['connection'] || {}
    const { effectiveType, downlink, rtt, saveData } = connection
    return {
      // 网络类型，4g 3g 这些
      effectiveType,
      // 网络下行速度
      downlink,
      // 发送数据到接受数据的往返时间
      rtt,
      // 打开/请求数据保护模式
      saveData,
    }
  }
  return {}
}
```

拿完以上的指标之后，我们需要用到 `PerformanceObserver` 来拿一些核心体验（性能）指标了。比如说 FP、FCP、FID 等等，内容就包括在我们上文中看过的思维导图中：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108854792871.jpg)

在这之前我们需要先了解一个注意事项：页面是有可能在处于后台的情况下加载的，因此这种情况下获取的指标是不准确的。所以我们需要忽略掉这种情况，通过以下代码来存储一个变量，在获取指标的时候比较一下时间戳来判断是否处于后台中：

```ts
document.addEventListener(
  'visibilitychange',
  (event) => {
    // @ts-ignore
    hiddenTime = Math.min(hiddenTime, event.timeStamp)
  },
  { once: true }
)
```

接下来是获取指标的代码，因为他们获取方式大同小异，所以先把获取方法封装一下：

```ts
// 封装一下 PerformanceObserver，方便后续调用
export const getObserver = (type: string, cb: IPerCallback) => {
  const perfObserver = new PerformanceObserver((entryList) => {
    cb(entryList.getEntries())
  })
  perfObserver.observe({ type, buffered: true })
}
```

我们先来获取 FP 及 FCP 指标：

```ts
export const getPaintTime = () => {
  const data: { [key: string]: number } = ({} = {})
  getObserver('paint', entries => {
    entries.forEach(entry => {
      data[entry.name] = entry.startTime
      if (entry.name === 'first-contentful-paint') {
        getLongTask(entry.startTime)
      }
    })
  })
  return data
}
```

拿到的数据结构长这样：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108855875872.png)

需要注意的是在拿到 FCP 指标以后需要同步开始获取 longtask 的时间，这是因为后续的 TBT 指标需要使用 longtask 来计算。

```ts
export const getLongTask = (fcp: number) => {
  getObserver('longtask', entries => {
    entries.forEach(entry => {
      // get long task time in fcp -> tti
      if (entry.name !== 'self' || entry.startTime < fcp) {
        return
      }
      // long tasks mean time over 50ms
      const blockingTime = entry.duration - 50
      if (blockingTime > 0) tbt += blockingTime
    })
  })
}
```

接下来我们来拿 FID 指标，以下是代码：

```ts
export const getFID = () => {
  getObserver('first-input', entries => {
    entries.forEach(entry => {
      if (entry.startTime < hiddenTime) {
        logIndicator('FID', entry.processingStart - entry.startTime)
        // TBT is in fcp -> tti
        // This data may be inaccurate, because fid >= tti
        logIndicator('TBT', tbt)
      }
    })
  })
}
```

FID 的指标数据长这样，需要用户交互才会触发：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108837705265.png)

在获取 FID 指标以后，我们也去拿了 TBT 指标，但是拿到的数据不一定是准确的。因为 TBT 指标的含义是在 FCP 及 TTI 指标之间的长任务阻塞时间之和，但目前好像没有一个好的方式来获取 TTI 指标数据，所以就用 FID 暂代了。

最后是 CLS 和 LCP 指标，大同小异就贴在一起了：

```ts
export const getLCP = () => {
  getObserver('largest-contentful-paint', entries => {
    entries.forEach(entry => {
      if (entry.startTime < hiddenTime) {
        const { startTime, renderTime, size } = entry
        logIndicator('LCP Update', {
          time: renderTime | startTime,
          size,
        })
      }
    })
  })
}

export const getCLS = () => {
  getObserver('layout-shift', entries => {
    let cls = 0
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        cls += entry.value
      }
    })
    logIndicator('CLS Update', cls)
  })
}
```

拿到的数据结构长这样：

![截屏2021-01-17下午7.37.33](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108834615473.png)
![截屏2021-01-17下午7.37.14](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/01/17/16108834615467.png)

另外这两个指标还和别的不大一样，并不是一成不变的。一旦有新的数据符合指标要求，就会更新。

以上就是我们需要获取的所有性能指标了，当然光获取到指标肯定是不够，还需要暴露每个数据给用户，对于这种统一操作，我们需要封装一个工具函数出来：

```ts
// 打印数据
export const logIndicator = (type: string, data: IPerData) => {
  tracker(type, data)
  if (config.log) return
  // 让 log 好看点
  console.log(
    `%cPer%c${type}`,
    'background: #606060; color: white; padding: 1px 10px; border-top-left-radius: 3px; border-bottom-left-radius: 3px;',
    'background: #1475b2; color: white; padding: 1px 10px; border-top-right-radius: 3px;border-bottom-right-radius: 3px;',
    data
  )
}
export default (type: string, data: IPerData) => {
  const currentType = typeMap[type]
  allData[currentType] = data
  // 如果用户传了回调函数，那么每次在新获取指标以后就把相关信息暴露出去
  config.tracker && config.tracker(currentType, data, allData)
}
```

封装好函数以后，我们可以这样调用：

```ts
logIndicator('FID', entry.processingStart - entry.startTime)
```

结束了，有兴趣的可以来[这里](https://github.com/KieSun/p-cop)读一下源码，反正也没几行。

## 最后

文章周末写的，略显仓促，如有出错请斧正，同时也欢迎大家一起探讨问题。

想看更多文章可以关注我的 [Github](https://github.com/KieSun/FE-advance-road) 或者进群一起聊聊前端工程化。