var mysql = require("mysql")
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'capytall'
})

con.connect(
    (err)=>{
        if(!err){
            console.log('Conexion correcta')
        }else{
            console.log('Error de conexion')
        }
    }
)

module.exports=con