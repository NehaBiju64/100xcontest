let input ={ a: 0, b: null, c: "hello", d: undefined, e: 5 }
Object.entries(input).forEach(([key,value])=>{
    if(value===0||value===null||value===undefined)
        delete(input[key]);
});

console.log(input);