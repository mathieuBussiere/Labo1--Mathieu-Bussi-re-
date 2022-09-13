const path = require('path')
const fs = require('fs')

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext)
            this.params = HttpContext.path.params
        }
        get() {
            if (this.HttpContext.path.queryString == '?') {
                // Send help page here.
                let helpPagePath = path.join(process.cwd(), 'wwwroot/helpPages/mathsServiceHelp.html');
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            } else {
                if (this.HttpContext.path.params.op) { //If op is present, go in if statement
                    if (Object.keys(this.params).length > 3) { //If there are too many parameters, send an error.
                        this.HttpContext.path.params.error = "There are too many parameters";
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                    } else {
                        let x = 0;
                        let y = 0;
                        let n = 0;
                        let resultat = 0;
                        switch (this.HttpContext.path.params.op) {
                            case ' ':
                                this.HttpContext.path.params.op = "+"
                                x = this.HttpContext.path.params.x
                                y = this.HttpContext.path.params.y
                                if (isNaN(x) || isNaN(y)) {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is not a number";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    resultat = x + y
                                    resultat = resultat.toString()
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                            case '-':
                                x = this.HttpContext.path.params.x
                                y = this.HttpContext.path.params.y
                                if (isNaN(x) || isNaN(y)) {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is not a number";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    resultat = x - y
                                    resultat = resultat.toString()
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                            case '*':
                                x = this.HttpContext.path.params.x
                                y = this.HttpContext.path.params.y
                                if (isNaN(x) || isNaN(y)) {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is not a number";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                } else {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    resultat = x * y
                                    resultat = resultat.toString()
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                            case '/':
                                x = this.HttpContext.path.params.x
                                y = this.HttpContext.path.params.y
                                if (isNaN(x) || isNaN(y)) {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is not a number";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                } else {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    resultat = x / y
                                    resultat = resultat.toString()
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                            case '%':
                                x = this.HttpContext.path.params.x
                                y = this.HttpContext.path.params.y
                                if (isNaN(x) || isNaN(y)) {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is not a number";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                } else {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    resultat = x % y
                                    resultat = resultat.toString()
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                            case '!':
                                n = this.HttpContext.path.params.n
                                if(n < 0)
                                {
                                    this.HttpContext.path.params.error = "There are too many parameters. Please use 'n' as a parameter.";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else if (Object.keys(this.params).length > 2) {
                                    this.HttpContext.path.params.error = "There are too many parameters. Please use 'n' as a parameter.";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                } else {
                                    n = parseInt(n)
                                    resultat = factorial(n)
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                            case 'p':
                                n = this.HttpContext.path.params.n
                                if (Object.keys(this.params).length > 2) {
                                    this.HttpContext.path.params.error = "There are too many parameters. Please use 'n' as a parameter.";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                } else {
                                    n = parseInt(n)
                                    resultat = isPrime(n)
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                            case 'np':
                                n = this.HttpContext.path.params.n
                                if (Object.keys(this.params).length > 2) {
                                    this.HttpContext.path.params.error = "There are too many parameters. Please use 'n' as a parameter.";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                } else {
                                    n = parseInt(n)
                                    resultat = findPrime(n)
                                    this.HttpContext.path.params.value = resultat
                                    this.HttpContext.response.JSON(this.HttpContext.path.params)
                                }
                                break;
                        }
                    }
                } else {
                    this.HttpContext.path.params.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }
        }
    }

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber)) {
            primeNumber++;
        }
    }
    return primeNumber;
}