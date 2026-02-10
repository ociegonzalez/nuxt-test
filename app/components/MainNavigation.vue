<script setup lang="ts">
const links = [
  {name: 'Home', href: '/'},
  {name: 'Products', href: '/products'},
  {name: 'About', href: '/about'},
  {name: 'Pricing', href: '/pricing'},
  {name: 'Contacto', href: '/contact'},
  {name: 'Dashboard', href: '/dashboard'},
]
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in links" :key="link.name">
        <NuxtLink :to="link.href">{{ link.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  padding: 20px;
  background-color: rgba(0, 220, 130, 0.1);
  margin-bottom: 20px;
}

ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

a {
  color: #00dc82;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

a:hover {
  opacity: 0.7;
}

a.router-link-active {
  text-decoration: underline;
}
</style>