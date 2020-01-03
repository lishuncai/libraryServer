require('./logConfig')()
const express = require('express');
const app = express();

const path = require('path')
const mongoJs = require('./mongo')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');  // 导入 catalog 路由
const bodyParser = require('body-parser');

logger.error('\nNODE_ENV =============== ', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
} else {
  logger.warn('\n非开发环境 ')
}
mongoJs()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // 将 catalog 路由添加进中间件链

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.listen(8000, () => {
  logger.warn('\n示例程序正在监听 8000 端口！')
});

module.exports = app