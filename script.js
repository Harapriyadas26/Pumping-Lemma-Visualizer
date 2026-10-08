
/* =====================================
   PUMPING LEMMA VISUALIZER
   Step 5: Witness String Generation
===================================== */

// Get HTML elements
const languageSelect = document.getElementById("language");
const pumpingInput = document.getElementById("pumpingLength");
const generateBtn = document.getElementById("generateBtn");

const witnessDisplay = document.getElementById("witnessString");
const lengthDisplay = document.getElementById("stringLength");

// Generate witness string
function generateString() {

    // Step 1: Read user input
    const language = languageSelect.value;
    const p = Number(pumpingInput.value);

    // Step 2: Validate pumping length
    if (
        pumpingInput.value.trim() === "" ||
        !Number.isInteger(p) ||
        p < 1 ||
        p > 30
    ) {
        alert("Please enter a pumping length between 1 and 30.");
        return;
    }

    // Step 3: Generate string
    let w = "";

    if (language === "anbn") {

        w = "a".repeat(p) + "b".repeat(p);

    } else if (language === "0n1n") {

        w = "0".repeat(p) + "1".repeat(p);

    } else if (language === "anbncn") {

        w = "a".repeat(p) +
            "b".repeat(p) +
            "c".repeat(p);

    }

    // Step 4: Display generated string
    witnessDisplay.textContent = w;

    // Step 5: Display string length
    lengthDisplay.textContent = "Length: " + w.length;

    // Step 6: Reset unfinished simulation panels
    document.getElementById("xValue").textContent = "—";
    document.getElementById("yValue").textContent = "—";
    document.getElementById("zValue").textContent = "—";

    document.getElementById("pumpedString").textContent =
        "Decomposition not configured yet";

    document.getElementById("membershipResult").textContent =
        "Pumping simulation will be implemented next.";

    document.getElementById("constraint1").textContent =
        "○ |xy| ≤ p";

    document.getElementById("constraint2").textContent =
        "○ |y| > 0";

    document.getElementById("pumpValue").value = 0;
    document.getElementById("pumpLabel").textContent = "i = 0";

    document.getElementById("proofSteps").textContent =
        "Witness string generated. Decomposition and proof coming next.";
        setupDecomposition(w, p);
}

// Run function when button is clicked
generateBtn.addEventListener("click", generateString);

/* =====================================
   STEP 6: INTERACTIVE DECOMPOSITION
===================================== */

const xSlider = document.getElementById("xSlider");
const ySlider = document.getElementById("ySlider");

let currentWitness = "";
let currentP = 0;

// Initialize the decomposition
function setupDecomposition(w, p) {

    currentWitness = w;
    currentP = p;
    currentProofStep = 0;
    currentLanguage = languageSelect.value;

    // Show the sliders
    document.getElementById(
        "decompositionControls"
    ).hidden = false;

    // Pumping constraints:
    // |xy| <= p and |y| > 0

    xSlider.min = 0;
    xSlider.max = p - 1;
    xSlider.value = 0;

    ySlider.min = 1;
    ySlider.max = p;
    ySlider.value = 1;

    updateDecomposition();
}

