import redirects from './redirects.json';

const redirectMap = new Map();
redirects.forEach(group => {
  group.urls.forEach(alias => {
    redirectMap.set(alias.toLowerCase(), group.target);
  });
});

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/|\/$/g, '').toLowerCase(); // Remove leading/trailing slashes

    const target = redirectMap.get(path);

    if (target) {
      return Response.redirect(target, 302);
    }

    // Fallback to your main site if no alias is found
    return Response.redirect("https://salty.fyi", 302);
  },
};