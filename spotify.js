const client_id = '79f52346df4f474a8b8d82fe59ddc635';
const redirect_uri= 'http://127.0.0.1:5500/spotify.html';
const grant_type= "authorization_code";
const client_secret = "b54aa5ebd4eb4a739dd24317157443a1"
const auth = btoa(`${client_id}:${client_secret}`)
const tokenurl = 'https://accounts.spotify.com/api/token'
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${auth}`,
  },
  body: `grant_type=client_credentials&code=${console.log(getcode())}&redirect_uri=${redirect_uri}&${client_id}&${client_secret}`,
};

function redirect(){
  const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`

 window.location = url
}

async function handleAuthCallback() {
  try {
    getcode()
  } catch (error) {
    console.error(error);
  }
  getToken()
}

async function getToken(){
const response = await fetch(tokenurl,options)
const data = await response.json()
console.log(data)
}

if (window.location.href.includes("code")) {
  handleAuthCallback();
 
} else {
  redirect();
}

function getcode(){
  let code = null
  const params = new URLSearchParams(window.location.search);
  code = params.get("code");
  console.log(code)
  return code
}