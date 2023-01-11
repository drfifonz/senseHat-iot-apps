
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

let request_body = {requests:[]}
function appendToRequests(led){
  request_body['requests'].push(led);
}


function convertToJSON(req){
  var dict_to_json = JSON.stringify(req);
  return dict_to_json
}

var tiles = document.querySelectorAll('.tile');

tiles.forEach(function (tile) {
  tile.addEventListener('click', function () {
    this.style.backgroundColor = 'rgb('+updateColor().join(',')+')';
    let led_info = {"position":[parseInt(this.dataset.x),parseInt(this.dataset.y)],"rgb":updateColor()}
    appendToRequests(led_info);
  });
 
});

function getLandingPage(){
  parent.location = "index.html"
} 


console.log(request_body) 
function getRequest() { 
  console.log("JSON: ",convertToJSON(request_body))
	fetch(url,{
    method:'POST',
    body:JSON.stringify(request_body),
    headers: {'Content-Type': 'application/json','Accept':'application/json'},
    mode:'cors'
  })
	.then((response) => { 
    console.log(response)
		if (response.ok){
      console.log(response.json()); 
			return response.json();
    }
		else 
			return Promise.reject(response);
		
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
    tiles.forEach(function(tile){
      tile.style.backgroundColor = "rgb(255,255,255)"
    })
    getRequest();
}