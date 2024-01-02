const BASE_URL = "https://api.remonline.app/";
const API_KEY = sessionStorage.getItem("api_key") || '';
const LEADTYPE_ID = sessionStorage.getItem("lead_type") || '';
const AD_CAMPAIN_ID =  sessionStorage.getItem("ad_compain") || '';


async function getToken(){
  const url = BASE_URL + 'token/new?api_key=' + API_KEY;
  const response = await fetch(url, {
        method: 'GET',
        cors: "no-cors",
        headers: {
          "Accept": "*/*",
        }
      })
  return response.json();
}

async function makeRequest(token){
  const data = "contact_name="+document.forms["myForm"]["contact_name"].value+"&contact_phone="+document.forms["myForm"]["contact_phone"].value+
        "&description="+encodeURI(document.getElementById("description").value)+"&leadtype_id="+LEADTYPE_ID+"&ad_compain_id="+AD_CAMPAIN_ID+
        "&token="+token;
  const url = BASE_URL + "lead/";

  const response = await fetch(url, {
        method: "POST",
        cors: "no-cors",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: data // body data type must match "Content-Type" header
      });

  return response.json();
}

function sendForm() {
  if (! document.forms["myForm"].reportValidity()){
    return false;
  }
  let x = document.forms["myForm"]["contact_name"].value;
  let y = document.forms["myForm"]["contact_phone"].value;
  if ( x == '' || y ==  '' ) {
    document.getElementById('response').innerHTML = 'fill the form';
    document.getElementById('response').style.display = "block";
    return false;
  }
  getToken()
    .then((json) => {
        var token = json?.token;
        makeRequest(token)
          .then((text)=>{
            document.getElementById('response').innerHTML = "Thank you for the feedback. Your message get number:" + text?.data?.id;
            document.forms["myForm"].style.display = 'none';
            document.getElementById('response').style.display = "block";
            return true;
          }).catch (err => {
            document.getElementById('response').innerHTML = "Post lead error: " + err;
            document.getElementById('response').style.display = "block";
            return false;
          })})
    .catch(err => {
        document.getElementById('response').innerHTML = `Get token error ${err}`;
        document.getElementById('response').style.display = "block";
        return false;
    });
};


document.getElementById('response').addEventListener('click', (e)=>{
    closeResponse();
});

document.getElementById('close-button').addEventListener('click', (e)=> {
    closeResponse();
});

document.getElementById('sendForm').addEventListener('click', (e)=>{
     sendForm();
});

function closeResponse(){
    window.parent.postMessage('close', '*');
};

window.addEventListener('load', (e)=>{
    const S_NAME = sessionStorage.getItem("s_name") || 'Name:';
    const S_PHONE =  sessionStorage.getItem("s_phone") || 'Phone:';
    const S_DESC =  sessionStorage.getItem("s_desc") || 'Description:';
    const S_TITLE =  sessionStorage.getItem("s_title") || 'Query form:';
    const S_SUBMIT = sessionStorage.getItem("s_submit") || 'Submit';

    document.getElementById('name_cap').innerHTML = S_NAME;
    document.getElementById('phone_cap').innerHTML = S_PHONE;
    document.getElementById('desc_cap').innerHTML = S_DESC;
    document.getElementById('title_cap').innerHTML = S_TITLE;
    document.getElementById('submit_cap').innerHTML = S_SUBMIT;  
    // document.getElementById('name_cap')?.setAttribute('s_name', S_NAME);
    // document.getElementById('phone_cap')?.setAttribute('s_phone', S_PHONE);
    // document.getElementById('desc_cap')?.setAttribute('s_desc', S_DESC);
    // document.getElementById('title_cap')?.setAttribute('s_title', S_TITLE);
    // document.getElementById('submit_cap')?.setAttribute('s_submit', S_SUBMIT);  
});
