
function shiftUp (a){

    if(a.length === 0)
        return a;
    
    const firstElement = a.shift();

    return [...a,firstElement];
}

function shiftDown (a){

    if (a.length === 0)
        return a;

    const lastElement = a.pop();

    return [lastElement,...a]
}

module.exports = {
    shiftUp,
    shiftDown
};