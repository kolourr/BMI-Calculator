const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function (err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function (err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  }

  //this is the basics of building your own API 
  else if (page == '/api') {
    if ('weight' in params && 'height' in params) {
      if (params['weight'] != 0 && params['height'] != 0) {
        let bmi = (params['weight'] / Math.pow(params['height'], 2)) * 703
        console.log(bmi)
        let category = ''
        if (bmi < 16) {
          category = 'Underweight - Severe thinness'
        } else if (bmi < 17) {
          category = 'Underweight - Moderate thinness'
        } else if (bmi < 18.5) {
          category = 'Underweight - Mild thinness'
        } else if (bmi < 25) {
          category = 'Normal'
        } else if (bmi < 29.9) {
          category = 'Overweight - Pre Obese'
        } else if (bmi < 34.9) {
          category = 'Overweight - Class I'
        } else if (bmi < 39.9) {
          category = 'Overweight - Class II'
        } else if (bmi > 40) {
          category = 'Overweight - Class III'
        }

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        const objToJson = {
          bmi: bmi,
          category: category,
        }
        res.end(JSON.stringify(objToJson));
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        const objToJson = {
          bmi: "Please enter the valid information",
        }
        res.end(JSON.stringify(objToJson));
      }
    }

  } //else if
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);