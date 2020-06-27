// function loadFromLocalStorage(key){
//     var item = localStorage.getItem(key)
//     return Promise.resolve(item)
// }

// function saveToLocalStorage(key,item){
//     console.log('saving to local storge',item)
//     localStorage.setItem(key,item)
//     return Promise.resolve(item)
// }

// function removeFromStorage(key){
//     return localStorage.removeItem(key)
// }


export default{
    store,
    load
}


function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function load(key) {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
}