<script setup>
import { computed, reactive, ref } from 'vue'
import { registrationService } from '../../services/registrationService'

const confirmPassword = ref('')

const isRegistrationSuccessful = ref(false)

const userData = reactive({
    username: '',
    password: '',
    email: ''
})

const regex = /^[A-Za-z0-9]+$/

const dataValidation = computed(()=>{
    const isUserNameValid = userData.username.length > 2 && regex.test(userData.username)
    const isEmailValid = userData.email.includes('@') && userData.email.includes('.')
    const isPasswordValid = userData.password.length > 7
    const isPasswordConfirmed = userData.password === confirmPassword.value
    const isAllValid = isUserNameValid && isEmailValid && isPasswordValid && isPasswordConfirmed

    return{
        isUserNameValid,
        isEmailValid,
        isPasswordValid,
        isPasswordConfirmed,
        isAllValid
    }
})

const register = async ()=>{

    if(!dataValidation.value.isAllValid){
        return
    }

    const {data, error, statusCode} = await registrationService.useRegister(userData)

    if(!error.value && data.value && statusCode.value == 200){
        isRegistrationSuccessful.value = true
    } else {
        console.log(data.value, error.value, statusCode.value)
    }
}

</script>

<template>

    <div v-if="isRegistrationSuccessful">Rekisteröityminen onnistui! Nyt voit kirjautua sisään.</div>

    <form v-else @submit.prevent="register">

        <label>Käyttäjänimi</label>
        <label></label>
        <small v-if="!dataValidation.isUserNameValid">Käyttäjänimi on liian lyhyt tai se sisältää erikoismerkkejä</small>
        <input v-model="userData.username" type="text">


        <label>Sähköposti</label>
        <small v-if="!dataValidation.isEmailValid">Tarkista sähköposti</small>
        <input v-model="userData.email" type="email">

        <label>Salasana</label>
        <small v-if="!dataValidation.isPasswordValid">Salasanan tulee olla vähintään 8 merkkiä pitkä</small>
        <input v-model="userData.password" type="password">

        <label>Toista salasana</label>
        <small v-if="!dataValidation.isPasswordConfirmed">Salasana ei täsmää</small>
        <input v-model="confirmPassword" type="password">

        <button :disabled="!dataValidation.isAllValid" type="submit">Rekisteröidy</button>

    </form> 

</template>

<style scoped>

button {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: black;
    font-size: 17px;
    margin-top: 1%;
}

label {
    font-size: 23px;
}

form {
    display: flex;
    flex-direction: column;
    width: 400px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 20px;
}

</style>