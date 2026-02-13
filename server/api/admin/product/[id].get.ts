import { IProduct } from "~~/shared/types/product";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;

  if (id === 'new') {
    return {
      id: 0,
      slug: "",
      name: "",
      description: "",
      price: 0,
      images: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IProduct
  }

  const producto = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });

  if (!producto)
    throw createError({
      statusCode: 404,
      message: `Product with id ${id} not found`,
    });

  return producto;
});
