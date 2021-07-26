import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const handleEvent = async (event) => {
  const options = {
    cacheControl: { bypassCache: true },
    mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
  };

  const allowedIp = JSON.parse(await KV.get('allowed-ip'));
  const allowedHostname = JSON.parse(await KV.get('allowed-hostname'));

  const ip = event.request.headers.get('cf-connecting-ip');
  const { hostname } = new URL(event.request.url);

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

  try {
    return await getAssetFromKV(event);
  } catch (e) {
    const res = await getAssetFromKV(event, options);
    return new Response(res.body, { ...res, status: 503 });
  }
};

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event));
});
