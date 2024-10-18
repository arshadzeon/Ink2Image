const key = "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";
const inputText = document.querySelector(".typeinput");
const image = document.querySelector(".image");
const Genbtn = document.querySelector(".generate");
const downloadBtn = document.querySelector(".download");
const resetBtn = document.querySelector(".reset");

// Function to query the Hugging Face API for text-to-image generation
async function query() {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${key}`
            },
            method: "POST",
            body: JSON.stringify({ "inputs": inputText.value }),
        }
    );
    const result = await response.blob();
    return result;
}

// Function to generate and display the image
async function generate() {
    query().then((response) => {
        const objectUrl = URL.createObjectURL(response);
        image.src = objectUrl; // Display generated image in the output section
        image.dataset.url = objectUrl; // Store the object URL for downloading
    });
}

// Function to download the image
function downloadImage() {
    if (image.src) {
        const link = document.createElement('a');
        link.href = image.dataset.url;
        link.download = 'generated-image.png';
        link.click();
    } else {
        alert("No image to download. Please generate an image first.");
    }
}

// Add event listeners to the buttons
Genbtn.addEventListener('click', () => {
    if (inputText.value.trim() !== "") {
        generate(); // Trigger image generation
    } else {
        alert("Please enter some text to generate the image.");
    }
});

// Download button to trigger the image download
downloadBtn.addEventListener('click', () => {
    downloadImage(); // Download the generated image
});

// Optional: Allow pressing "Enter" to trigger the image generation
inputText.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        generate();
    }
});
