import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import {message} from 'antd';
import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';
import './rollbar';
import models from './models/index';


// const app = dva({
//   history,
//   initialState,
//   onError,
//   onAction,
//   onStateChange,
//   onReducer,
//   onEffect,
//   onHmr,
//   extraReducers,
//   extraEnhancers,
// });

import './index.less';
// 1. Initialize 创建dva实例
const app = dva({
    history: createHistory(),
    //   指定初始数据，优先级高于 model 中的 state，默认是 {}
    initialState: {},

});

// 2. Plugins 装在插件（可选）
app.use(createLoading());

// 3. Register global model  注册modal
app.model(require('./models/global').default);
// 下面的做法是全部加载，
// models.forEach((m) => {
//   app.model(m.default);
// });

// 4. Router 配置路由
app.router(require('./router').default);

// 5. Start 启动应用
app.start('#root');


FastClick.attach(document.body);

export default app._store;  // eslint-disable-line
