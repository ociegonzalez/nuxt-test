<template>
  <div class="space-y-8 mx-auto max-w-4xl">
    <section class="space-y-1">
      <h1 class="font-bold text-gray-900 dark:text-white text-3xl">
        {{ pageTitle }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ subtitle }}
      </p>
    </section>

    <div
      v-if="pending"
      class="bg-white dark:bg-gray-900 shadow-sm p-6 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
    >
      Cargando producto...
    </div>

    <div
      v-else-if="!isCreating && !newProduct"
      class="bg-amber-50 dark:bg-amber-500/10 shadow-sm p-6 border border-amber-200 dark:border-amber-500/40 rounded-lg text-amber-800 dark:text-amber-200"
    >
      No encontramos el producto solicitado.
    </div>

    <div v-if="newProduct" class="space-y-6">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div class="space-y-2">
            <label
              class="font-medium text-gray-700 dark:text-gray-200 text-sm"
              for="product-slug"
            >
              Slug
            </label>
            <input
              id="product-slug"
              v-model="newProduct.slug"
              type="text"
              :class="[
                'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                fieldErrors.slug
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
              ]"
              placeholder="ejemplo-producto"
              autocomplete="off"
            />
            <p v-if="fieldErrors.slug" class="text-red-600 text-sm">
              {{ fieldErrors.slug }}
            </p>
          </div>

          <div class="space-y-2">
            <label
              class="font-medium text-gray-700 dark:text-gray-200 text-sm"
              for="product-name"
            >
              Nombre
            </label>
            <input
              id="product-name"
              v-model="newProduct.name"
              type="text"
              :class="[
                'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                fieldErrors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
              ]"
              placeholder="Nombre del producto"
              autocomplete="off"
            />
            <p v-if="fieldErrors.name" class="text-red-600 text-sm">
              {{ fieldErrors.name }}
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="font-medium text-gray-700 dark:text-gray-200 text-sm"
            for="product-description"
          >
            Descripción
          </label>
          <textarea
            id="product-description"
            v-model="newProduct.description"
            rows="4"
            :class="[
              'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
              fieldErrors.description
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
            ]"
            placeholder="Describe el producto con claridad..."
          />

          <p v-if="fieldErrors.description" class="text-red-600 text-sm">
            {{ fieldErrors.description }}
          </p>
        </div>

        <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                class="font-medium text-gray-700 dark:text-gray-200 text-sm"
                for="product-price"
              >
                Precio (entero)
              </label>
              <input
                id="product-price"
                v-model="newProduct.price"
                type="number"
                min="0"
                step="1"
                :class="[
                  'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                  fieldErrors.price
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
                ]"
                placeholder="0"
              />
              <p v-if="fieldErrors.price" class="text-red-600 text-sm">
                {{ fieldErrors.price }}
              </p>
            </div>

            <div class="space-y-2">
              <label
                class="font-medium text-gray-700 dark:text-gray-200 text-sm"
                for="product-tags"
              >
                Etiquetas
              </label>
              <input
                id="product-tags"
                v-model="newProduct.tags"
                type="text"
                :class="[
                  'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                  fieldErrors.tagsInput
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
                ]"
                placeholder="etiqueta uno, etiqueta dos"
                autocomplete="off"
              />
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                Ingresa etiquetas separadas por comas.
              </p>
              <p v-if="fieldErrors.tagsInput" class="text-red-600 text-sm">
                {{ fieldErrors.tagsInput }}
              </p>
            </div>
          </div>

          <div v-if="!isCreating" class="space-y-3">
            <label
              class="font-medium text-gray-700 dark:text-gray-200 text-sm"
              for="product-images"
            >
              Imágenes
            </label>
            <div v-if="newProduct.images.length > 0" class="space-y-3">
              <div
                class="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  :src="newProduct.images[selectedImageIndex]"
                  alt="Previsualización principal del producto"
                  class="w-full h-64 object-cover"
                />
              </div>
              <div class="gap-3 grid grid-cols-1 sm:grid-cols-3">
                <button
                  v-for="(image, index) in newProduct.images"
                  :key="image + index"
                  type="button"
                  class="border-2 rounded-md overflow-hidden transition"
                  :class="
                    selectedImageIndex === index
                      ? 'border-blue-500'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  "
                  @click="selectedImageIndex = index"
                >
                  <img
                    :src="image"
                    :alt="`Previsualización ${index + 1}`"
                    class="w-full h-20 object-cover"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
            <UInput
              v-if="!isCreating"
              type="file"
              multiple
              id="product-images"
              rows="4"
              :class="[
                'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                fieldErrors.imagesInput
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
              ]"
            />
            <!-- <textarea id="product-images" v-model="newProduct.images" rows="4" :class="[
              'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
              fieldErrors.imagesInput
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
            ]" placeholder="https://ejemplo.com/imagen-1.jpg" /> -->
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              Ingresa una URL por línea.
            </p>
            <p v-if="fieldErrors.imagesInput" class="text-red-600 text-sm">
              {{ fieldErrors.imagesInput }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <UButton
            type="submit"
            color="primary"
            variant="solid"
            :disabled="isSubmitting"
            icon="i-lucide-save"
          >
            {{ isSubmitting ? "Guardando..." : "Guardar producto" }}
          </UButton>
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            icon="i-lucide-x"
            @click="handleCancel"
          >
            Cancelar
          </UButton>
        </div>
      </form>

      <section
        v-if="!isCreating && product"
        class="bg-white dark:bg-gray-900 shadow-sm p-6 border border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <h2 class="font-semibold text-gray-900 dark:text-white text-lg">
          Metadatos
        </h2>
        <dl class="gap-4 grid sm:grid-cols-2 mt-4">
          <div class="space-y-1">
            <dt class="font-medium text-gray-600 dark:text-gray-400 text-sm">
              Creado
            </dt>
            <dd class="text-gray-900 dark:text-gray-100">
              {{ longDateTimeFormat(new Date(product?.createdAt!)) }}
            </dd>
          </div>
          <div class="space-y-1">
            <dt class="font-medium text-gray-600 dark:text-gray-400 text-sm">
              Actualizado
            </dt>
            <dd class="text-gray-900 dark:text-gray-100">
              {{ longDateTimeFormat(new Date(product?.updatedAt!)) }}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const query = route.query.message as string;

if (query) {
  toast.add({
    title: query,
    description: "Producto creado exitosamente",
    class: "bg-green-500",
  });
  router.replace({ query: {} });
}

const rawId = route.params.id as string;

const {
  data: product,
  error,
  pending,
  createOrUpdate,
} = await useAdminProduct(rawId);

if (error.value) {
  navigateTo("/404");
}

const isCreating = computed(() => rawId === "new");
const newProduct = ref<IProduct>(structuredClone(product.value) as IProduct);
const selectedImageIndex = ref(0);
const isSubmitting = ref(false);
const fieldErrors = ref<Record<string, string>>({});

const pageTitle = computed(() =>
  isCreating.value ? "Crear producto" : "Editar producto",
);

const subtitle = computed(() =>
  isCreating.value
    ? "Completa el formulario para agregar"
    : "Actualiza la información del producto seleccionado",
);

const productSchema = z.object({
  slug: z.string().nonempty("El slug es requerido"),
  name: z.string().nonempty("El nombre es requerido"),
  description: z.string().nonempty("La descripción es requerida"),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
});

const checkValidations = () => {
  fieldErrors.value = {};

  const result = productSchema.safeParse(newProduct.value);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        fieldErrors.value[field] = issue.message;
      }
    });

    return false;
  }

  // Si quieres, aquí puedes sobreescribir newProduct con los valores parseados
  // newProduct.value = result.data;

  return true;
};

const handleSubmit = async () => {
  const isFormValid = checkValidations();

  newProduct.value.tags = `${newProduct.value.tags}`.split(",");
  // newProduct.value.images = `${newProduct.value.images}`.split(",");

  if (!isFormValid) return;

  if (!newProduct.value) return;

  console.log({ newProduct: newProduct.value });

  const producto = await createOrUpdate(newProduct.value);

  if (isCreating.value) {
    router.replace(
      `/dashboard/product/${producto?.id}?message=product-created`,
    );
  }

  if (producto) {
    toast.add({
      title: "Producto actualizado",
      description: `El producto ${producto.name} ha actualizado correctamente`,
      class: "bg-green-500",
    });
    // navigateTo("/dashboard/products");
  } else {
    toast.add({
      title: "Error al actualizar el producto",
      description: "Ha ocurrido un error al actualizar el producto",
      class: "bg-red-500",
    });
  }
};

const handleCancel = () => {
  navigateTo("/dashboard/products");
};

watch(
  newProduct,
  () => {
    checkValidations();
  },
  { deep: true },
);
</script>

<style></style>
