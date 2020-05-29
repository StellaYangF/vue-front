const getLocal = (key) => {
  let value = localStorage.getItem(key) || '';
  console.log(localStorage.getItem(key));
  if (value.includes('[') || value.includes('{')) {
    return value =  JSON.parse(value);
  }
  return value;
};

const setLocal = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export {
  getLocal,
  setLocal,
}