const express = require("express");
const user = express();
user.use(express.json());

const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbpath = path.join(__dirname, "mydb.db");

let db = null;
const dbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    user.listen(3009);
    console.log("Server Running: http://localhost:3009/");
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
  }
};
dbAndServer();

const details = (each) => {
    return {
    invoiceId  : each.invoiceid ,
    amount : each.amount,
    date : each.date 
    };
  };

user.get("/" , async (req,res) => {
    const query = `select * from employee;` ;
    const result = await db.all(query) ;
    res.send(result.map((each) => details(each)))
})
