const BASE_URL = "https://api.remonline.app/";
const API_KEY = "237a1231fe9b4a13b66e5389598b9d85";

const NAMES_MAP = {
	"10": {
		"LEADTYPE_ID": "74157",
		"AD_CAMPAIN_ID": '345729',
		"your-name": "contact_name",
		"your-phone": "contact_phone",
		"your-message": "description",
	}
};

async function getToken(){
  var url = BASE_URL + 'token/new?api_key=' + API_KEY;
  try {
  var response = await fetch(url, {
        method: 'GET',
        cors: "no-cors",
        headers: {
          "Accept": "*/*",
        }
      });
  var json = await response.json();
  var token = json?.token;
  }
  catch (e) {
     console.error("obtain token error");
  }
  return token;
}
	
document.addEventListener( 'wpcf7submit', async( event ) => {
// all forms create the same event
  var token = await getToken();
  var inputs = event.detail.inputs;
  var formId = event.detail.contactFormId;
  var unitTag = event.detail.unitTag;
  console.log(`tag=${unitTag}`);

  var _data =`token=${token}&leadtype_id=${NAMES_MAP[formId].LEADTYPE_ID}&ad_campaign_id=${NAMES_MAP[formId].AD_CAMPAIN_ID}`;

  inputs.forEach((el)=>{
	let name = NAMES_MAP[formId][el.name];
	let value = el.value;
	let s = name ? `&${name}=${encodeURI(value)}` : '';
	console.log(s);
	_data = _data + s;
  });
  console.log(_data);
  url = BASE_URL + "lead/";

  try {
  response = await fetch(url, {
        method: "POST",
        cors: "no-cors",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: _data // body data type must match "Content-Type" header
      });
  json = await response.json(); 
  alert(`id = ${json.data?.id}`);
  }
  catch (e) {
     console.error('post lead error');
  }
}, false );