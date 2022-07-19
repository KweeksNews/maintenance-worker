/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/no-unresolved */
import manifest from '__STATIC_CONTENT_MANIFEST';
import { getAssetFromKV, Options } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const options: Partial<Options> = {
      ASSET_MANIFEST: JSON.parse(manifest),
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      cacheControl: { bypassCache: true },
    };

    const allowedIp: string[] = JSON.parse((await env.CONFIG.get('allowed-ip'))!);
    const allowedHostname: string[] = JSON.parse((await env.CONFIG.get('allowed-hostname'))!);

    const ip: string = req.headers.get('cf-connecting-ip')!;
    const url: URL = new URL(req.url);

    try {
      if (allowedIp.includes(ip)) {
        return fetch(req);
      }

      if (allowedHostname.includes(url.hostname)) {
        const res: Response = await fetch(req);

        if (res.ok) {
          return res;
        }
      }

      const res: Response = await getAssetFromKV(
        { request: req, waitUntil: ctx.waitUntil },
        options,
      );

      if (url.pathname === '/') {
        res.headers.append('retry-after', '1800');
      }

      return new Response(res.body, {
        status: url.pathname === '/' ? 503 : res.status,
        headers: res.headers,
      });
    } catch (e) {
      const res = await getAssetFromKV(
        { request: req, waitUntil: ctx.waitUntil },
        {
          ...options,
          mapRequestToAsset: (req: Request) =>
            new Request(`${new URL(req.url).origin}/index.html`, req),
        },
      );

      res.headers.append('retry-after', '1800');
      return new Response(res.body, { status: 503, headers: res.headers });
    }
  },
};
