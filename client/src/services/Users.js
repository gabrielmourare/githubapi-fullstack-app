import {Api} from './api'

export default {
  listUsers: () => {
    return Api.get('/')
  }
}
