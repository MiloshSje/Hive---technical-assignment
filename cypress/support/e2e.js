// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Ignore specific application errors that should not fail the test
Cypress.on("uncaught:exception", (err) => {
  const ignoreMessages = [
    "postMessage",
    "predefinedFunctions",
    "predefinedAttachments",
    "getBoundingClientRect",
    "Request failed with status code 412", // Axios 412 error
  ];

  if (ignoreMessages.some((msg) => err.message.includes(msg))) {
    return false; // prevent Cypress from failing the test
  }
});

// Handle unhandled promise rejections (Axios errors are often here)
Cypress.on("window:before:load", (win) => {
  win.addEventListener("unhandledrejection", (event) => {
    const message = String(event?.reason?.message || event?.reason || "");

    if (message.includes("status code 412")) {
      event.preventDefault(); // stop Cypress from failing the test
    }
  });
});
