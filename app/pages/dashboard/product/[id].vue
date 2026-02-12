<template>
  <h1>Admin Prodcut Page</h1>
  <h3>{{ rawId }}</h3>
</template>

<script lang="ts" setup>

const route = useRoute()

const rawId = route.params.id as string

</script>

<style></style>
