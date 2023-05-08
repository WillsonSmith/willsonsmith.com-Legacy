export default {
  rootDir: 'pyre',
  // open: true,
  nodeResolve: true,
  watch: true,
  port: 5173,
  middleware: [
    function rewriteassets(context, next) {
      if (context.url.startsWith('/assets')) {
        context.url = `/public/${context.url}`;
      }
      return next();
    },
  ],
};
