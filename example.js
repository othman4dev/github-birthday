let array = [5,4,2];
let result = [];

for (let i = 0; i < array.length; i++) {
    let product = 1;
    for (let j = 0; j < array.length; j++) {
        if (i !== j) {
        product *= array[j];
        }
    }
    result.push(product);
}

console.log(result);