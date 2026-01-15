import routes from './routes';

const server = Bun.serve({
  port: process.env.PORT || 3000,
  routes,
  fetch(req) {
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);
