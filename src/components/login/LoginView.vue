<script setup>
import { onClickOutside } from '@vueuse/core';
import { inject, reactive, ref } from 'vue'
import { authService } from '../../services/authService'
import { RouterLink } from 'vue-router';

const showLoginView = inject('showLogin')

const credentials = reactive({
    username: '',
    password: ''
})

const target = ref(null)

onClickOutside(target, ()=>{
    showLoginView.value = false
})

const login = async ()=>{
    await authService.useLogin(credentials)

    credentials.username = ''
    credentials.password = ''
}

</script>

<template>
    <form class="login" ref="target" @submit.prevent="login">
        <label>Käyttäjänimi</label>
        <input v-model="credentials.username" type="text">

        <label>Salasana</label>
        <input v-model="credentials.password" type="password">

        <router-link class="tab-item" to="/register" @click="showLoginView = false">Rekisteröidy tästä</router-link>

        <button type="submit">Kirjaudu</button>
    </form>
</template>

<style>

.login {
    width: 250px;
    position: fixed;
    left: 50%;
    right: 50%;
    top: 50%;
    display: flex;
    flex-flow: column wrap;
    background-color: darkslategray;
    transform: translateX(-50%) translateY(-50%);
    padding: 20px;
    font-size: 14pt;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
    color: black;
}

input, label {
    margin-top: 6px;
}

.tab-item {
    color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 14pt;
    display: flex;
    justify-content: space-evenly;
}

button {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 12pt;
    display: flex;
    justify-content: space-evenly;
}

</style>