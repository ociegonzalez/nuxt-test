<script setup lang="ts">

</script>

<template>
  <div>
    <UDashboardGroup storage="local" storage-key="dashboard-sidbar" :persistant="true">
      <DashboardSidebar/>
      <UDashboardPanel>
        <DashboardNavbar/>
        <div class="flex-1 overflow-auto p-6">
          <slot/>
        </div>
      </UDashboardPanel>
    </UDashboardGroup>
  </div>
</template>

<style scoped>

</style>