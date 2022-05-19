<script setup>
import { useRouter } from 'vue-router';
import { publicationService } from '../../services/publicationService';
import PublicationView from './PublicationView.vue';

const {data, error, isFinished} = publicationService.useGetAll()

const router = useRouter()

</script>

<template>
    <div v-if="error">Valitettavasti postauksia ei ollut juuri nyt saatavilla.</div>
    <div v-if="!isFinished">Ladataan...</div>
    <div v-else class="container">
        <div class="item" @click="router.push('/publication/'+ publication._id)" v-for="publication in data.publications">
            <PublicationView :publication="publication"></PublicationView>
        </div>
    </div>
</template>

<style scoped>
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 0px;
    margin-bottom: 5px;
    font-size: 14pt;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
}

body {
    margin: 30px;
}
</style>