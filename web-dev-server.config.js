export default {
  rootDir: 'pyre',
  open: true,
  nodeResolve: true,
  watch: true,
  middleware: [
    function rewriteassets(context, next) {
      if (context.url.startsWith('/assets')) {
        context.url = `/public/${context.url}`;
      }
      // if (context.url.incudes('/assets')) {
      //   console.log(context.url);
      //   context.url = '/src/index.html';
      // }

      return next();
    },
  ],
};
