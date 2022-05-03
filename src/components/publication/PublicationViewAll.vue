<script setup>
// Tuodaan vue:sta ref, eli funktio reaktiivisen datan luomiseksi
import { reactive, ref } from 'vue';
import PublicationView from './PublicationView.vue';

// Reaktiivinen lista julkaisudataa.
// Jos tämä muuttuu, päivitetään sisältö automaattisesti ulkoasuun.
const publications = ref([])

// Toinen tapa tehdä reaktiivinen muuttuja (objekti).
// Voidaan käyttää ref:n sijasta, hyväksyy ainoastaan JS-objektin parametriksi.
// Ref hyväksyy kaikki muut tietotyypit.
const state = reactive({
    error: false
})

// Tehdään asynkroninen funktio jotta voidaan 
// käsitellä ei-tosiaikaista dataa.
const getAllPublications = async ()=>{

    try{
        // Haetaan selaimen fetch työkalua käyttämällä data kurssiprojektin REST rajapinnasta.
    // Asetetaan vastaus response nimiseen muuttujaan, kun await on saanut vastauksen palvelimelta.
    const response = await fetch('https://juhaniguru-web-nosql-python.onrender.com/api/publications')

    // Muutetaan data JSON -muotoon.
    const data = await response.json()

    // Jos tulee jotain muutakuin "200 OK"
    if(response.status > 300) {

        if(response.status == 404) {
            throw new Error("Dataa ei löytynyt.")
        }
        throw new Error(data.msg)
    }

    // Pistetään data talteen reaktiiviseen publications-muuttujaan (päivittää automaattisesti ulkoasun).
    publications.value = data.publications
    }

    catch(e){
        console.log(e)
        state.error = true
    }

}

// Kutsutaan funktiota joka hakee rajapinnasta dataa.
getAllPublications()

</script>

<template>
    <h1>PublicationViewAll OK!</h1>
    <div v-if="state.error">Valitettavasti datan lataaminen ei onnistunut.</div>
    <div v-else class="container">
        <div class="item" v-for="publication,key in publications" :key="key">
            <PublicationView :publication="publication"></PublicationView>
        </div>
    </div>
</template>

<style scoped>
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightblue;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-bottom: 20px;
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
