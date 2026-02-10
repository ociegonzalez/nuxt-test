<script setup lang="ts">

const { data } = await useFetch('/api/home/reviews')

const testimonials = data.value?.map(t => ({
  quote: t.description,
  user: {
    name: t.name,
    avatar: {
      src: t.profileImage,
      atl: `${t.name}'s profile images`
    },
    description: t.subtitle
  }
}))

</script>

<template>
  <UPageSection title="Testimonios" description="Nuestros Testimonios" headline="Los Testimonios" />

  <UPageColumns class="mb-5">
    <UPageCard variant="solid" to="https://cloudflare.com" icon="i-logos-cloudflare-icon"
      title="Cloudflare's Workers LaunchPad"
      description="NuxtHub is part of the Cloudflare's Workers Launchpad Cohort to make sure you get a first-class experience on top of Cloudflare's network."
      :ui="{ leadingIcon: 'size-10' }" />

    <UPageCard v-for="(testimonial, index) in testimonials" :key="index" variant="subtle"
      :description="testimonial.quote" :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }">
      <template #footer>
        <UUser v-bind="testimonial.user" size="xl" />
      </template>
    </UPageCard>
  </UPageColumns>
</template>
