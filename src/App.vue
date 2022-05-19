<script setup>

import { RouterView } from 'vue-router';
import NavigationBar from './components/navigation/NavigationBar.vue';
import NotificationContainer from './components/notification/NotificationContainer.vue';

</script>

<template>
    <NotificationContainer></NotificationContainer>
    <NavigationBar></NavigationBar>
    <router-view></router-view>
</template>

<style>

body {
    margin: 0px;
}

</style>
