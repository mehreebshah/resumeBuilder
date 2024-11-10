
declare const html2pdf: any;

const form = document.getElementById("resumeform") as HTMLFormElement | null;
const resumePage = document.getElementById("resumePage") as HTMLDivElement | null;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement | null;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement | null;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement | null;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement | null;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement | null;
const resumeWorkExperience = document.getElementById("resumeWorkExperience") as HTMLParagraphElement | null;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement | null;
const resumeAddress = document.getElementById("resumeAddress") as HTMLParagraphElement | null;
const generateButton = document.getElementById("generateButton") as HTMLButtonElement | null;
const editButton = document.getElementById("editButton") as HTMLButtonElement | null;
const shareLinkButton = document.getElementById("shareLinkButton") as HTMLButtonElement | null;
const backButton = document.getElementById("backButton") as HTMLButtonElement | null;
const downloadpdfbutton = document.getElementById("downloadpdf") as HTMLButtonElement | null;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement | null;
const resumeLanguages = document.getElementById("resumeLanguages") as HTMLParagraphElement | null;
const resumeAboutme = document.getElementById("resumeAboutme") as HTMLParagraphElement | null;

// Add a null check for `generateButton` and `shareLinkButton`
if (generateButton) {
    generateButton.addEventListener("click", async (event: Event) => {
        event.preventDefault();
        
        // Get input values with null checks for each field
        const name = (document.getElementById("name") as HTMLInputElement)?.value || "";
        const email = (document.getElementById("email") as HTMLInputElement)?.value || "";
        const phone = (document.getElementById("phone") as HTMLInputElement)?.value || "";
        const education = (document.getElementById("education") as HTMLInputElement)?.value || "";
        const workExperience = (document.getElementById("workExperience") as HTMLInputElement)?.value || "";
        const skills = (document.getElementById("skills") as HTMLInputElement)?.value || "";
        const address = (document.getElementById("address") as HTMLInputElement)?.value || "";
        const language = (document.getElementById("language") as HTMLInputElement)?.value || "";
        const aboutme = (document.getElementById("aboutme") as HTMLInputElement)?.value || "";
        
        const photoInput = document.getElementById("photo") as HTMLInputElement | null;
        const photoFile = photoInput?.files ? photoInput.files[0] : null;

        // Convert photo to base64 if selected
        let photoBase64 = "";
        if (photoFile) {
            photoBase64 = await fileToBase64(photoFile);
            if (resumePhoto) resumePhoto.src = photoBase64;
            localStorage.setItem("resumePhoto", photoBase64);
        }

        // Update resume content fields with null checks
        if (resumeName) resumeName.textContent = name;
        if (resumeEmail) resumeEmail.textContent = `Email: ${email}`;
        if (resumePhone) resumePhone.textContent = `Phone: ${phone}`;
        if (resumeEducation) resumeEducation.textContent = education;
        if (resumeWorkExperience) resumeWorkExperience.textContent = workExperience;
        if (resumeSkills) resumeSkills.textContent = skills;
        if (resumeAddress) resumeAddress.textContent = address;
        if (resumeAboutme) resumeAboutme.textContent = aboutme;
        if (resumeLanguages) resumeLanguages.textContent = language;

        if (form) form.classList.add("hidden");
        if (resumePage) resumePage.classList.remove("hidden");
        if (editButton) editButton.classList.remove("hidden");

        // Generate URL with query parameters
        const queryParams = new URLSearchParams({
            name,
            email,
            phone,
            education,
            Skills: skills,
            WorkExperience: workExperience,
            Address: address,
            language,
            aboutme
        });

        const uniqueURL = `${window.location.origin}?${queryParams.toString()}`;
        window.history.replaceState(null, "", `?${queryParams.toString()}`);

        // Event listener for sharing the unique URL
        if (shareLinkButton) {
            shareLinkButton.addEventListener("click", () => {
                navigator.clipboard.writeText(uniqueURL);
                alert("The link is copied.");
            });
        }
    });
}

// Function to convert file to base64
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Edit button functionality with null checks
if (editButton) {
    editButton.addEventListener("click", () => {
        if (form) form.classList.remove("hidden");
        if (resumePage) resumePage.classList.add("hidden");
        editButton.classList.add("hidden");
    });
}

// Download PDF button functionality
if (downloadpdfbutton) {
    downloadpdfbutton.addEventListener("click", () => {
        if (typeof html2pdf === "undefined") {
            alert("Error: html2pdf library is not loaded");
            return;
        }

        const resumeOptions = {
            margin: 0.5,
            filename: "resume.pdf",
            image: { type: "jpg", quality: 1.0 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };
        
        if (resumeContent) {
            html2pdf().set(resumeOptions).from(resumeContent).save().catch((error: Error) => {
                console.error("PDF error", error);
            });
        }
    });
}

// DOM content loaded functionality
window.addEventListener("DOMContentLoaded", () => {
    const param = new URLSearchParams(window.location.search);
    const name = param.get("name") || "";
    const email = param.get("email") || "";
    const phone = param.get("phone") || "";
    const education = param.get("education") || "";
    const workExperience = param.get("WorkExperience") || "";
    const skills = param.get("Skills") || "";
    const address = param.get("Address") || "";
    const language = param.get("language") || "";
    const aboutme = param.get("aboutme") || "";

    if (resumeName) resumeName.textContent = name;
    if (resumeEmail) resumeEmail.textContent = `Email: ${email}`;
    if (resumePhone) resumePhone.textContent = `Phone: ${phone}`;
    if (resumeEducation) resumeEducation.textContent = education;
    if (resumeWorkExperience) resumeWorkExperience.textContent = workExperience;
    if (resumeSkills) resumeSkills.textContent = skills;
    if (resumeAddress) resumeAddress.textContent = address;
    if (resumeLanguages) resumeLanguages.textContent = language;
    if (resumeAboutme) resumeAboutme.textContent = aboutme;

    const savedPhoto = localStorage.getItem("resumePhoto");
    if (savedPhoto && resumePhoto) resumePhoto.src = savedPhoto;
});
