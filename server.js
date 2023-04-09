const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/post' || pathname === '/post/') {
      // Если пользователь посещает /post или /post/, перенаправляем его на страницу 404
      app.render(req, res, '/404');
    } else if (pathname.startsWith('/post/')) {
      const slug = pathname.replace('/post/', '');
      app.render(req, res, '/post/[slug]', { slug });
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(process.env.PORT || 3000, () => {
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});
