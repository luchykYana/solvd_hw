const isValidPositiveInteger = (str1, str2) => /^[1-9]\d*$/.test(str1) && /^[1-9]\d*$/.test(str2);

const performOperation = (operation, a, b) => {
    if (!isValidPositiveInteger(a, b)) throw new Error('Both strings must contain only positive integers');
    const [numA, numB] = [a, b].map(Number);
    
    if (operation === 'minus' && numA <= numB) throw new Error('First number should be greater than second');
    
    const [aArray, bArray] = [a, b].map(str => str.split('').reverse().map(Number));
    let tempArray = [];
    let helper = 0;

    switch (operation) {
        case 'plus':
            tempArray = aArray.reduce((acc, digit, i) => {
                const sum = (digit || 0) + (bArray[i] || 0) + helper;
                helper = sum > 9 ? 1 : 0;
                acc.unshift(sum % 10);
                return acc;
            }, []);

            break;
        
        case 'minus':
            tempArray = aArray.reduce((acc, digit, i) => {
                let diff = (digit || 0) - (bArray[i] || 0) - helper;
                helper = diff < 0 ? 1 : 0;
                diff = helper ? diff + 10 : diff;
                acc.unshift(diff);
                return acc;
            }, []);

            break;

        case 'divide':
            const dividendArray = a.split('').map(Number);
                const divisor = parseInt(b);
            
                if (divisor === 0) {
                    throw new Error("Division by zero is not allowed.");
                }
            
                let quotientArray = [];
                let remainder = 0;
            
                for (let i = 0; i < dividendArray.length; i++) {
                    let digit = remainder * 10 + dividendArray[i];
                    let quotientDigit = Math.floor(digit / divisor); digit
                    remainder = digit % divisor;
                    quotientArray.push(quotientDigit); 
                }
            
                while (quotientArray.length > 1 && quotientArray[0] === 0) {
                    quotientArray.shift();
                }
            
                return quotientArray.join('');

        case 'multiply':
            const productArray = new Array(a.length + b.length).fill(0);
            aArray.forEach((digitA, i) => {
                bArray.forEach((digitB, j) => {
                    const product = digitA * digitB;
                    const sum = productArray[i + j] + product;
                    productArray[i + j] = sum % 10;
                    productArray[i + j + 1] += (sum / 10) | 0;
                });
            });
            tempArray = productArray.reverse();

            break;

        default:
            throw new Error('Unsupported operation');
    }

    return tempArray.join('').replace(/^0+/, '');
};

// String.plus(string):
// This function should take another string as input and return the result of adding the two strings together.
String.prototype.plus = function(str) {
    return performOperation('plus', this, str);
};

// String.minus(string):
// This function should take another string as input and return the result of subtracting the second string
// from the first string. Note that the first parameter will always be greater than the second parameter.
String.prototype.minus = function(str) {
    return performOperation('minus', this, str);
};

// String.divide(string):
// This function should take another string as input and return the result of dividing the first string
// by the second string. Division should only result in an integer value.
String.prototype.divide = function(str) {
    return performOperation('divide', this, str);
};

// String.multiply(string):
// This function should take another string as input and return the result of multiplying the two strings
// together.
String.prototype.multiply = function(str) {
    return performOperation('multiply', this, str);
};

try {
    const s1 = '44444444444444444444444444444444000000000000000000000';
    const s2 = '2000000000000';
    console.log(s1.plus(s2));
    console.log(s1.minus(s2));
    console.log(s1.multiply(s2));
    console.log(s1.divide(s2));

    // Test for errors
    // console.log('abc'.plus('5'));
    // console.log('5'.minus('10'));
    // console.log('10'.divide('3'));
} catch (error) {
    console.error(error.message)
}
