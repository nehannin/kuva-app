<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { userService } from '../../services/userService';
import { isAuth } from '../../store';

const { data, error, isFinished } = userService.useGetAll()

const router = useRouter()

watch(isAuth, ()=>{
    if(!isAuth.value){
        router.push("/")
    }
})

</script>

<template>
    <h1>Käyttäjät</h1>
    
    <div v-if="error">Tapahtui virhe</div>
    <div v-else-if="!isFinished">Ladataan...</div>
    <div v-else-if="data?.users">
    
    <div v-for="user in data.users">
        {{ user.username }}
    </div>

    </div>
</template>

<style>

    body {
        background-color: darkcyan;
        color: black;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 14pt;
    }

    h1 {
        font-size: 14pt;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: black;
    }

</style>
