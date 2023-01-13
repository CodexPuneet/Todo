const express = require('express')
const fs= require('fs')
const app = express()

app.use(express.json())

app.get('/',(req, res)=>{
  const i = fs.readFileSync('./db.json','utf-8')
  const j = JSON.parse(i)
  console.log(j)
  res.send(j)
} )

app.post('/',(req, res)=>{
  const i = fs.readFileSync('./db.json','utf-8')
  const j = JSON.parse(i)
  j.todos.push(req.body)
  fs.writeFileSync('./db.json',JSON.stringify(j))
  console.log(j)
  res.send(j)
} )

app.delete("/:ID",(req,res)=>{
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsed=JSON.parse(data);
  const iD=req.params.ID;
  const size = parsed.todos.length;
  let del_array=[];
  for(let i=0 ; i<size ; i++) {
      if(parsed.todos[i].id!=iD)
      {
          del_array.push(parsed.todos[i])
      }
  }
  let obj={todos: del_array}
  fs.writeFileSync("./db.json", JSON.stringify(obj));
  res.send("data deleted")
}) 

app.patch('/:ID',(req,res)=>{
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsed=JSON.parse(data);
  const iD=req.params.ID;
  const size = parsed.todos.length;
  let updated_array=[];
  for(let i=0 ; i<size ; i++) {
      if(parsed.todos[i].id==iD)
      {
          let z= parsed.todos[i].status
          if(z==true)
          {
            parsed.todos[i].status=false;
          }
          else
          {
            parsed.todos[i].status=true;
          }
          // updated_array.push(parsed.todos[i])
      }
  }
  let obj={todos: parsed.todos}
  fs.writeFileSync("./db.json", JSON.stringify(obj));
  res.send("data Updated")

})

app.listen(4500, ()=>{
    console.log("Running on port 4500")
})

