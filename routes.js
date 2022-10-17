const requestListener = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<html><body>');
    res.write('<h1>Hello user!</h1>');
    res.write('<form action="/create-user" method="POST"><input type="text" name="username" /><button type="submit">Create a user</button></form>');
    res.write('</body></html>');

    return res.end();
  }

  if (url === '/users') {
    const DUMMY_USERS = ['David', 'Jack', 'Will'];
    res.write('<html><body>');
    res.write('<ul>');

    DUMMY_USERS.forEach((userName) => {
      res.write(`<li>${userName}</li>`);
    });

    res.write('</ul>');
    res.write('</body></html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];

      console.log(userName);

      res.statusCode = 302;
      res.setHeader('Location', '/');

      return res.end();
    });
  }
}

module.exports = requestListener;
