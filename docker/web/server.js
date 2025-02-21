const express = require("express");
const ldap = require("ldapjs");
const https = require("https");
const fs = require("fs");

const app = express();
app.use(express.json());

const ldapClient = ldap.createClient({
  url: process.env.LDAP_SERVER || "ldap://ldap_server"
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const dn = `cn=${username},dc=academy,dc=com`;

  ldapClient.bind(dn, password, (err) => {
    if (err) {
      return res.status(401).json({ message: "Login fallido" });
    }
    res.json({ message: "¡Login exitoso!" });
  });
});

// Configurar HTTPS con certificado propio
const options = {
  key: fs.readFileSync("certs/server.key"),
  cert: fs.readFileSync("certs/server.crt"),
};

https.createServer(options, app).listen(443, () => {
  console.log(`Servidor corriendo en https://${process.env.SERVER_NAME}`);
});
