import Vue from 'vue'
import VueRouter from 'vue-router'
// import EventDescription from '../components/eventDescription/EventDescription.vue'
import EventDescriptionContainer from '../Containers/EventDescriptionContainer'
import UpdateEventDialog from '../components/eventDescription/updateEventDialog/UpdateEventDialog'
import CreateEventDialog from '../components/eventDescription/createEventDialog/CreateEventDialog'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'events.event',
    component: EventDescriptionContainer,
    props: true,
    children: [{
      path: 'update',
      name: 'events.event.update',
      props: true,
      component: UpdateEventDialog
    }]
  },
  {
    path: '/create',
    name: 'events.event.create',
    component: CreateEventDialog
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
