import redirects from './redirects.json';

const redirectMap = new Map();
redirects.forEach(group => {
  group.aliases.forEach(alias => {
    redirectMap.set(alias.toLowerCase(), group.destination);
  });
});

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Remove leading/trailing slashes
    const path = url.pathname.replace(/^\/|\/$/g, '').toLowerCase();

    const target = redirectMap.get(path);

    if (target) {
      return Response.redirect(target, 302);
    }

    // Fallback to root if nothing matches
    return Response.redirect("https://salty.fyi", 302);
  },
};