<script setup>
import AppHeader from "./components/layout/AppHeader.vue";
import UserList from "./components/layout/UserList.vue";
</script>

<template>
  <div>
    <AppHeader>
      <template #heading>
        USERS
      </template>
    </AppHeader>
    <main class="container">
      <UserList />
    </main>
  </div>
</template>
