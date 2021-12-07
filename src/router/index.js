import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import EventDescription from '../components/eventDescription/EventDescription.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'EventDescription',
    component: EventDescription
    // children: [
    //   {
    //     path: 'id',
    //     component: EventDescription
    //   }
    // ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
