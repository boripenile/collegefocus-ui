import store from '../store'

export default {
  showButton (subject, permission) {
    if (subject === '' || permission === '') return false
    var mypermissions = store.state.permissions
    var checked = subject.trim() + ':' + permission.trim()
    if (mypermissions.indexOf(checked) > -1) {
      return true
    }
    return false
  }
}
