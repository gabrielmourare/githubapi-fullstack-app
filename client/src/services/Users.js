import {Api} from './api'

export default {
  listUsers: (page) => {
    return Api.get('/', {
      params: {
        page: page
      }
    })
  }
}
