addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const allowedIp = JSON.parse(await KV.get('allowed-ip'));
  const allowedHostname = JSON.parse(await KV.get('allowed-hostname'));
  const url = new URL(request.url);
  const response = await fetch(request);
  const responseHeaders = new Headers({
    'Content-Type': 'text/html',
    'Cache-Control': 'no-cache',
  });

  if (allowedHostname.includes(url.hostname)) {
    return response;
  } else {
    if (allowedIp.includes(request.headers.get('cf-connecting-ip'))) {
      if (!response.ok) {
        return new Response(responseBody, {
          status: response.status,
          headers: responseHeaders,
        });
      } else {
        return response;
      }
    } else {
      if (!response.ok) {
        return new Response(responseBody, {
          status: 503,
          headers: responseHeaders,
        });
      } else {
        return new Response(responseBody, {
          status: 307,
          headers: responseHeaders,
        });
      }
    }
  }
}

const responseBody = `
<!DOCTYPE html>
<html lang="id-ID">

<head>
  <meta charset="UTF-8">
  <title>Under Maintenance | KweeksNews Network</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.jsdelivr.net/gh/KweeksNews/network@master/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.jsdelivr.net/gh/KweeksNews/network@master/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.jsdelivr.net/gh/KweeksNews/network@master/favicon-16x16.png">
  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Quicksand&display=swap'>
  <style>
    * {
      transition: all 0.6s;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    
    body {
      position: relative;
      padding: 0;
      margin: 0;
      font-family: 'Quicksand', 'Roboto', 'Ubuntu', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
      background: #000000;
    }
    
    main {
      position: relative;
      height: 100vh;
    }
    
    header img {
      position: absolute;
      margin: 10px 0 0 20px;
      font-size: 50px;
    }
    
    .container {
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
    }
    
    .container h1 {
      margin: 0 auto 0.5em;
      max-width: 240px;
      color: #ffffff;
      font-size: 50px;
      line-height: 1em;
      padding-right: 10px;
      animation: type 0.5s alternate infinite;
    }
    
    .container p {
      padding: 0;
      margin: 0;
      display: inline-block;
      color: #ffffff;
      background: transparent;
      font-size: 18px;
      font-weight: 700;
      text-decoration: none;
      transition: 0.2s all;
      -webkit-transition: 0.2s all;
    }
    
    footer {
      color: #f9f9f9;
      position: absolute;
      bottom: 0;
      width: 100%;
      font-weight: 600;
      text-align: center;
    }
    
    footer a {
      text-decoration: none;
      color: #dd9933;
    }
    
    footer p {
      font-size: 12px;
      margin: 7px auto;
    }
    
    .marking {
      color: #dd9933;
    }
    
    @keyframes type {
      from {
        border-right: 4px solid #ffffff;
      }
      to {
        border-right: 4px solid transparent;
      }
    }
    
    @media only screen and (max-width: 768px) {
      header img {
        margin: 10px 0 0;
        left: 50%;
        -webkit-transform: translate(-50%);
        -ms-transform: translate(-50%);
        transform: translate(-50%);
      }
    }
    
    @media only screen and (max-width: 480px) {
      header img {
        width: 170px;
      }
    
      .container h1 {
        font-size: 40px;
        max-width: 190px;
      }
    
      .container a {
        font-size: 12px;
        padding: 8px 24px;
      }
    
      @keyframes type {
        from {
          border-right: 3px solid #ffffff;
        }
        to {
          border-right: 3px solid transparent;
        }
      }
    }
  </style>
</head>

<body>
  <header>
    <img src="https://cdn.jsdelivr.net/gh/KweeksNews/network@master/assets/images/kweeksnet.svg" alt="KweeksNet" title="KweeksNet" width="220">
  </header>
  <main>
    <div class="container">
      <h1>Error&nbsp;503</h1>
      <p>Site Under Maintenance</p>
    </div>
  </main>
  <footer>
    <a href="https://network.kweeksnews.com/" target="_blank" rel="noopener">Network</a> | <a
      href="https://status.kweeksnews.com/" target="_blank" rel="noopener">Status</a>
    <p>
      &copy;
      <span id="copyright">
      <script>document.getElementById('copyright').innerHTML = new Date().getFullYear();</script>
      </span>
      <span class="marking">KweeksNews Network</span>. All Rights Reserved.
    </p>
  </footer>
</body>

</html>
`;