// Update x, y, and z
function updateDecomposition() {

    if (!currentWitness) return;

    const xLength = Number(xSlider.value);

    // y must fit within the first p symbols
    ySlider.max = currentP - xLength;

    if (Number(ySlider.value) > Number(ySlider.max)) {
        ySlider.value = ySlider.max;
    }

    const yLength = Number(ySlider.value);

    // Divide w into three substrings
    const x = currentWitness.slice(0, xLength);

    const y = currentWitness.slice(
        xLength,
        xLength + yLength
    );

    const z = currentWitness.slice(
        xLength + yLength
    );

/* =====================================
   STEP 9A: COLORED WITNESS STRING
===================================== */

// Clear the existing witness visualization
witnessDisplay.replaceChildren();

// Create a character box with a specified color
function createCharacterBox(character, type) {

    const box = document.createElement("span");

    box.className = "character-box " + type;
    box.textContent = character;

    return box;
}

// Display x characters in cyan
for (const character of x) {
    witnessDisplay.appendChild(
        createCharacterBox(character, "char-x")
    );
}

// Display y characters in yellow
for (const character of y) {
    witnessDisplay.appendChild(
        createCharacterBox(character, "char-y")
    );
}

// Display z characters in green
for (const character of z) {
    witnessDisplay.appendChild(
        createCharacterBox(character, "char-z")
    );
}


    // Display x, y, and z
    document.getElementById("xValue").textContent =
        x || "ε";

    document.getElementById("yValue").textContent = y;

    document.getElementById("zValue").textContent =
        z || "ε";

    // Update slider labels
    document.getElementById("xLengthLabel").textContent =
        xLength;

    document.getElementById("yLengthLabel").textContent =
        yLength;

    // Validate the conditions
    const condition1 = xLength + yLength <= currentP;
    const condition2 = yLength > 0;

    document.getElementById("constraint1").textContent =
        (condition1 ? "✓ " : "✗ ") +
        "|xy| = " + (xLength + yLength) +
        " ≤ p = " + currentP;

    document.getElementById("constraint2").textContent =
        (condition2 ? "✓ " : "✗ ") +
        "|y| = " + yLength + " > 0";

    // Automatically update the pumping simulation
        updatePumping();
}

// Respond immediately when sliders move
xSlider.addEventListener("input", updateDecomposition);
ySlider.addEventListener("input", updateDecomposition);

/* =====================================
   STEP 7: PUMPING SIMULATION
===================================== */

const pumpSlider = document.getElementById("pumpValue");
const pumpLabel = document.getElementById("pumpLabel");
const pumpedDisplay = document.getElementById("pumpedString");
const membershipDisplay = document.getElementById("membershipResult");

let currentLanguage = "";

// Check whether a string belongs to the language
function checkMembership(str, language) {

    let match;

    if (language === "anbn") {

        match = str.match(/^(a*)(b*)$/);

        return match !== null &&
               match[1].length === match[2].length;

    } else if (language === "0n1n") {

        match = str.match(/^(0*)(1*)$/);

        return match !== null &&
               match[1].length === match[2].length;

    } else if (language === "anbncn") {

        match = str.match(/^(a*)(b*)(c*)$/);

        return match !== null &&
               match[1].length === match[2].length &&
               match[2].length === match[3].length;
    }

    return false;
}

// Update pumping simulation
function updatePumping() {

    if (!currentWitness) return;

    const xLength = Number(xSlider.value);
    const yLength = Number(ySlider.value);
    const i = Number(pumpSlider.value);

    // Get the three substrings
    const x = currentWitness.slice(0, xLength);

    const y = currentWitness.slice(
        xLength,
        xLength + yLength
    );

    const z = currentWitness.slice(
        xLength + yLength
    );

    // Apply pumping lemma: xy^i z
    const repeatedY = y.repeat(i);

    const pumpedString = x + repeatedY + z;

    // Display the pumping exponent
    pumpLabel.textContent = "i = " + i;

    // Clear previous visualization
    pumpedDisplay.replaceChildren();

    // Create colored string segments
    if (pumpedString.length === 0) {
        pumpedDisplay.textContent = "ε";
    } else {

        const xSpan = document.createElement("span");
        xSpan.className = "pumped-x";
        xSpan.textContent = x;

        const ySpan = document.createElement("span");
        ySpan.className = "pumped-y";
        ySpan.textContent = repeatedY;

        const zSpan = document.createElement("span");
        zSpan.className = "pumped-z";
        zSpan.textContent = z;

        pumpedDisplay.append(xSpan, ySpan, zSpan);
    }

    // Verify membership
    const belongs = checkMembership(
        pumpedString,
        currentLanguage
    );

    if (belongs) {

        membershipDisplay.textContent =
            "✓ String belongs to the language";

        membershipDisplay.className = "membership-valid";

    } else {

        membershipDisplay.textContent =
            "✗ String does NOT belong to the language";

        membershipDisplay.className = "membership-invalid";
    }
    // Refresh the proof explanation
           updateProof();
}

