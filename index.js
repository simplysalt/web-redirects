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
    
    // Normalize path by removing leading/trailing slashes
    const path = url.pathname.replace(/^\/|\/$/g, '').toLowerCase();

    // Fix: Stop processing if user is already at the root path to prevent redirect loops
    if (path === "") {
      // If running locally, return a mock response instead of redirecting out to production
      if (url.hostname === 'localhost' || url.hostname === '172.0.0.1') {
        return new Response("URL PATHNAME null. (Running locally)", {
          headers: { "content-type": "text/plain" }
        });
      }
      return Response.redirect("https://salty.fyi", 302);
    }

    const target = redirectMap.get(path);

    if (target) {
      return Response.redirect(target, 302);
    }

    // Fallback if alias not found: Redirect to root of current host to keep context
    const fallbackUrl = `${url.protocol}//${url.host}/`;
    return Response.redirect(fallbackUrl, 302);
  },
};