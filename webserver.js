const http = require('http')
const fs = require('fs')
const html = fs.readFileSync("./Template/index.html", 'utf-8')
const products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));
const productList = fs.readFileSync('./Template/product-list.html', 'utf-8');
let productHtmlArray = products.map((product) => {
    let output = productList.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    return output;
});

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
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(html.replace("{{%CONTENT%}}", productHtmlArray));
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