// Update simulation when slider moves
pumpSlider.addEventListener("input", updatePumping);

/* =====================================
   STEP 8: MATHEMATICAL PROOF ENGINE
===================================== */

const proofDisplay = document.getElementById("proofSteps");
const proofNavigation = document.getElementById("proofNavigation");

const prevProofBtn = document.getElementById("prevProof");
const nextProofBtn = document.getElementById("nextProof");

const proofCounter = document.getElementById("proofCounter");

let currentProofStep = 0;

// Language information
const languageInfo = {
    anbn: {
        notation: "L = {aⁿbⁿ | n ≥ 0}",
        first: "a",
        other: "b",
        witness: "aᵖbᵖ",
        counts: "equal numbers of a's and b's"
    },

    "0n1n": {
        notation: "L = {0ⁿ1ⁿ | n ≥ 0}",
        first: "0",
        other: "1",
        witness: "0ᵖ1ᵖ",
        counts: "equal numbers of 0's and 1's"
    },

    anbncn: {
        notation: "L = {aⁿbⁿcⁿ | n ≥ 0}",
        first: "a",
        other: "b and c",
        witness: "aᵖbᵖcᵖ",
        counts: "equal numbers of a's, b's and c's"
    }
};

// Create the proof for the current language
function createProofSteps() {

    const info = languageInfo[currentLanguage];

    if (!info || !currentWitness) {
        return [];
    }

    const p = currentP;

    const xLength = Number(xSlider.value);
    const yLength = Number(ySlider.value);

    const x = currentWitness.slice(0, xLength);

    const y = currentWitness.slice(
        xLength,
        xLength + yLength
    );

    const z = currentWitness.slice(
        xLength + yLength
    );

    const pumpedDown = x + z;

    return [

        {
            title: "Step 1: Assume Regularity",
            description:
                "Assume that " + info.notation +
                " is a regular language. " +
                "According to the Pumping Lemma, " +
                "there must exist a pumping length p ≥ 1."
        },

        {
            title: "Step 2: Choose a Witness String",
            description:
                "For an arbitrary pumping length p, " +
                "choose w = " + info.witness + ". " +
                "For the current demonstration, p = " + p +
                " and w = " + currentWitness + ". " +
                "The string belongs to L and satisfies |w| ≥ p."
        },

        {
            title: "Step 3: Analyze Every Valid Decomposition",
            description:
                "Consider any decomposition w = xyz " +
                "satisfying |xy| ≤ p and |y| > 0. " +
                "The first p characters of w are all " +
                info.first + "'s. Therefore, y must contain " +
                "only " + info.first + "'s. " +
                "Let y = " + info.first + "^k, " +
                "where 1 ≤ k ≤ p. " +
                "The current example uses x = " +
                (x || "ε") + ", y = " + y +
                ", and z = " + (z || "ε") + "."
        },

        {
            title: "Step 4: Pump Down (i = 0)",
            description:
                "Choose i = 0, so xy⁰z = xz. " +
                "For the current decomposition, xz = " +
                (pumpedDown || "ε") + ". " +
                "In general, pumping down leaves p − k " +
                info.first + "'s instead of p, " +
                "while the remaining symbol counts stay at p. " +
                "Because k ≥ 1, the required " +
                info.counts + " condition is violated. " +
                "Therefore, xz does not belong to L."
        },

        {
            title: "Step 5: Final Conclusion",
            description:
                "Every valid decomposition has a nonempty " +
                info.first + "-only substring y. " +
                "For every such decomposition, choosing i = 0 " +
                "produces a string outside L. " +
                "This contradicts the Pumping Lemma. " +
                "Therefore, " + info.notation +
                " is NOT REGULAR."
        }

    ];
}

