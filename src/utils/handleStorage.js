// set localStorage
export const setItem = (key, data) => {
  try {
    const serializeData = JSON.stringify(data)
    localStorage.setItem(key, serializeData)
  } catch (e) {
    // 可以考虑处理一下长度超出的错误
    console.log(e)
  }
}
// get localStorage
export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return localStorage.getItem(key)
  }
}
// clear localStorage
export const clearItem = () => {
  localStorage.clear()
}
// remove localStorage
export const removeItem = (key) => {
  localStorage.removeItem(key)
}
