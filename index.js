const httpProxy = require("http-proxy")
const proxy = httpProxy.createProxyServer({
    secure: false
})

module.exports = (options) => ({
    name: 'debug-proxy',
    configureServer(server) {
        options = Object.assign(
            {
                path: '/api',
                default: 'https://www.baidu.com',
                changeOrigin: true
            },
            options
        )
        server.middlewares.use((req, res, next) => {
            if (options.path instanceof RegExp === false) {
                options.path = new RegExp('^' + options.path)
            }
            let u = new URL(req.url, 'http://localhost')
            if (options.path.test(u.pathname)) {
                let urlObj = new URL(req.headers.referer)
                var debug = urlObj.search.slice(1).match(new RegExp('(^|&)debug=([^&]*)(&|$)', 'i'))
                debug = debug ? debug[2] : options.default
                req.url = req.url.replace(options.path, '')
                proxy.web(req, res, {
                    changeOrigin: options.changeOrigin,
                    target: debug
                })
                proxy.on('error', (err) => {
                    res.statusCode = 500
                    res.end(err.message)
                })
            } else {
                next()
            }
        })
    }
})