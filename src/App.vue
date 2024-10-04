<template>
  <div id="app">
    <header v-if="isLoggedIn">
      <div class="hamburger" @click="toggleMenu">☰</div>
      <div class="menu" :class="{ 'active': menuActive }">
        <p>{{ username }}</p>
        <a href="#" @click="logout">Cerrar sesión</a>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isAuthenticated)
const username = computed(() => authStore.user)
const menuActive = ref(false)

const toggleMenu = () => {
  menuActive.value = !menuActive.value
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ffffff;
}

header {
  background-color: #3498db;
  padding: 10px;
  position: relative;
}

.hamburger {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

.menu {
  display: none;
  position: absolute;
  right: 10px;
  top: 40px;
  background-color: white;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.menu.active {
  display: block;
}

.menu p {
  margin: 0 0 10px 0;
  font-weight: bold;
  color: #2c3e50;
}

.menu a {
  color: #3498db;
  text-decoration: none;
}

.menu a:hover {
  text-decoration: underline;
  color: #2980b9;
}
</style>