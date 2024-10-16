import { createRouter, createWebHistory } from 'vue-router'
import PublicationViewAll from "./components/publication/PublicationViewAll.vue"
import UsersView from "./components/user/UsersView.vue"
import PublicationCreate from "./components/publication/PublicationCreate.vue"
import PublicationViewDetails from "./components/publication/PublicationViewDetails.vue"
import RegistrationView from "./components/registration/RegistrationView.vue"
import { isAuth } from './store'

export const router = createRouter({

    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Julkaisut",
            component: PublicationViewAll
        },
        {
            path: "/create",
            name: "Uusi postaus",
            component: PublicationCreate
        },
        {
            path: "/users",
            name: "Käyttäjät",
            component: UsersView
        },
        {
            path: "/publication/:publicationId",
            name: "Yksittäinen postaus",
            component: PublicationViewDetails,
            props: true
        },
        {
            path: "/register",
            name: "Rekisteröidy",
            component: RegistrationView
        }
    ]

})


router.beforeEach((to, from, next)=>{
    if (to.path === '/users' && !isAuth.value){
        next("/")
    } else {
        next()
    }
})
