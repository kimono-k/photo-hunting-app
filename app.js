const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
const featureExtractor = ml5.featureExtractor("MobileNet", modelLoaded);

let classifier2;
let model = false;
let trained = false;
let synth = window.speechSynthesis;

// Initialize the elements on the HTML
const image = document.getElementById("output");
const fileButton = document.getElementById("file");
const prediction = document.getElementById("prediction");
const predictionDiv = document.getElementById("prediction-section");
const trainButton = document.getElementById("train-button");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");

//Listen to changes on the image
fileButton.addEventListener("change", (event) => loadFile(event));

function loadFile(event) {
  image.src = URL.createObjectURL(event.target.files[0]);
  image.addEventListener("load", () => userImageUploaded());

  function userImageUploaded() {
    if (model == true) {
      console.log("The image is now visible in the DOM");

      classifier.classify(document.getElementById("output"), (err, results) => {
        console.log(results);
        predictionDiv.style.display = "block";
        if (results[0] !== "chihuahua") {
          prediction.innerHTML = `This is not a chihuahua, but a ${results[0].label}`;
          speak(results[0].label);
        } else {
          prediction.innerHTML = `This is a chihuahua ${results[0].label}`;
          speak(results[0].label);
        }
      });
    }
  }
}

function modelLoaded() {
  model = true;
  console.log("Models loaded!");
}

// Reads the text when there is a result
function speak(text) {
  if (synth.speaking) {
    console.log("still speaking...");
    return;
  }
  if (text !== "") {
    console.log(text);
    let utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }
}

// 1 - Train model

// Downloads the json file of your trained model

// Load model
