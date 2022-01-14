import Vue from 'vue'
import VueRouter from 'vue-router'
// import EventDescription from '../components/eventDescription/EventDescription.vue'
import EventDescriptionContainer from '../Containers/EventDescriptionContainer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'EventDescriptionContainer',
    component: EventDescriptionContainer,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
