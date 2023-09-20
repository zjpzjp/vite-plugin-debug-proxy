// import httpProxy from 'http-proxy'
const httpProxy = require("http-proxy")
const proxy = httpProxy.createProxyServer({
    secure: false
})

module.exports = () => ({
    name: 'debug-proxy',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            let u = new URL(req.url, 'http://localhost')
            if (u.pathname.startsWith('/api/')) {
                let urlObj = new URL(req.headers.referer)
                var debug = urlObj.search.slice(1).match(new RegExp('(^|&)debug=([^&]*)(&|$)', 'i'))
                debug = debug ? debug[2] : 'http://www.baidu.com'
                req.url = req.url.replace(/^\/api/, '')
                proxy.web(req, res, {
                    changeOrigin: true,
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