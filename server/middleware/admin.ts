export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/domain")) return;

  const seassion = await requireUserSession(event);

  const hasAdminRol = seassion.user.roles.includes("admin");

  if (!hasAdminRol)
    throw createError({
      statusCode: 401,
      message: `unAuthorized`,
    });

    return;
});
