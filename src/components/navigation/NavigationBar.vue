<script setup>
import { onMounted, onUnmounted, provide, ref } from 'vue';
import {RouterLink} from 'vue-router'
import { authService } from '../../services/authService';
import { isAuth } from '../../store';
import LoginView from '../login/LoginView.vue'
import { Home, Account, Plus, Login, Logout } from 'mdue'

const showLoginView = ref(false)

provide('showLogin', showLoginView)

const width = ref(0)

const setScreenWidth = ()=>{
    width.value = window.innerWidth
}

onMounted(()=>{
    setScreenWidth()
    window.addEventListener('resize', setScreenWidth)
})

onUnmounted(()=>{
    window.removeEventListener('resize', setScreenWidth)
})

const logout = ()=>{
   authService.useLogout()
}

</script>

<template>
    <div v-if="width > 600" class="nav">
        <router-link to="/">Koti</router-link>
        <router-link to="/create">Uusi Postaus</router-link>
        <router-link v-if="isAuth" to="/users">Käyttäjät</router-link>
        <a href="#" v-if="isAuth" @click.prevent="logout">Kirjaudu Ulos</a>
        <a href="#" v-else @click.prevent="showLoginView = !showLoginView">Kirjaudu</a>
    </div>

    <div v-else class="nav-mobile">

        <router-link to="/">
            <Home class="icon"></Home>
        </router-link>

        <router-link to="/create">
            <Plus class="icon"></Plus>
        </router-link>

        <router-link v-if="isAuth" to="/users">
            <account class="icon"></account>
        </router-link>

        <a href="#" v-if="isAuth" @click.prevent="logout">
            <Logout class="icon"></Logout>
        </a>

        <a href="#" v-else @click.prevent="showLoginView = !showLoginView">
            <login class="icon"></login>
        </a>

    </div>

    <LoginView v-if="showLoginView && !isAuth"></LoginView>

</template>

<style>

.icon {
    color: darkcyan;
    font-size: 22px;
}

.nav-mobile {
    position: fixed;
    bottom: 0px;
    background-color: whitesmoke;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.nav {
    display: flex;
    justify-content: center;
    background-color: whitesmoke;
}

a {
    margin: 15px;
    color: black;
    font-size: 15pt;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

</style>