input=[
  { id: 1, category: "electronics", price: 100 },
  { id: 2, category: "clothes", price: 50 },
  { id: 3, category: "electronics", price: 200 }
]

let output={};
for(i=0;i<input.length;i++){
    let id=input[i].id;
    let category=input[i].category;
    let price=input[i].price;

    if( category in output){
        output[category]+=price;
        
    }
    else{
        output[category]=price;
        

    }

    

    
    

}

console.log(output);