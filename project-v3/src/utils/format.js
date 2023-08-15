
export function formatDate(cellValue) {
    if (cellValue == null || cellValue == "") return "";
    var date = new Date(cellValue) 
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() 
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() 
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() 
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  }

  export function packageMenus(data){
    let temp = [];
    if (data, data?.length > 0) {
      data.forEach(item => {
        const childrenTemp = [];
        if (item.childrenList && item.childrenList.length > 0) {
          packageMenus(item.childrenList).forEach(info => {
            childrenTemp.push(info)
          })
        }
        let tempRoute = {}
        tempRoute.id = item.id
        tempRoute.name = item.menuName
        tempRoute.path = item.menuUrl
        tempRoute.iconClass = item.iconClazz
        tempRoute.meta = {
          label : item.menuName
        }
        tempRoute.hidden = item.isHidden === undefined ? false : item.isHidden
        if (item.redirect) {
          tempRoute.redirect = item.redirect
        }
        // tempRoute.component = () => import(`@/components` + item.pageUrl) //懒加载
        const pageUrl = item.pageUrl ? item.pageUrl : "/Home"
        // console.log(tempRoute.name ,pageUrl);
        tempRoute.component = require(`@/components` + pageUrl).default //懒加载
        tempRoute.children = childrenTemp
        temp.push(tempRoute)
      })
    }

    return temp;
}