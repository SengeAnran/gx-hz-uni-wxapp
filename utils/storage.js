export function setStorage(name, value) {
    const setValue = JSON.stringify(value)
    uni.$customAPI('setStorage', {key: name, data: value})
}

export function getStorage(name) {
    const value =  uni.getStorageSync(name);
    // console.log(value, 'parse', JSON.parse(value));
    return value ? value : '';
}
