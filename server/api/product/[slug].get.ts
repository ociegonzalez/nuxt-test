export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const producto = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!producto)
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Product with slug ${slug} not found`,
      data: {
        slug,
        state: process.env.STAGE,
      },
      stack: process.env.STAGE !== "prod" ? new Error().stack : "",
    });

    return producto;
});
