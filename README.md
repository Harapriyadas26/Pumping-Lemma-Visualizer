# Pumping Lemma Visualizer

### Interactive Verification of Non-Regular Languages Using the Pumping Lemma

An interactive, web-based educational application developed to demonstrate the **Pumping Lemma for Regular Languages** and explain how it can be used to prove that certain formal languages are non-regular.

The application provides animated string visualization, interactive decomposition, pumping simulations, mathematical proof explanations, and a guided demonstration mode.

## Features

- **Language Selection:** Explore three predefined non-regular languages.
- **Witness String Generation:** Generate suitable witness strings based on the pumping length.
- **Interactive String Decomposition:** Divide strings into x, y, and z using adjustable sliders.
- **Constraint Validation:** Check the conditions |xy| ≤ p and |y| > 0.
- **Pumping Simulation:** Experiment with different values of i in xyⁱz.
- **Language Membership Checking:** Verify whether the pumped string belongs to the selected language.
- **Animated Visualization:** Display the string using color-coded character boxes.
- **Step-by-Step Proof Engine:** Understand the mathematical reasoning behind non-regularity.
- **Guided Demo Mode:** Present the complete proof through an interactive walkthrough.
- **Copy Mathematical Proof:** Copy the complete proof for further reference.

## Supported Languages

| Language | Description |
|---|---|
| L = {aⁿbⁿ \| n ≥ 0} | Equal numbers of a's followed by b's |
| L = {0ⁿ1ⁿ \| n ≥ 0} | Equal numbers of 0's followed by 1's |
| L = {aⁿbⁿcⁿ \| n ≥ 0} | Equal numbers of a's, b's and c's |

## Mathematical Concept

The Pumping Lemma states that if a language L is regular, there exists a pumping length p ≥ 1 such that every sufficiently long string w in L can be decomposed as:

**w = xyz**

Subject to:

1. |xy| ≤ p
2. |y| > 0
3. xyⁱz ∈ L for every integer i ≥ 0

To prove non-regularity, the application demonstrates that for each supported language, every valid decomposition of the selected witness string leads to a contradiction when i = 0.

The application provides mathematically justified proofs for its predefined languages. It is not a general-purpose algorithm for determining whether an arbitrary language is regular.

## Example Demonstration

Consider:

**L = {aⁿbⁿ | n ≥ 0}**

For pumping length p = 4, choose the witness string:

**w = aaaabbbb**

A valid decomposition is:

- x = aa
- y = a
- z = abbbb

Choose i = 0:

**xy⁰z = xz = aaabbbb**

The resulting string contains three a's and four b's.

Therefore, the pumped string does not belong to L.

Because every valid decomposition has a nonempty substring y consisting only of a's, pumping down always produces a contradiction.

**Conclusion: L is non-regular.**

## Technology Stack

- **HTML5:** Webpage structure and controls
- **CSS3:** Styling, responsive design, and animations
- **JavaScript:** Pumping Lemma logic, language membership checking, and interactive visualization
- **Visual Studio Code:** Development environment
- **Git and GitHub:** Version control and project hosting

## Project Structure

- `index.html` — Main application interface
- `style.css` — Dashboard design and animations
- `script.js` — Core algorithms, interactions, and proof logic
- `README.md` — Project documentation

## How to Run

1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a web browser or use the Live Server extension.
4. Select a language and pumping length.
5. Click **Generate Witness String**.
6. Explore the decomposition, pumping simulation, and mathematical proof.
7. Use **Start Guided Demo** for a complete walkthrough.

No backend server or database is required.

## Educational Objectives

- Understand the Pumping Lemma for regular languages.
- Visualize string decomposition into x, y, and z.
- Explore the effect of pumping exponents.
- Understand proof by contradiction.
- Demonstrate why selected languages cannot be recognized by finite automata.

## Future Enhancements

- Additional predefined non-regular languages
- More interactive animations and proof visualizations
- Automatic comparison of valid decompositions
- Additional formal language learning modules

## Conclusion

The Pumping Lemma Visualizer provides an interactive learning environment for understanding the theoretical foundations of non-regular languages through practical simulations and mathematical explanations.

**Project Domain:** Theory of Computation  
**Project Type:** Interactive Educational Web Application