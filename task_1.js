const isValidPositiveInteger = (str1, str2) => /^\d+$/.test(str1.trim()) && /^\d+$/.test(str2.trim());

const performOperation = (operation, a, b) => {
    if (!isValidPositiveInteger(a, b)) {
        throw new Error('Both strings must contain only positive integers');
    }

    const numA = parseInt(a.trim(), 10);
    const numB = parseInt(b.trim(), 10);

    if (operation === 'minus' && numA <= numB) {
        throw new Error('First number should be greater than second');
    }

    if (operation === 'divide' && numA % numB !== 0) {
        throw new Error('Result must be an integer value');
    }

    switch (operation) {
        case 'plus':
            return numA + numB;
        case 'minus':
            return numA - numB;
        case 'divide':
            return numA / numB;
        case 'multiply':
            return numA * numB;
        default:
            throw new Error('Unsupported operation');
    }
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
    console.log('10'.plus('9'));
    console.log('10'.minus('5'));
    console.log('10'.divide('5'));
    console.log('10'.multiply('5'));

    // Test for errors
    // console.log('abc'.plus('5'));
    // console.log('5'.minus('10'));
    // console.log('10'.divide('3'));
} catch (error) {
    console.error(error.message)
}
