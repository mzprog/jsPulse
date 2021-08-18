import ejs from 'ejs'

const viewsDir = "app/View/"

export function view(name, data={}){
    let filename = viewsDir + name + ".ejs"
    var resStr;
     ejs.renderFile(filename, data, (err, str) =>{
        resStr =  str
    })
    return resStr
}