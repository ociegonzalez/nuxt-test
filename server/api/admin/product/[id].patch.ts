import { z } from "zod";

const bodySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string()).min(0),
  tags: z.array(z.string()).min(0),
})

export default defineEventHandler(async(event) => {

  const id = getRouterParam(event, "id") as string;

  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: `There's no data in the body`,
    });    
  }

  let dataString = '';

  for (const part of formData) {
    if (part.name === 'data' && part.data) {
      dataString = part.data.toString('utf-8');
    }


  }

  const body = bodySchema.safeParse(JSON.parse(dataString));

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: `Check the bodyof the request`,
      data: body.error
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });

  if (!product)
    throw createError({
      statusCode: 404,
      message: `Product with id ${id} not found`,
    });

    const updatedProduct = await prisma.product.update({
      where: {
        id: +id,
      },
      data: body.data,
    });

  return {
    message: 'Product updated',
    product: updatedProduct,
    files: []
  }
})
