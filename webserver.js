const http = require('http')
const fs = require('fs')
const html = fs.readFileSync("./Template/index.html", 'utf-8')
const productsData = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));

// creating server
const server = http.createServer((req, res) => {
    let path = req.url

    if (path == '/' || path.toLocaleLowerCase() == '/home') {
        res.writeHead(200)
        res.end(html.replace("{{%CONTENT%}}", "You are in Home page"))
    }
    else if (path.toLocaleLowerCase() == '/about') {
        res.writeHead(200)
        res.end(html.replace("{{%CONTENT%}}", 'You are in About page'))
    }
    else if (path.toLocaleLowerCase() == '/contact') {
        res.writeHead(200)
        res.end(html.replace("{{%CONTENT%}}", 'You are in Contact page'))
    }
    else if (path.toLocaleLowerCase() == '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end("You are in products page");
        console.log(productsData);
    }
    else {
        res.writeHead(404)
        res.end("Page not found")
    }


})

// starting server
server.listen(8000, '127.0.0.1', () => {
    console.log('Server started!!')
})



