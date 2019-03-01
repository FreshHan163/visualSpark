<template>
  <div class="express">
    <h1>{{ msg }}</h1>
    <form>
      <label for="username" class="input-label">用户名</label>
      <input type="text" name="username" v-model="userName" class="input-text"/>
      <br>
      <label for="age" class="input-label">年龄</label>
      <input type="text" name="age" v-model="age" class="input-text"/>
      <br>
      <a href="javascript:;" @click="getUserList" class="btn">点击提交</a>
    </form>
    <table v-if="userList.length > 0">
      <th>
        <td>序号</td>
        <td>用户名</td>
        <td>年龄</td>
      </th>
      <tr v-for="item in userList">
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.age }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ExpressPart',
  data () {
    return {
      msg: 'Welcome to first express + mysql + vue',
      userName: '',
      age: '',
      index: 1,
      userList: []
    }
  },
  created() {
    this.getUserDetail();
  },
  methods: {
    getUserDetail() {
      this.axios.post('/api/getUserById', {
        id: 12
      }, {}).then((res) => {
        console.log('get请求返回数据',res);
      });
    },
    addUser() {
      var name = this.userName;
      var age = this.age;
      // console.log(this.axios);
      // this.axios.get('/api/addUser').then((res) => {
      //   console.log(res);
      // }, (err) => {
      //   console.log(err);
      // });
      var index = this.index + 1;
      this.index = index;
      this.axios.post('/api/addUser', {
        id: index,
        username: name,
        age: age
      }, {}).then((res) => {
        console.log(res);
      });
    },
    getUserList() {
      this.axios.get('/api/getUser').then((res) => {
        this.userList = res.body;
        console.log(res);
      });

    }
  }

}
</script>

<style lang="less">
.express {
  background-color: #fff;
  .btn {
    background-color: powderblue;
    border-radius: 3px;
  }
  .input-label {
    width: 50px;
  }
  .input-text {
    margin: 5px;
    padding: 5px 8px;
    border-radius: 3px;
  }

}

</style>
