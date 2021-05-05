# mongodb
- 非关系型数据库（nosql）
## windows安装：
- 下载地址自行百度目前版本 4.4.5，安装社区版本。这个版本是没有tools(数据库工具：导入导出备份)的，如果需要得单独安装，之前的版本是有的最新的分开了
- 不要安装自带的可视化工具，安装时会提示
- 安装之后把安装路径的bin目录配到环境变量里面，否则每次启动都需要在安装路径的bin目录下单独启动。
- mongo.exe:客户端，mongod.exe：服务端，服务端是自行启动的通过配置文件(mongod.cfg)启动的，mongod.cfg配置项：
    - storage存储的位置
    - systemLog日志文件
    - net端口和IP信息
## MAC安装：
- www.github/mongodb/homebrew-brew

- brew tap mongodb/brew
- brew install mongodb-community
- brew services start mongodb-community

> 链接mongo服务 可以直接使用mongo命令， 需要给mongo设置权限，防止被别人访问

> mongo特点 数据库 》 集合 》 文档
##  可视化工具 
- Robo 3T Robomongo（使用方法见图五）  / navicat

## 配置数据库权限
- 先创建mongodb的管理员，来管理数据库

- 查看数据库
```bash
show dbs
```

- 进入admin数据库
```bash
use admin
```

- 创建用户：用户名 密码 角色（root：超级管理员） 用户对应的数据库
```bash
db.createUser({user:"lyp",pwd:"1234qwer",roles:[{role:"root",db:"admin"}]})
```

- 创建好后需要修改配置文件
```bash
security:
  authorization: enabled
```

- （本地调试）重启mongo服务，重启时需要以管理员身份运行才能启动，重启服务之后,启动mongo此时查看数据库是什么都看不到了
- 需要进入我们创建好用户的数据库（此时为admin）,使用用户名密码登录之后返回1证明登录成功了，才能看到所有数据库
```
use admin
db.auth("lyp","1234qwer")
```

- 创建一个数据库：ues 数据库名
```bash
use web
```

- 给web数据库创建一个用户只管理这个数据库
```bash
db.createUser({user:"webAdmin",pwd:"1234qwer",roles:[{role:"dbOwner",db:"web"}]})
```

- 给当前数据库创建一个集合（表），插入一条数据  
- db:当前数据库， 
- user：集合名称，如果没有这个集合插入数据之后默认就有了
- insert()：插入数据
```bash
db.user.insert({name:"lyp"})
```

- 查看数据库的所有集合
```bash
show collections
```

- 查看集合的数据：db.集合名字.find()
```bash
db.user.find()
输出 { "_id" : ObjectId("608d6499bbeadc7596a3a727"), "name" : "lyp" }
```
- objectId的构成 http://www.zhufengpeixun.com/grow/html/29.mongodb-1.html#t8419.1%20ObjectId%E6%9E%84%E6%88%90


## 数据库的基本的增删改查
> mongo的默认的使用方式 很多时候并不友好，而且在开发时 我们也不会直接使用命令行来增删改查
- db.collection.insert()
- db.collection.find()
- db.collection.update()
- db.collection.remove({name: xxx})

## mongoose
- orm工具 方便，而且可以约束存储的内容
- https://mongoosejs.com/docs/guide.html