import fs from 'fs'
import { createServer } from 'http'
import router from './app/Config/Routes.js'

const port = 9090
const ROOT_DIR = process.cwd()

const requestListner = async function(req, res) {
    //if the request is a public file
    let tmpFileName = ROOT_DIR + "/public" + req.url
    console.log(tmpFileName)
    if (req.url != "/" && fs.existsSync(tmpFileName)) {
        res.writeHead(200)
        fs.readFile(tmpFileName, function(err, data) {
            console.log(err)
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

server.listen(port)
console.log("port number",port)
console.log("working directory",ROOT_DIR)