const sampleTimeSec = 2;                  ///< sample time in sec  ///< sample time in msec
const maxSamplesNumber =100;               ///< maximum number of samples
var xdata; ///< x-axis labels array: time stamps
var ydata; ///< y-axis data array: random value
var xdata1; ///< x-axis labels array: time stamps
var ydata1; ///< y-axis data array: random value
var xdata2; ///< x-axis labels array: time stamps
var ydata2; ///< y-axis data array: random value
var xdata3; ///< x-axis labels array: time stamps
var ydata3; ///< y-axis data array: random value
var ydata4; ///< y-axis data array: random value
var ydata5; ///< y-axis data array: random value
var lastTimeStamp; ///< most recent time stamp 

var chartContext;  ///< chart context i.e. object that "owns" chart
var chart;         ///< Chart.js object

var chartContext1;  ///< chart context i.e. object that "owns" chart
var chart1;         ///< Chart.js object


var chartContext2;  ///< chart context i.e. object that "owns" chart
var chart2;  

var chartContext3;  ///< chart context i.e. object that "owns" chart
var chart3;  
var timer; ///< request timer

var url = 'http://2bfe-85-221-155-134.ngrok.io/'; // default value of url

var new_url = localStorage.getItem('url');
var select = document.getElementById("sampling");
function checkNewUrl(){
if (new_url){
  url = new_url;
}
}
checkNewUrl();
function updateValue(){

  var value = select.options[select.selectedIndex].value;
  var sampleTimeMsec = value;
  return sampleTimeMsec;

}

select.addEventListener("change", function() {
    var new_sampleTimeMsec = parseInt(updateValue());
    localStorage.setItem('sampling_rate',new_sampleTimeMsec);
    console.log(new_sampleTimeMsec);
  });
function addData(y){
  if(ydata.length > maxSamplesNumber)
  {
    removeOldData();
    lastTimeStamp += sampleTimeSec;
    xdata.push(lastTimeStamp.toFixed(4));
    
  }
  ydata.push(y);
  chart.update();
}
function addData1(y){
  if(ydata1.length > maxSamplesNumber)
  {
    removeOldData();
    lastTimeStamp += sampleTimeSec;
    xdata1.push(lastTimeStamp.toFixed(4));
    
  }
  ydata1.push(y);
  chart1.update();
}

function addData2(y){
  if(ydata2.length > maxSamplesNumber)
  {
    removeOldData();
    lastTimeStamp += sampleTimeSec;
    xdata2.push(lastTimeStamp.toFixed(4));
    
  }
  ydata2.push(y);
  chart2.update();
}
function addData3(y){
  console.log(y)
  if(ydata3.length > maxSamplesNumber)
  {
    removeOldData();
    lastTimeStamp += sampleTimeSec;
    xdata3.push(lastTimeStamp.toFixed(4));
    
  }
  ydata3.push(y);
  chart3.update();
}
function addData4(y){
  console.log(y)
  if(ydata4.length > maxSamplesNumber)
  {
    removeOldData();
    lastTimeStamp += sampleTimeSec;
    xdata3.push(lastTimeStamp.toFixed(4));
    
  }
  ydata4.push(y);
  chart3.update();
}
function addData5(y){
  console.log(y)
  if(ydata5.length > maxSamplesNumber)
  {
    removeOldData();
    lastTimeStamp += sampleTimeSec;
    xdata3.push(lastTimeStamp.toFixed(4));
    
  }
  ydata5.push(y);
  chart3.update();
}
function goToMenu(){
    parent.location = "index.html"
}

function removeOldData(){
  xdata.splice(0,1);
  ydata.splice(0,1);
  xdata1.splice(0,1);
  ydata.splice(0,1);
}


function startTimer(){
  new_sampleTime = localStorage.getItem('sampling_rate')
  console.log(new_sampleTime)
  timer = setInterval(ajaxJSON, parseInt(100));
}


function stopTimer(){
  clearInterval(timer);
}


function ajaxJSON() {
  $.ajax(url+'?pressure=hPa&temperature=c&humidity=%&orientation=d', {
    type: 'GET', dataType: 'json',
    success: function(responseJSON, status, xhr) {
      console.log(responseJSON);
      addData(+responseJSON["pressure"]);
      addData1(+responseJSON["temperature"])
      addData2(+responseJSON["humidity"])
      addData3(+responseJSON["orientation"][0])
      addData4(+responseJSON["orientation"][1])
      addData5(+responseJSON["orientation"][2])
    }
  });
}

