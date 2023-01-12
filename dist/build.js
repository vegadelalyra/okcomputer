const a = ['awebo', 'awebito', 'miau', 'awe', 'arroz']

const b = a.reduce( (prev, val, index) => {
    if (val.includes('awe')) prev.push(index)
    return prev
}, [])

console.log(b);