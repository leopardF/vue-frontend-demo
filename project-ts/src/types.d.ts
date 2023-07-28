export interface IUserData {
    username: string ;
    password: string ;
}
// ts对数据结构的准备性的限制很严格
// IUserData , 传递任意多个属性或者少个属性都会报错