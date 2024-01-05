let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadqr = document.getElementById("downloadqr");

function generateQR() {
    if (qrText.value.length > 0) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
        imgBox.classList.add("showimg");
        setTimeout(() => {
            downloadqr.classList.add("showdown");
        }, 1000);
    }
    else {
        alert("Enter the text or URL to generate your QR code")
    }
}

// downloadqr.addEventListener('click',()=>{
//     if(qrImage.src!=="")
//     {
//         var link=document.createElement('a');
//         link.href=qrImage.src;
//         link.download="qrcode.png";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
//     else
//     {
//         alert("Please generate QR code before downloading.")
//     }
// });

// This code fetches the QR code image as a Blob and then creates a Blob URL to initiate the download. 
// Additionally, it uses URL.revokeObjectURL to free up resources once the download is complete.
downloadqr.addEventListener('click', () => {
    if (qrImage.src !== "") {
        // Convert the image to a Blob
        fetch(qrImage.src)
            .then(response => response.blob())
            .then(blob => {
                // Create a Blob URL
                var blobUrl = URL.createObjectURL(blob);

                // Create a link element to trigger the download
                var link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'qrcode.png';
                document.body.appendChild(link);

                // Trigger the click event on the link to start the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);

                // Revoke the Blob URL to free up resources
                URL.revokeObjectURL(blobUrl);
            });
    }
});

// Blob( Binary Large Object) is a data type that represents raw binary data. 
// It can store a variety of data types, such as images, audio, or any other binary format.
// Blobs are often used when working with files, streams, or binary data that needs to be handled in JavaScript. 

// In the code above, a Blob is used to represent the binary data of the QR code image. 

// Fetching the image as a Blob 
// The fetch function is used to retrieve the QR code image from its source.

// Creating a Blob URL 
// The URL.createObjectURL(blob) method is used to create a Blob URL.
// This URL represents the binary data stored in the Blob and can be used as the href attribute of an <a> (anchor) tag. 

//Downloading the Blob
// A dynamically created <a> tag is used with the Blob URL as its href attribute.
// The download attribute is set to specify the filename for the downloaded file.

//A Blob is an object that allows JavaScript to handle binary data, and it is used in this context to download the QR code image as a file. 