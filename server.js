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
  } //this is the basics of building your own API 
  else if (page == '/api') {
    if ('weightMetric' in params && 'heightMetric' in params && 'heightInches' in params && 'weightLbs' in params) {
      if (params['weightMetric'] != 0 && params['heightMetric'] != 0) {
        let bmi = Number(params['weightMetric'] / Math.pow(params['heightMetric'] / 100, 2))
        let category = bmiCategory(bmi)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        const objToJson = {
          bmi: bmi.toFixed(2),
          category: category
        }
        res.end(JSON.stringify(objToJson));
      } 
      else if (params['weightLbs'] != 0 && params['heightInches'] != 0) {
        let bmi = 703 *  Number(params['weightLbs']) / Number(Math.pow(params['heightInches'], 2))  
        console.log(bmi)
        let category = bmiCategory(bmi)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        const objToJson = {
          bmi: bmi.toFixed(2),
          category: category
        }
        res.end(JSON.stringify(objToJson));
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        const objToJson = {
          bmi: "Please enter valid information"
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

function bmiCategory(bmi) {
  if (bmi < 16) {
    return category = 'Underweight - Severe thinness'
  } else if (bmi < 17) {
    return category = 'Underweight - Moderate thinness'
  } else if (bmi < 18.5) {
    return category = 'Underweight - Mild thinness'
  } else if (bmi < 25) {
    return category = 'Normal'
  } else if (bmi < 29.9) {
    return category = 'Overweight - Pre Obese'
  } else if (bmi < 34.9) {
    return category = 'Overweight - Class I'
  } else if (bmi < 39.9) {
    return category = 'Overweight - Class II'
  } else if (bmi > 40) {
    return category = 'Overweight - Class III'
  }

}


server.listen(8000);