function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If QR code is successfully scanned
    function onScanSuccess(decodeText, decodeResult) {
        // Check if the decoded text is a valid URL
        if (isValidUrl(decodeText)) {
            window.location.href = decodeText;  // Redirect to the URL
        } else {
            alert("Scanned QR code is not a valid URL: " + decodeText);
        }
    }

    // Function to validate if the scanned text is a valid URL
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Initialize QR scanner
    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});
