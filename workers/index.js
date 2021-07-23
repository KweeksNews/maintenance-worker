import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const handleEvent = async (event) => {
  const options = {
    cacheControl: {
      bypassCache: true,
    },
    mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
  };

  const allowedPath = [
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'assets/',
  ];
  const allowedIp = JSON.parse(await KV.get('allowed-ip'));
  const allowedHostname = JSON.parse(await KV.get('allowed-hostname'));
  const ip = event.request.headers.get('cf-connecting-ip');
  const { hostname, pathname } = new URL(event.request.url);

  if (new RegExp(`^(${allowedPath.join('|')})`).test(pathname.substring(1))) {
    try {
      return await getAssetFromKV(event);
    } catch (e) {
      const res = await getAssetFromKV(event, options);
      return new Response(res.body, { ...res, status: 503 });
    }
  }

  if (allowedIp.includes(ip)) {
    return fetch(event.request);
  }

  if (allowedHostname.includes(hostname)) {
    let response = await fetch(event.request);

    if (!response.ok) {
      const res = await getAssetFromKV(event, options);
      response = new Response(res.body, { ...res, status: 503 });
    }

    return response;
  }

  const response = await getAssetFromKV(event, options);
  return new Response(response.body, { ...response, status: 503 });
};

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event));
});
