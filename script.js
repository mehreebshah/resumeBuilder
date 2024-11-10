"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeform");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperience = document.getElementById("resumeWorkExperience");
const resumeSkills = document.getElementById("resumeSkills");
const resumeAddress = document.getElementById("resumeAddress");
const generateButton = document.getElementById("generateButton");
const editButton = document.getElementById("editButton");
const shareLinkButton = document.getElementById("shareLinkButton");
const backButton = document.getElementById("backButton");
const downloadpdfbutton = document.getElementById("downloadpdf");
const resumeContent = document.getElementById("resumeContent");
const resumeLanguages = document.getElementById("resumeLanguages");
const resumeAboutme = document.getElementById("resumeAboutme");
// Add a null check for `generateButton` and `shareLinkButton`
if (generateButton) {
    generateButton.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        event.preventDefault();
        // Get input values with null checks for each field
        const name = ((_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value) || "";
        const email = ((_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value) || "";
        const phone = ((_c = document.getElementById("phone")) === null || _c === void 0 ? void 0 : _c.value) || "";
        const education = ((_d = document.getElementById("education")) === null || _d === void 0 ? void 0 : _d.value) || "";
        const workExperience = ((_e = document.getElementById("workExperience")) === null || _e === void 0 ? void 0 : _e.value) || "";
        const skills = ((_f = document.getElementById("skills")) === null || _f === void 0 ? void 0 : _f.value) || "";
        const address = ((_g = document.getElementById("address")) === null || _g === void 0 ? void 0 : _g.value) || "";
        const language = ((_h = document.getElementById("language")) === null || _h === void 0 ? void 0 : _h.value) || "";
        const aboutme = ((_j = document.getElementById("aboutme")) === null || _j === void 0 ? void 0 : _j.value) || "";
        const photoInput = document.getElementById("photo");
        const photoFile = (photoInput === null || photoInput === void 0 ? void 0 : photoInput.files) ? photoInput.files[0] : null;
        // Convert photo to base64 if selected
        let photoBase64 = "";
        if (photoFile) {
            photoBase64 = yield fileToBase64(photoFile);
            if (resumePhoto)
                resumePhoto.src = photoBase64;
            localStorage.setItem("resumePhoto", photoBase64);
        }
        // Update resume content fields with null checks
        if (resumeName)
            resumeName.textContent = name;
        if (resumeEmail)
            resumeEmail.textContent = `Email: ${email}`;
        if (resumePhone)
            resumePhone.textContent = `Phone: ${phone}`;
        if (resumeEducation)
            resumeEducation.textContent = education;
        if (resumeWorkExperience)
            resumeWorkExperience.textContent = workExperience;
        if (resumeSkills)
            resumeSkills.textContent = skills;
        if (resumeAddress)
            resumeAddress.textContent = address;
        if (resumeAboutme)
            resumeAboutme.textContent = aboutme;
        if (resumeLanguages)
            resumeLanguages.textContent = language;
        if (form)
            form.classList.add("hidden");
        if (resumePage)
            resumePage.classList.remove("hidden");
        if (editButton)
            editButton.classList.remove("hidden");
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
    }));
}
// Function to convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
// Edit button functionality with null checks
if (editButton) {
    editButton.addEventListener("click", () => {
        if (form)
            form.classList.remove("hidden");
        if (resumePage)
            resumePage.classList.add("hidden");
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
            html2pdf().set(resumeOptions).from(resumeContent).save().catch((error) => {
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
    if (resumeName)
        resumeName.textContent = name;
    if (resumeEmail)
        resumeEmail.textContent = `Email: ${email}`;
    if (resumePhone)
        resumePhone.textContent = `Phone: ${phone}`;
    if (resumeEducation)
        resumeEducation.textContent = education;
    if (resumeWorkExperience)
        resumeWorkExperience.textContent = workExperience;
    if (resumeSkills)
        resumeSkills.textContent = skills;
    if (resumeAddress)
        resumeAddress.textContent = address;
    if (resumeLanguages)
        resumeLanguages.textContent = language;
    if (resumeAboutme)
        resumeAboutme.textContent = aboutme;
    const savedPhoto = localStorage.getItem("resumePhoto");
    if (savedPhoto && resumePhoto)
        resumePhoto.src = savedPhoto;
});
