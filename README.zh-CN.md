一：dva 在一个 model中调用另一个model的方法
yield put({type: 'one-namespace/reducerFunction', payload});

二：上线的静态资源的地址，
（一定要注意修改，这个地址，不然 npm run build出现的 /dist/ 目录下 index.html中引用 xxx.css 和 引用 xxx.js 的路径回不对）
"publicPath": "https://www.jichuangtech.site/clothShopCMS2/",
"publicPath": "/",
本地
"publicPath": "/",
[English](./README.md) | 简体中文

三：对于fetch 和 Promise 的时候
response

一个 Promise，resolve 时回传 Response 对象：

属性：
status (number) - HTTP请求结果参数，在100–599 范围
statusText (String) - 服务器返回的状态报告
ok (boolean) - 如果返回200表示请求成功则为true
headers (Headers) - 返回头部信息，下面详细介绍
url (String) - 请求的地址
方法：
text() - 以string的形式生成请求text
json() - 生成JSON.parse(responseText)的结果
blob() - 生成一个Blob
arrayBuffer() - 生成一个ArrayBuffer
formData() - 生成格式化的数据，可用于其他的请求
其他方法：
clone()
Response.error()
Response.redirect()

四：对于dva框架来说，一个model对应一个业务功能的管理类，里面包含：
（1）数据集；（2）更新数据的方法；
其中（1）数据集可以包含对应界面中表单中要提交的数据，在用户的操作过程中，可以将数据更新到该model的数据集中
这样可以保证数据都从一个地方读取，并且修改这个数据的入口也只有dva，可以解决初始值的问题；
（1）数据集中还可以包含 该业务界面中 提供给用户查看的UI数据列表的存储

五：effects: {} 中的 select( state => {} ),中的 state是项目的全部状态，想要取得某个model中数据，需要 state.namespace
# Ant Design Pro

[![](https://img.shields.io/travis/ant-design/ant-design-pro.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design-pro) [![Build status](https://ci.appveyor.com/api/projects/status/67fxu2by3ibvqtat/branch/master?svg=true)](https://ci.appveyor.com/project/afc163/ant-design-pro/branch/master)  [![Gitter](https://badges.gitter.im/ant-design/ant-design-pro.svg)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

开箱即用的中台前端/设计解决方案。

![](https://gw.alipayobjects.com/zos/rmsportal/xEdBqwSzvoSapmnSnYjU.png)

- 预览：http://preview.pro.ant.design
- 首页：http://pro.ant.design/index-cn
- 使用文档：http://pro.ant.design/docs/getting-started-cn
- 更新日志: http://pro.ant.design/docs/changelog-cn
- 常见问题：http://pro.ant.design/docs/faq-cn

六：对于 html元素的 classname属性来添加多个样式，有一下两种方式
1）ES6 模板字符串： className={`title ${index === this.state.active ? 'active' : ''}`}
2）classnames库 ：
 
  //（1）本项目中，在引用样式的时候，需要带对象类名，要将类名绑定到 classnames中
      import classNames from 'classnames/bind';
      const cx = classNames.bind(styles);
      const btnClass = cx({
        btn: true,
        'btn-pressed': this.state.isPressed,
        'btn-over': !this.state.isPressed && this.state.isHovered
      });
  //（2）本项目中，在引用样式的时候，需要带对象类名，因此需要用 [] 将类名和属性名包围起来
    import classNames from 'classnames'; 
    const btnClassNames = classNames({
          [styles.btn]: true,
          [styles.btnShort]: true,
          [styles.btnLong]: true,
    });
  //（3）这种不能直接使用，除非 .btn{}样式是定义在 render() {}相同的 .js文件中
  const btnClass = classNames({
        btn: true,
        'btn-pressed': this.state.isPressed,
        'btn-over': !this.state.isPressed && this.state.isHovered
  });
## 特性

- :gem: **优雅美观**：基于 Ant Design 体系精心设计
- :triangular_ruler: **常见设计模式**：提炼自中后台应用的典型页面和场景
- :rocket: **最新技术栈**：使用 React/dva/antd 等前端前沿技术开发
- :iphone: **响应式**：针对不同屏幕大小设计
- :art: **主题**：可配置的主题满足多样化的品牌诉求
- :globe_with_meridians: **国际化**：内建业界通用的国际化方案
- :gear: **最佳实践**：良好的工程实践助您持续产出高质量代码
- :1234: **Mock 数据**：实用的本地数据调试方案
- :white_check_mark: **UI 测试**：自动化测试保障前端产品质量

## 模板

```
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 使用

```bash
$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1
$ cd ant-design-pro
$ npm install
$ npm start         # 访问 http://localhost:8000
```

也可以使用集成化的 [ant-design-pro-cli](https://github.com/ant-design/ant-design-pro-cli) 工具。

```bash
$ npm install ant-design-pro-cli -g
$ mkdir pro-demo && cd pro-demo
$ pro new
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 兼容性

现代浏览器及 IE11。

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:：

- 在你的公司或个人项目中使用 Ant Design Pro。
- 通过 [Issue](http://github.com/ant-design/ant-design-pro/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/ant-design/ant-design-pro/pulls) 改进 Pro 的代码。
