export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_ROLES (state, roles) {
    state.roles = roles
  },
  SET_PERMISSIONS (state, permissions) {
    state.permissions = permissions
  },
  SET_ROLE (state, role) {
    state.role = role
  },
  SET_ROLE_PERMISSIONS (state, rolePermissions) {
    state.rolePermissions = rolePermissions
  },
  SET_COUNTRIES (state, countryResponse) {
    state.countryResponse = countryResponse
  }
}
