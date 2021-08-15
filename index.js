import env from './env.js'
import fs from 'fs'
import { createServer } from 'http'
import router from './app/Config/Routes.js'

const ROOT_DIR = process.cwd()

const requestListner = async function(req, res) {
    console.log(req.method, req.url, req.connection.remoteAddress);

    //if the request is a public file
    let tmpFileName = ROOT_DIR + "/public" + req.url
    if (req.url != "/" && fs.existsSync(tmpFileName)) {
        res.writeHead(200)
        fs.readFile(tmpFileName, function(err, data) {
            res.write(data);
            return res.end();
          });
    }else{
        res.setHeader('Content-type', 'text/html');
        res.writeHead(200)
        
        res.end(await router.getRoute(req.method,req.url))
    }
}

const server = createServer(requestListner)

server.listen(env.PORT, "0.0.0.0") // to listen for ipv4 only

console.log("port number",env.PORT)
console.log("working directory",ROOT_DIR)