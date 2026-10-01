/**
 * 
 * @param {number} num 
 */
function countDivisors(num) {
  let res = 0;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      res++;
    }
    
  }

  return res;
}

/**
 * 
 * @param {number} num 
 */
function isPrime(num) {
  if (!Number.isInteger(num)) return false;

  if (num > 1 && countDivisors(num) === 0) {
    return true
  }

  return false;
}

module.exports = {
  isPrime
}