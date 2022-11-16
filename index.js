const http = require('http'), //HTTP server
      express = require('express'), //Handlinf HTTP requests and routing
      fs = require('fs'),
      xmlParse = require('xslt-processor').xmlParse,
      xsltProcess = require('xslt-processor').xsltProcess,
      router = express(),
      server = http.createServer(router);

router.get('/', function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'utf8'),
        xsl = fs.readFileSync('menu.xsl', 'utf8');

    xml = xmlParse(xml);
    xsl = xslParse(xsl);

    let html = xsltProcess(xml, xsl);

    res.end(html.toString());
});

server.listen(process.env.Port || 300, process.env.IP || "0.0.0.0", function()
{
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});