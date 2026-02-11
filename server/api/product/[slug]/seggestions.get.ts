import { prisma } from './../../../utils/db';
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const producto = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2500))

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

    const suggestions = await prisma.product.findMany({
      where: {
        tags: {
          hasSome: producto.tags
        },
        NOT: {
          id: producto.id
        }
      },
      take: 3
    })

    return suggestions;
});
