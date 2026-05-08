import redirects from './redirects.json';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/|\/$/g, ''); // Remove leading/trailing slashes

    // Default redirect if the path is empty or not found
    const target = redirects[path] || "https://salty.fyi";

    return Response.redirect(target, 302);
  },
};