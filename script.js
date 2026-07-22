const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", function () {
    navigation.classList.toggle("open");

    const menuIsOpen = navigation.classList.contains("open");

    menuButton.setAttribute(
        "aria-label",
        menuIsOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
});

const navigationLinks = document.querySelectorAll("nav a");

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
    });
});const enquiryForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = enquiryForm.querySelector("button");

enquiryForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    const formData = new FormData(enquiryForm);

    try {
        const response = await fetch(enquiryForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            formStatus.textContent =
                "Thank you for contacting Croplink. Your enquiry has been received.";

            formStatus.className = "form-status success";
            enquiryForm.reset();
        } else {
            formStatus.textContent =
                "We could not send your enquiry. Please try again.";

            formStatus.className = "form-status error";
        }
    } catch (error) {
        formStatus.textContent =
            "We could not send your enquiry. Please check your connection and try again.";

        formStatus.className = "form-status error";
    }

    submitButton.disabled = false;
    submitButton.textContent = "Send Enquiry";
});