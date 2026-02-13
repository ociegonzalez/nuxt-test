<script setup lang="ts">
import {FormatCurrency} from "~~/shared/utils/format-currency";

defineProps<{
  product: IProduct;
}>();
</script>

<template>
  <UCard class="w-full" :ui="{ body: 'px-20' }">
    <img
        :src="product.images[0]"
        alt="Product Image"
        class="rounded-md w-full h-52 object-cover"
    />

    <div class="mt-4">
      <h3 class="font-bold text-lg">{{ product.name }}</h3>
      <p class="text-gray-500 text-sm">{{ product.description }}</p>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <p class="text-gray-500 text-sm">{{ FormatCurrency(product.price) }}</p>
        <UButton
            :to="`/product/${product.slug}`"
            color="primary"
            variant="ghost"
            label="Saber más"
        />
      </div>
    </template>
  </UCard>
</template>