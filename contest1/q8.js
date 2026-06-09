input=[
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" }
]



const uniqueByMap = [...new Map(input.map(item => [item.id, item])).values()];
console.log(uniqueByMap); 