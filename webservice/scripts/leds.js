
const sampleTimeSec = 0.1;                  ///< sample time in sec
const sampleTimeMsec = 1000*sampleTimeSec;
const url = "http://localhost:5000/";
var timer;

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const hueSlider = document.querySelector('.hue-slider');
const colorPreview = document.querySelector('.color-preview');

hueSlider.addEventListener('input', updateColor);


function updateColor() {
  const hue = hueSlider.value;
  const rgb = hslToRgb(h=hue,s=1,l= 0.5);
  colorPreview.style.background = `hsl(${hue}, 100%, 50%)`;
  return rgb
}

let request_body = {"request":[]}
function appendToRequests(led){
  request_body['request'].push(led);
}


function convertToJSON(req){
  let dict_to_json = JSON.parse(req);
  return dict_to_json
}

var tiles = document.querySelectorAll('.tile');

tiles.forEach(function (tile) {
  tile.addEventListener('click', function () {
    this.style.backgroundColor = 'rgb('+updateColor().join(',')+')';
    let led_info = {"position":[this.dataset.x,this.dataset.y],"rgb":updateColor()}
    appendToRequests(led_info);
  });
 
});

function getLandingPage(){
  parent.location = "index.html"
}
function getRequest() {
  console.log(request_body)
	fetch(url,{
    method:'POST',
    body:request_body,
    headers:{"Content-Type":"application/json"}
  })
	.then((response) => { 
	
		if (response.ok){
      console.log(response.json()); 
			return response.json();
    }
		else 
			return Promise.reject(response);
		
	})
	.then((responseJSON) => {
		
		document.getElementById("response").value = JSON.stringify(responseJSON);
		document.getElementById("json").value = responseJSON.data;
		
	})
	.catch((error) => {
		
		var errMsg = '<font color="red">Error: ';
		if(error.status != null)
			errMsg += error.statusText + ' (' + error.status + ')</font>';
		else
			errMsg += error.message + '</font>';
	});
}


function submitButton(){
    getRequest();
}