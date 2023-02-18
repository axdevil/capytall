const con = require('../config/connection')
const userModel = require('../model/userModel')

const global = require('../public/javascripts/global')

module.exports = {
    index:function(req,res){
        userModel.get(con,function(err,data){
            res.render('user/tableUser',{users:data})
        })
    },
    signUp:function(req,res){
        res.render('user/signUp',{errors: [],values: []})
    },
    signIn:function(req,res){
        res.render('user/signIn',{errors: [], emailValue: null})
    },
    insert:function(req,res){
        const body = req.body
        var errors = []
        var values = []

        values.push(body.name)
        values.push(body.lastname)
        values.push(body.email)

        if(global.isBlank(body.name)){
            errors.push('Ingresa tu nombre')
        }else if(global.isMin(body.name.length,3)){
            errors.push('El nombre debe contener minimo tres caracteres')
        }
        if(global.isBlank(body.lastname)){
            errors.push('Ingresa tu apellido')
        }else if(global.isMin(body.lastname.length,3)){
            errors.push('El apellido debe contener minimo tres caracteres')
        }
        if(!global.isEmail(body.email)){
            errors.push("Ingresa un correo valido")
        }
        if(global.isMin(body.password.length,1)){
            errors.push("Ingresa una contraseña")
        }else if(global.isMin(body.password.length,6)){
            errors.push("La contraseña debe contener minimo seis caracteres")
        }else if(global.notSpace(body.password)){
            errors.push("La contraseña no debe contener espacios")
        }
        if(global.isMin(body.confirmPassword,1)){
            errors.push("Confima la contraseña")
        }else if(!global.equals(body.confirmPassword,body.password)){
            errors.push("La contraseña no coinciden")
        }

        if(errors.length == 0){
            userModel.searchByEmail(con,body.email,function(err,data){
                if(data.length == 1){
                    errors.push("Correo ya registrado")
                    values[2] = ""
                    res.render('user/signUp',{errors: errors,values: values})
                }else{
                    userModel.set(con,req.body,function(){
                        res.render('user/signIn',{errors: [], emailValue: body.email})
                    })
                }
            })
        }else{
            res.render('user/signUp',{errors: errors,values: values})
        }
    },
    initUser:function(req,res){
        const body = req.body
        var errors = []

        if(!global.isEmail(body.email)){
            errors.push("Ingresa un correo valido")
        }
        if(global.isMin(body.password.length,1)){
            errors.push("Ingresa tu contraseña")
        }

        if(errors.length == 0){
            userModel.searchByEmail(con,body.email,function(err,data){
                if(data.length == 1){
                    userModel.searchByEmailAndPass(con,req.body,function(err,data){
                        if(data.length == 1){
                            //Aqui va el login
                            res.redirect('/user')
                        }else{
                            errors.push("Contraseña incorrecta")
                            res.render('user/signIn',{errors: errors, emailValue: body.email})
                        }
                    })
                }else{
                    errors.push("Este correo no ha sido registrado")
                    res.render('user/signIn',{errors: errors, emailValue: body.email})
                }
            })
        }else{
            res.render('user/signIn',{errors: errors, emailValue: body.email})
        }
    }
}