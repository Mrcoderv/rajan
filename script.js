document.getElementById("copy-email-btn").addEventListener("click", function() {
    // The email address to copy
    var email = "Rajanaryal@gmail.com";
    
    // Create a temporary input field to copy the email address
    var tempInput = document.createElement("input");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    
    // Select and copy the email
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    
    // Remove the temporary input field
    document.body.removeChild(tempInput);
    
    // Show a message indicating the email has been copied
    var statusElement = document.getElementById("copy-status");
    statusElement.textContent = "Email copied to clipboard!";
    
    // Reset the message after 2 seconds
    setTimeout(function() {
        statusElement.textContent = "";
    }, 2000);
});
