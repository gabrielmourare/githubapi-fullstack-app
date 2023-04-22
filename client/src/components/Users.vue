<template>
<div>
  <h1>Teste</h1>
  <table>
    <thead> Usuários Github </thead>
    <tbody>
      <tr v-for="user of users" :key="user.id">
        <td> <img :src="user.avatar_url"></td>
        <td>{{ user.id }}</td>
        <td>{{ user.login }}</td>
      </tr>
    </tbody>
  </table>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item">
       <button v-on:click="changePreviousPage" tabindex="-1"> Previous</button>
      </li>
      <li class="page-item"><a class="page-link" href="/?page=1">1</a></li>
      <li class="page-item ">
        <a class="page-link" href="/?page=2">2 <span class="sr-only">(current)</span></a>
      </li>
      <li class="page-item"><a class="page-link" href="/?page=3">3</a></li>
      <li class="page-item">
        <button v-on:click="changeNextPage">Next </button>
      </li>
    </ul>
  </nav>

</div>

</template>

<script>
import Users from '../services/Users'

export default {
  data () {
    return {
      users: [],
      previousPage: 0,
      nextPage: 0,
      page: 1
    }
  },

  mounted () {
    Users.listUsers(this.page).then(response => {
      console.log(response)
      this.users = response.data.users
    })
  },
  methods: {
    changeNextPage () {
      this.page += 1
      Users.listUsers(this.page).then(response => {
        this.users = response.data.users
      })
    },
    changePreviousPage () {
      this.page -= 1
      if (this.page === 0) {
        this.page = 1
      }
      Users.listUsers(this.page).then(response => {
        this.users = response.data.users
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img{
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

</style>
