<template>
  <div>
    <h1>Teste</h1>
    <table>
      <thead>
        Usuários Github
      </thead>
      <tbody>
        <tr v-for="user of users" :key="user.id">
          <td><img :src="user.avatar_url" /></td>
          <td>{{ user.id }}</td>
          <td>{{ user.login }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <td>
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item">
                  <button class="btn btn-light" v-on:click="changePreviousPage">
                    Previous
                  </button>
                </li>
                <li class="page-item">
                  <button class="btn btn-light" @click="changePreviousPage" :key="this.previousPage">
                    {{ this.previousPage }}
                  </button>
                </li>
                <li class="page-item ">
                  <button class="btn btn-dark">{{ this.page }}</button>
                </li>
                <li class="page-item">
                  <button class="btn btn-light" @click="changeNextPage" :key="this.nextPage">
                    {{ this.nextPage }}
                  </button>
                </li>
                <li class="page-item">
                  <button class="btn btn-light" v-on:click="changeNextPage">
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </td>
        </tr>
      </tbody>
    </table>
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
      this.previousPage = response.data.previousPage
      this.nextPage = response.data.nextPage
    })
  },
  methods: {
    changeNextPage () {
      this.page += 1
      Users.listUsers(this.page).then(response => {
        this.users = response.data.users
        this.previousPage = response.data.previousPage
        this.nextPage = response.data.nextPage
      })
    },
    changePreviousPage () {
      this.page -= 1
      if (this.page === 0) {
        this.page = 1
      }
      Users.listUsers(this.page).then(response => {
        this.users = response.data.users
        this.previousPage = response.data.previousPage
        this.nextPage = response.data.nextPage
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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

img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

table {
  width: 100%;
}

nav {
  width: 100%;
}
</style>
