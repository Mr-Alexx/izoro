## Nest project
1. 全局安装lerna `npm i lerna -g`
2. 安装依赖 `npm run install`
3. 运行项目 `npm run dev`

## Nest 中文文档
[https://docs.nestjs.cn/7](https://docs.nestjs.cn/7)

## 参考
1. [nodepress](https://github.com/surmon-china/nodepress)  
2. [wipi](https://github.com/fantasticit/wipi)

nest-cli 创建控制器快捷方法
`nest g controller 控制器名称`

## 依赖说明
+ `@typegoose/typegoose`  解决单独定义interface和model时修改model又要修改interface的情形，包装了一些装饰器解决这些痛点

https://blog.csdn.net/weixin_43595755/article/details/113786870
https://github.com/definitelytyped/definitelytyped/issues/49950

dbpath=/usr/local/mongodb/db #数据文件保存地址
logpath=/usr/local/mongodb/logs/mongodb.log  #日志保存地址
port=27017  #端口
fork=true #是否后台启动
auth=true #是否开启权限，访问需要用户名和密码
bind_ip=0.0.0.0  #任意ip都能访问
logappend=true

## mongo安装与启动
参考：[https://www.pianshen.com/article/648772922/](https://www.pianshen.com/article/648772922/)
mongodb密码和传统数据如mysql等有些区别： mongodb的用户名和密码是基于特定数据库的，而不是基于整个系统的。所有数据库db都需要设置密码。

1. 查看所有数据库
`show dbs`

2. 进入admin数据库
`use admin`

3. 创建管理员账号
`db.createUser({ user: "admin", pwd: "qq!@#$1234", roles: [{ role: "userAdminAnyDatabase", db: "admin" }] })`
mongodb中的用户是基于身份role的，该管理员账户的 role是 userAdminAnyDatabase。admin用户用于管理账号，不能进行关闭数据库等操作

4. 创建root
`db.createUser({user: "root",pwd: "qq$#@!4321", roles: [ { role: "root", db: "admin" } ]})`
创建完admin管理员，创建一个超级管理员root。角色：root。root角色用于关闭数据库。
`db.shutdownServer()`

5. 创建用户自己的数据库的管理角色
`use qian`
`db.createUser({user: "qian",pwd: "qian!@123",roles: [ { role: "readWrite", db: "qian" } ]})`
role: "dbOwner"代表数据库所有者角色，拥有最高该数据库最高权限。比如新建索引等当账号管理员和超级管理员，可以为自己的数据库创建用户了。（坑）这时候一定，一定要切换到所在数据库上去创建用户，不然创建的用户还是属于admin。

如果是读写角色的话，权限设置为role: "readWrite"

6. 查看用户
`show users`

7. 删除用户
删除用户必须由账号管理员来删，所以，切换到admin角色
`use admin`
`db.auth("admin","password")`

删除单个用户
`db.system.users.remove({user:"XXXXXX"})`

删除所有用户
`db.system.users.remove({})`

8. 连接mongo
可以使用：`mongodb://youruser:yourpassword2@localhost/yourdatabase` 来连接到你的mongo
mongodb://root:qq$#@!4321@localhost/qian
db.auth("user", "pwd")


## nest操作mongo，定义model并生成swagger接口文档
[https://segmentfault.com/a/1190000021868839?utm_source=tag-newest](https://segmentfault.com/a/1190000021868839?utm_source=tag-newest)

nest分析
[https://zhuanlan.zhihu.com/p/161928960](https://zhuanlan.zhihu.com/p/161928960)

[nest swagger](https://liubf.com/2020/01/11/nestjs%e5%85%a5%e9%97%a8swagger%ef%bc%8c%e5%bf%ab%e9%80%9f%e6%90%ad%e5%bb%barestfulapi%e6%96%87%e6%a1%a3/)

### provider说明
[provider含义、使用](https://www.jianshu.com/p/bbed4b83370a)


## Mysql
1. 时间类型比较：`timestamp`和`datetime`
timestamp: 4字节，与时区有关，不同时区显示时间不一样
datetime: 8字节，与时区无关

## 响应拦截、全局错误处理
[https://blog.csdn.net/kuangshp128/article/details/97240664](https://blog.csdn.net/kuangshp128/article/details/97240664)