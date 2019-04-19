import fetch from 'isomorphic-unfetch'

const LOCAL_SERVER = 'http://localhost:3000/'

function postJson(path,data){
  console.log("POST to '"+LOCAL_SERVER+path+"':\n" + JSON.stringify(data))

  fetch(LOCAL_SERVER+path, {
    mode: 'cors',
    method: 'POST',
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then( (response) => console.log(response) )
}


async function getJson(path){
  console.log("GET from '"+LOCAL_SERVER+path+"':\n" )

  const res = await fetch(LOCAL_SERVER+path)
  const data = await res.json()

  console.log(`Fetched ${data.length} entries`)
  return data
}

export {getJson, postJson}
