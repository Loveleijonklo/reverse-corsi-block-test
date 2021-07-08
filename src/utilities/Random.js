function randIncl(_upperLimit) {
    return Math.floor(Math.random()*_upperLimit)
}

function randNUniqueNumsWithinRange(amt, _upperLimit) {
    let newArr = []
    do {
        let num = Math.floor(Math.random() * _upperLimit)
        if (!newArr.includes(num)) {
            newArr.push(num)
        }
    } while (newArr.length < amt)

    return newArr
}

// Generate a random integer with a blacklist
function randWithBlacklist(_upperLimit, _blacklist) {
    let num = 0

    do {
        num = Math.floor(Math.random() * _upperLimit)
    } while (_blacklist.includes(num))

    return num;
}

// Randomly choosing one item from a specific array
function randFromList(_list) {
    return _list[Math.floor(Math.random() * _list.length)]
}

export { randIncl, randNUniqueNumsWithinRange, randWithBlacklist, randFromList }