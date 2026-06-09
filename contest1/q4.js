input=[
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]
let output={};
for(i=0;i<input.length;i++){
    id=input[i].id;
    name=input[i].name;

    output[id]=name;


}

console.log(output);