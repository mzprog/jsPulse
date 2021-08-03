import { createServer } from 'http'

const port = 9090
const ROOT_DIR = process.cwd()

const requestListner = function(req, res) {
    res.writeHead(200)
    res.write("Guest Here...")
    console.log(req.url, req.method)
    res.end('Hello, World!')
}

const server = createServer(requestListner)

server.listen(port)
console.log("port number",port)
console.log("working directory",ROOT_DIR)