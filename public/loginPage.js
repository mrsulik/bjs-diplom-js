'use strict'

const form = new UserForm()

form.loginFormCallback = function(data) {
    const {login, password} = data

    ApiConnector.login({login, password}, res => {
        if(res.success) location.reload()
        else form.setLoginErrorMessage(res.error)
    })
}

form.registerFormCallback = function(data) {
    const {login, password} = data

    ApiConnector.register({login, password}, res => {
        if(res.success) location.reload()
        else form.setRegisterErrorMessage(res.error)
    })
}