import redirects from './redirects.json';

const redirectMap = new Map();
redirects.forEach(group => {
  group.aliases.forEach(alias => {
    redirectMap.set(alias.toLowerCase(), group.destination);
  });
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/|\/$/g, '').toLowerCase();

    const target = redirectMap.get(path);

    if (target) {
      return Response.redirect(target, 302);
    }

    // Fallback to root if nothing matches
    const fallbackUrl = env.FALLBACK_URL || "https://salty.fyi";
    return Response.redirect(fallbackUrl, 302);
  },
};