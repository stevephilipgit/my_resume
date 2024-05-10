let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = function(event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            document.getElementById("inputText").value += event.results[i][0].transcript;
        }
    }
};

recognition.onend = function() {
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
};

function startRecording() {
    recognition.start();
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    alert("Recording Started");
}

function stopRecording() {
    recognition.stop();
    alert("Recording Stopped");
}

// Encrypts the given plain text using the Caesar cipher
function encrypt(plainText, shift) {
    let encryptedText = '';

    for (let i = 0; i < plainText.length; i++) {
        let ch = plainText[i];
        if (ch.match(/[a-z]/i)) {
            let code = plainText.charCodeAt(i);
            if (ch.match(/[a-z]/)) {
                ch = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            } else if (ch.match(/[A-Z]/)) {
                ch = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            }
        }
        encryptedText += ch;
    }

    return encryptedText;
}

// Decrypts the given cipher text using the Caesar cipher
function decrypt(cipherText, shift) {
    return encrypt(cipherText, (26 - shift) % 26); // Decryption is essentially encryption with the opposite shift
}

// Function to perform encryption on text in textarea
function encryptText() {
    let plainText = document.getElementById("inputText").value;
    let shift = 3; // You can set the shift value as needed
    let encryptedText = encrypt(plainText, shift);
    document.getElementById("inputText").value = encryptedText;
}

// Function to perform decryption on text in textarea
function decryptText() {
    let cipherText = document.getElementById("inputText").value;
    let shift = 3; // You need to use the same shift value used for encryption
    let decryptedText = decrypt(cipherText, shift);
    document.getElementById("inputText").value = decryptedText;
}

function to_clear(){
    document.getElementById("inputText").value="";
}