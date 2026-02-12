<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const { isLoggedIn, logout } = useAuthentication();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Productos",
    to: "/products",
    icon: "i-lucide-book-open",
    active: route.path.startsWith("/products"),
  },
  {
    label: "Precios",
    to: "/pricing",
    icon: "i-lucide-box",
    active: route.path.startsWith("/pricing"),
  },
  {
    label: "Nosotros",
    icon: "i-simple-icons-figma",
    to: "/about",
    active: route.path.startsWith("/about"),
  },
  {
    label: "Contacto",
    icon: "i-lucide-rocket",
    to: "/contact",
    active: route.path.startsWith("/contact"),
  },
]);

const responsiveMenu = ref([
  ...items.value,
  {
    label: "Login",
    to: "/login",
    icon: "i-heroicons-user-circle",
    active: route.path.startsWith("/login"),
  },
]);
</script>

<template>
  <UHeader
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full',
    }"
  >
    <template #title>
      <IconsNuxtui />
    </template>

    <UNavigationMenu :items="items" />

    <!-- <ClientOnly>
      <UNavigationMenu
        :items="[
          {
            label: 'Dashboard',
            to: '/dashboard',
          },
        ]"
      />
    </ClientOnly> -->

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>

      <ClientOnly>
        <UButton
          
          color="primary"
          variant="solid"
          icon="i-heroicons-user-circle"
          to="/login"
          label="Login"
        />
        <UButton
          
          variant="ghost"
          icon="i-heroicons-user-circle"
          label="Logout"
          @click="logout"
        />
      </ClientOnly>
    </template>

    <template #body>
      <UNavigationMenu
        :items="responsiveMenu"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
