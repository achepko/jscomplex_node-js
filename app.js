
const path = require('path');
const fs = require('fs');

fs.mkdirSync(path.join(__dirname,'folder'),(err)=>{
    if (err) {
        throw new Error(err.message);
    }
    else{
        console.log(`folder was successfully created `)
    }
})

const folders = ['folder1','folder2','folder3','folder4','folder5'];

for (let i=0;i<folders.length;i++){
    const folderPath= path.join(__dirname,'folder',`${folders[i]}`);
    fs.mkdir(folderPath,(err)=>{
        if (err) {
            throw new Error(err.message);
        }
        else{
            console.log(`${folders[i]} was successfully created `)
        }
    })
}

const files =['file1','file2','file3','file4','file5'];

for (let i=0;i<files.length;i++){
    const filePath = path.join(__dirname,'folder',`${files[i]}.txt`);
    fs.writeFile(filePath,`content of ${files[i]}.txt`,(err)=>{
        if (err){
            throw new Error(err.message);
        }
        else{
            console.log(`${files[i]} was successfully created in folder - ${folders[i]}`)
        }
    })
}

fs.readdir(path.join(__dirname,'folder'),{withFileTypes:true},(err,files)=>{
    if (err){
        throw new Error(err.message);
    }
    else{
        files.forEach(file=>{
            if (file.isFile()){
               console.log(`FILE: ${file.name}`)
            }
            else{
                console.log(`FOLDER: ${file.name}`)
            }
        })
    }
})