function chartInit()
{
  // array with consecutive integers: <0, maxSamplesNumber-1>
  xdata = [...Array(maxSamplesNumber).keys()]; 
  // scaling all values ​​times the sample time 
  xdata.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);

  // last value of 'xdata'
  lastTimeStamp = +xdata[xdata.length-1]; 

  // empty array
  ydata = []; 
  ydata1 = [];
  // get chart context from 'canvas' element
  chartContext = $("#chart")[0].getContext('2d');

  chart = new Chart(chartContext, {
    // The type of chart: linear plot
    type: 'line',

    // Dataset: 'xdata' as labels, 'ydata' as dataset.data
    data: {
      labels: xdata,
      datasets: [{
        fill: false,
        label: 'Pressure',
        backgroundColor: 'rgb(102, 0, 255)',
        borderColor: 'rgb(102, 0, 255)',
        data: ydata,
        lineTension: 0
      }
    ]
    },

    // Configuration options
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Pressure [hPa]'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time [s]'
          }
        }]
      }
    }
  });
  
  ydata = chart.data.datasets[0].data;
  xdata = chart.data.labels;
}
function chartInit2()
{
  // array with consecutive integers: <0, maxSamplesNumber-1>
  xdata1 = [...Array(maxSamplesNumber).keys()]; 
  // scaling all values ​​times the sample time 
  xdata1.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);

  // last value of 'xdata'
  lastTimeStamp = +xdata1[xdata1.length-1]; 

  // empty array 
  ydata1 = [];
  // get chart context from 'canvas' element
  chartContext1 = $("#chart1")[0].getContext('2d');

  chart1= new Chart(chartContext1, {
    // The type of chart: linear plot
    type: 'line',

    // Dataset: 'xdata' as labels, 'ydata' as dataset.data
    data: {
      labels: xdata1,
      datasets: [{
        fill: false,
        label: 'Temperature',
        backgroundColor: 'rgb(102, 0, 255)',
        borderColor: 'rgb(102, 0, 255)',
        data: ydata1,
        lineTension: 0
      }
    ]
    },

    // Configuration options
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Temperature [C]'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time [s]'
          }
        }]
      }
    }
  });
  
  ydata1 = chart1.data.datasets[0].data;
  xdata1 = chart1.data.labels;
}
function chartInit3()
{
  // array with consecutive integers: <0, maxSamplesNumber-1>
  xdata2 = [...Array(maxSamplesNumber).keys()]; 
  // scaling all values ​​times the sample time 
  xdata2.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);

  // last value of 'xdata'
  lastTimeStamp = +xdata2[xdata2.length-1]; 

  // empty array 
  ydata2 = [];
  // get chart context from 'canvas' element
  chartContext2 = $("#chart2")[0].getContext('2d');

  chart2= new Chart(chartContext2, {
    // The type of chart: linear plot
    type: 'line',

    // Dataset: 'xdata' as labels, 'ydata' as dataset.data
    data: {
      labels: xdata2,
      datasets: [{
        fill: false,
        label: 'Humidity',
        backgroundColor: 'rgb(102, 0, 255)',
        borderColor: 'rgb(102, 0, 255)',
        data: ydata2,
        lineTension: 0
      }
    ]
    },

    // Configuration options
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Humidity [%]'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time [s]'
          }
        }]
      }
    }
  });
  
  ydata2 = chart2.data.datasets[0].data;
  xdata2 = chart2.data.labels;
}
function chartInit4()
{
  // array with consecutive integers: <0, maxSamplesNumber-1>
  xdata3 = [...Array(maxSamplesNumber).keys()]; 
  // scaling all values ​​times the sample time 
  xdata3.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);

  // last value of 'xdata'
  lastTimeStamp = +xdata3[xdata3.length-1]; 

  // empty array 
  ydata3 = [];
  ydata4 = [];
  ydata5 = [];
  // get chart context from 'canvas' element
  chartContext3 = $("#chart3")[0].getContext('2d');

  chart3= new Chart(chartContext3, {
    // The type of chart: linear plot
    type: 'line',

    // Dataset: 'xdata' as labels, 'ydata' as dataset.data
    data: {
      labels: xdata3,
      datasets: [{
        fill: false,
        label: 'Roll',
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(102, 0, 255)',
        data: ydata3,
        lineTension: 0
      },
      {
        fill: false,
        label: 'Pitch',
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(102, 0, 255)',
        data: ydata4,
        lineTension: 0
      },
      {
        fill: false,
        label: 'Yaw',
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(102, 0, 255)',
        data: ydata5,
        lineTension: 0
      }
    ]
    },

    // Configuration options
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Humidity [%]'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time [s]'
          }
        }]
      }
    }
  });
  
  ydata3 = chart3.data.datasets[0].data;
  ydata4 = chart3.data.datasets[1].data;
  ydata5 = chart3.data.datasets[2].data;
  xdata3 = chart3.data.labels;
}
$(document).ready(() => { 
  chartInit();
  chartInit2();
  chartInit3();
  chartInit4();
  $.ajaxSetup({ cache: false }); // Web browser cache control
  
  $("#start").click(startTimer);
  $("#stop").click(stopTimer);
  $("#samplenumber").text(maxSamplesNumber.toString());
});