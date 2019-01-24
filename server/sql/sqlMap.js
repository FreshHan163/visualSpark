// sql语句映射文件，以供api逻辑调用
// sql语句
var sqlMap = {
  // 用户
  test: {
    add: 'insert into test values(15, ?, ?)',
    queryAll: 'select * from test',
    getUserById: 'select * from test where id = ?'
  }
}
module.exports = sqlMap;
