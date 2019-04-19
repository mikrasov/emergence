const fs = require('fs')
const { exec } = require('child_process')

console.log("Starting MongoDB")

if (!fs.existsSync("./db_data")){
  fs.mkdirSync("./db_data")
}

if (!fs.existsSync("./db_logs")){
  fs.mkdirSync("./db_logs")
}

exec('mongod --dbpath ./db_data --logpath ./db_logs/mongodb.log', (err, stdout, stderr) => {
  console.log(`${stdout}`);
  console.log(`${stderr}`);
})
