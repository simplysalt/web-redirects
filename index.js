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
    const path = url.pathname.replace(/^\/|\/$/g, '').toLowerCase; // Remove leading/trailing slashes

    // Default redirect if the path is empty or not found
    const target = redirectMap.get(path) || "https://find.salty.fyi";

    return Response.redirect(target, 302);
  },
};