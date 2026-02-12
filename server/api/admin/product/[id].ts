export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;

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

  return {
    producto,
  };
});