// Display the selected proof step
function updateProof() {

    const steps = createProofSteps();

    if (steps.length === 0) return;

    proofNavigation.hidden = false;

    const step = steps[currentProofStep];

    // Clear the previous content
    proofDisplay.replaceChildren();

    // Create the heading
    const heading = document.createElement("h3");
    heading.textContent = step.title;

    // Create the explanation
    const explanation = document.createElement("p");
    explanation.textContent = step.description;

    proofDisplay.append(heading, explanation);

    // Update the step counter
    proofCounter.textContent =
        "Step " + (currentProofStep + 1) +
        " of " + steps.length;

    // Disable buttons at boundaries
    prevProofBtn.disabled = currentProofStep === 0;

    nextProofBtn.disabled =
        currentProofStep === steps.length - 1;
}

// Previous step
prevProofBtn.addEventListener("click", function () {

    if (currentProofStep > 0) {
        currentProofStep--;
        updateProof();
    }

});

// Next step
nextProofBtn.addEventListener("click", function () {

    const steps = createProofSteps();

    if (currentProofStep < steps.length - 1) {
        currentProofStep++;
        updateProof();
    }

});

/* =====================================
   STEP 9B: TEACHER DEMO MODE
===================================== */

const startDemoBtn = document.getElementById("startDemoBtn");
const demoPanel = document.getElementById("demoPanel");

const demoTitle = document.getElementById("demoTitle");
const demoDescription = document.getElementById("demoDescription");

const demoProgress = document.getElementById("demoProgress");
const demoProgressBar = document.getElementById("demoProgressBar");

const demoPrevious = document.getElementById("demoPrevious");
const demoNext = document.getElementById("demoNext");
const demoExit = document.getElementById("demoExit");

let demoStage = 0;
let demoActive = false;

// Five stages of the guided demonstration
const demoStages = [

    {
        title: "1. Generate a Witness String",
        description:
            "We assume the selected language is regular. " +
            "The Pumping Lemma guarantees some pumping length p. " +
            "For this demonstration, we choose p = " +
            "the value entered above and generate a " +
            "witness string belonging to the language."
    },

    {
        title: "2. Decompose the String",
        description:
            "We divide w into x, y and z. " +
            "The decomposition must satisfy " +
            "|xy| ≤ p and |y| > 0. " +
            "The highlighted yellow substring is y. " +
            "The proof must work for every valid decomposition."
    },

    {
        title: "3. Pump Down the String",
        description:
            "We choose the pumping exponent i = 0. " +
            "This removes the substring y completely. " +
            "The number of first-block symbols decreases, " +
            "while the remaining blocks stay unchanged. " +
            "The resulting string is outside the language."
    },

    {
        title: "4. Mathematical Contradiction",
        description:
            "Every valid decomposition has a nonempty " +
            "substring y entirely within the first block. " +
            "Pumping down always breaks the equal-count " +
            "requirement. This contradicts the Pumping Lemma."
    },

    {
        title: "5. Final Conclusion",
        description:
            "Since every valid decomposition fails for i = 0, " +
            "the assumption that the language is regular " +
            "must be false. Therefore, the selected " +
            "language is NON-REGULAR."
    }
];

// Highlight the relevant dashboard section
function highlightDemoSection(selector) {

    document.querySelectorAll(".demo-highlight")
        .forEach(element => {
            element.classList.remove("demo-highlight");
        });

    const target = document.querySelector(selector);

    if (target) {
        target.classList.add("demo-highlight");
    }
}

