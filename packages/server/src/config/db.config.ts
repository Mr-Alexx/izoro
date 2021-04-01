// export default {
//   host: '193.112.29.151', // 'localhost',
//   port: 3306,
//   database: 'nestjs',
//   username: 'nestjs',
//   password: 'LwCzMF2fARBid3BZ',
//   charset: 'utf8mb4',
//   timezone: '+08:00',
//   synchronize: true // 设置synchronize可确保每次运行应用程序时实体都将与数据库同步，即可生成表结构
// }

export default {
  host: 'localhost', // 'localhost',
  port: 3306,
  database: 'nestjs',
  username: 'root',
  password: 'imgroot',
  charset: 'utf8mb4',
  timezone: '+08:00',
  synchronize: false// true // 设置synchronize可确保每次运行应用程序时实体都将与数据库同步，即可生成表结构
}

