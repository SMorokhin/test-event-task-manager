import Vue from 'vue'
import VueRouter from 'vue-router'
import EventDescription from '../components/eventDescription/EventDescription.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'EventDescription',
    component: EventDescription,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