// Update the guided demo
function updateDemo() {

    if (!demoActive) return;

    const stage = demoStages[demoStage];

    demoTitle.textContent = stage.title;
    demoDescription.textContent = stage.description;

    demoProgress.textContent =
        "Stage " + (demoStage + 1) +
        " of " + demoStages.length;

    demoProgressBar.style.width =
        ((demoStage + 1) / demoStages.length * 100) + "%";

    demoPrevious.disabled = demoStage === 0;
    demoNext.disabled =
        demoStage === demoStages.length - 1;

    // Stage-specific actions
    if (demoStage === 0) {

        highlightDemoSection(".visualization-panel");

    } else if (demoStage === 1) {

        // Choose a simple valid decomposition
        xSlider.value = Math.min(1, currentP - 1);
        ySlider.value = 1;

        updateDecomposition();

        highlightDemoSection(".visualization-panel");

    } else if (demoStage === 2) {

        // Pump down using i = 0
        pumpSlider.value = 0;
        updatePumping();

        highlightDemoSection(".simulation-panel");

    } else if (demoStage === 3) {

        // Show universal decomposition reasoning
        currentProofStep = 3;
        updateProof();

        highlightDemoSection(".proof-panel");

    } else if (demoStage === 4) {

        // Show the final conclusion
        currentProofStep = 4;
        updateProof();

        highlightDemoSection(".proof-panel");
    }
}

// Start guided demonstration
startDemoBtn.addEventListener("click", function () {

    const p = Number(pumpingInput.value);

    if (
        pumpingInput.value.trim() === "" ||
        !Number.isInteger(p) ||
        p < 1 ||
        p > 30
    ) {
        alert("Enter a pumping length from 1 to 30 first.");
        return;
    }

    // Reuse our existing string-generation algorithm
    generateString();

    demoStage = 0;
    demoActive = true;

    demoPanel.hidden = false;

    updateDemo();
});

// Move forward
demoNext.addEventListener("click", function () {

    if (demoStage < demoStages.length - 1) {
        demoStage++;
        updateDemo();
    }
});

// Move backward
demoPrevious.addEventListener("click", function () {

    if (demoStage > 0) {
        demoStage--;
        updateDemo();
    }
});

// Exit guided demonstration
demoExit.addEventListener("click", function () {

    demoActive = false;
    demoPanel.hidden = true;

    document.querySelectorAll(".demo-highlight")
        .forEach(element => {
            element.classList.remove("demo-highlight");
        });
});

/* =====================================
   STEP 9C: COPY MATHEMATICAL PROOF
===================================== */

const copyProofBtn = document.getElementById("copyProofBtn");
const copyStatus = document.getElementById("copyStatus");

copyProofBtn.addEventListener("click", async function () {

    // Retrieve the current mathematical proof
    const steps = createProofSteps();

    if (steps.length === 0) {
        copyStatus.textContent =
            "Please generate a witness string first.";
        return;
    }

    // Prepare the complete proof
    let proofText = "PUMPING LEMMA - MATHEMATICAL PROOF\n";
    proofText += "================================\n\n";

    steps.forEach(function (step) {

        proofText += step.title + "\n";
        proofText += step.description + "\n\n";

    });

    // Copy to clipboard
    try {

        await navigator.clipboard.writeText(proofText);

         copyStatus.textContent =
    "✓ Mathematical proof copied successfully!";

// Automatically hide the message after 3 seconds
setTimeout(() => {
    copyStatus.textContent = "";
}, 3000);

    } catch (error) {

        copyStatus.textContent =
            "Unable to copy. Check clipboard permissions.";

        console.error("Clipboard error:", error);
    }
});

/* =====================================
   AUTO-UPDATE WHEN LANGUAGE CHANGES
===================================== */

languageSelect.addEventListener("change", function () {

    // Exit Demo Mode if it is currently active
    if (demoActive) {
        demoActive = false;
        demoPanel.hidden = true;

        document.querySelectorAll(".demo-highlight")
            .forEach(element => {
                element.classList.remove("demo-highlight");
            });
    }

    // Generate a new witness if one already exists
    if (currentWitness) {
        generateString();
    }

});
