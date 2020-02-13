const Koa = require('koa');
const app = new Koa();
const control = require('./control.js');
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.use(control('config/index.js'))

app.listen(5050, () => {
    console.log(`port in: 5050`)
})

