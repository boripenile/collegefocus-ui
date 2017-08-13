import DashView from '@/components/Dashboard.vue'
import Hello from '@/components/views/Hello.vue'
import LoginView from '@/components/Login.vue'
import RegistrationView from '@/components/Registration.vue'
import ChangePasswordView from '@/components/ChangePassword.vue'
import AccountVerificationView from '@/components/AccountVerification.vue'
import ForgetPasswordView from '@/components/ForgetPassword.vue'
import RegisterSuccessView from '@/components/RegisterSuccess.vue'

// Routes
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Registration',
    component: RegistrationView
  },
  {
    path: '/resetpassword/:code',
    name: 'ChangePassword',
    component: ChangePasswordView
  },
  {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: ForgetPasswordView
  },
  {
    path: '/regsuccess',
    name: 'RegSuccess',
    component: RegisterSuccessView
  },
  {
    path: '/verify/:code',
    name: 'AccountVerification',
    component: AccountVerificationView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'hello',
        name: 'Hello',
        component: Hello
      }
    ]
  }
]

export default routes
