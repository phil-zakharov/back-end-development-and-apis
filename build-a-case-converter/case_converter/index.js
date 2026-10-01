function getUpperCase(str) {
  return str.toUpperCase()
}

function getLowerCase(str) {
  return str.toLowerCase()
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function getSentenceCase(str) {
  return getUpperCase(str.at(0)) + getLowerCase(str.slice(1))
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function getProperCase(str) {
  return str.split(' ').map(getSentenceCase).join(' ')
}

module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase
}