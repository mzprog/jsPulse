import { createServer } from 'http'
import router from './app/Config/Routes.js'

const port = 9090
const ROOT_DIR = process.cwd()

const requestListner = function(req, res) {

    res.setHeader('Content-type', 'text/html');
    res.writeHead(200)
    
    res.write("<b>route</b> to: "+router.find(req.method,req.url))
    res.end('Hello, World!')
}

const server = createServer(requestListner)

server.listen(port)
console.log("port number",port)
console.log("working directory",ROOT_DIR)