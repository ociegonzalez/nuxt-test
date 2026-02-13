export const useAdminProduct = async (id: string) => {
  const { data, pending, error, status, refresh, execute } = await useFetch(
    `/api/admin/product/${id}`,
  );

  const createOrUpdate = async (data: Partial<IProduct>, files?: File[]) => {
    const isCreating = data.id === 0;

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    if (files) {
      files.forEach((file) => {
        formData.append("files", file);
      })
    }

    if (isCreating) {
      const { producto } = await $fetch("/api/admin/product", {
        method: "POST",
        body: data,
      });

      return producto;
    }

    try {
      const { product } = await $fetch(`/api/admin/product/${id}`, {
        method: "PATCH",
        body: formData,
      });

      return product;
    } catch (error) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  return { data, pending, error, status, refresh, execute, createOrUpdate };
};
