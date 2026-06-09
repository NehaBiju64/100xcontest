let fs=require('fs')

fs.readFile("users.json","utf-8",(err,data)=>{
    if(err){
        console.error(err);
        return;
    }
    const users=JSON.parse(data);

    const emails=users.map(user=>user.email);
    fs.writeFile('emails.txt',emails.join('\n'),(err)=>{
        if(err){
            console.log("error writing file",err);
        }

        console.log("emails extracted successfully");
    });
});

