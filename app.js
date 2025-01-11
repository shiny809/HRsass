const Koa = require('koa')//引入 koa的包
const serve = require('koa-static')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')//koa中间件---专门处理history模式的中间件
const proxy = require('koa2-proxy-middleware')//解决生产环境跨域

const app = new Koa()//实例化一个web服务
app.use(historyApiFallback({
    whiteList: ['/prod-api']//不帮忙处理/prod-api,自己处理
}))//执行中间件,注意顺序
// 配置跨域代理
app.use(proxy({
    targets:{
        '/prod-api/(.*)':{
            changeOrigin:true,
            target: 'https://heimahr.itheima.net/api',//后端服务器地址
            pathRewrite: {
                '/prod-api': ''//课堂上，api加上面，这里把prod-api去掉

            },

            // 或者自己测试下面两种方法也可以
            // target: 'https://heimahr.itheima.net',
            // pathRewrite:{
            //     '/prod-api':'/api'//把prod-api换成 api

            // },
            // target: 'https://heimahr.itheima.net',//直接把地址转化成这样，不加api后缀，可能后台处理了prod-api的地址请求

        }
    }
}))

app.use(serve(__dirname + "/public"))//静态化服务
app.listen(666,function(){
    console.log('人资项目已经启动:访问地址 http://localhost:666');
    
})