
//登录名匹配
export function loginNameRule(rule, value, callback) {
    //请输入4-10位昵称
    let reg = /(^[a-zA-Z0-9]{4,10}$)/;
    if (value === "") {
        callback(new Error('请输入登录名'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入4-10位登录名'))
    } else {
        callback()
    }
}

//用户名匹配
export function userNameRule(rule, value, callback) {
    //请输入4-10位昵称
    let reg = /(^[a-zA-Z0-9\u4e00-\u9fa5]{4,10}$)/
    if (value === "") {
        callback(new Error('请输入用户名'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入4-10位昵称用户名'))
    } else {
        callback()
    }
}

//密码匹配
export function passRule(rule, value, callback) {
    let pass = /^\S*(?=\S[6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    if (value === "") {
        callback(new Error('请输入密码'))
    } else if (!pass.test(value)) {
        callback(new Error('请输入6-12位密码需要包含大小写字符和数字及特殊符号'))
    } else {
        callback()
    }
}

//手机号匹配
export function telephoneRule(rule, value, callback) {
    let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    if (value === "") {
        callback(new Error('请输入手机号'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入11位中国手机号码'))
    } else {
        callback()
    }
}