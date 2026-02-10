export const notFound = Response.json(
  {
    error: 'Not Found',
  },
  { status: 404 },
);

export const internalError = Response.json(
  {
    error: 'Internal Server Error',
  },
  { status: 500 },
);
