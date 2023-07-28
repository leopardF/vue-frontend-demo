# project-one

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Nginx部署项目
1、yarn build打包Vue项目，生产dist文件夹
2、打开nginx.conf文件，修改对用的端口下的配置信息
``` 
# nginx.conf
upstream springbootservice {
        server 192.168.219.36:8085;
}
server {
        listen       8080 ;
        server_name gitlab.leopardfeng.com;
        #非GET|HEAD|POST 请求返回403，但docker,nexus不需要做限制

        #if ($request_method !~* GET|HEAD|POST) {
        #   return 403;
        #}

        location / {
            root   D:\vue\workspace\project-one\dist;
            index  index.html index.htm;
            try_files $uri $uri/ @router; #找指定路径下的文件，如果不存在，则转给哪个文件执行 ,#解决页面刷新404问题
        }

        #vue项目路由不是真实存在的,要加上这段代码，解决前端500错误
        location @router {
            rewrite ^.*$ /index.html last;
        }

        #后端接口服务代理请求跳转
        location /api/ {
            proxy_pass http://springbootservice;
        }

}
``` 
3、检查配置文件是否正确 nginx -t, 正常随后启动即可