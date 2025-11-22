const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
  },
  {
    path: '/tour/:slug',
    name: 'TourDetail',
    component: () => import('@/pages/TourDetail.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/pages/Account.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/pages/Signup.vue'),
  },
];
export default routes;
