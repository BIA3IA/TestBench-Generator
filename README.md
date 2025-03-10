# Testbench Generator - Progetto di reti Logiche 2025

A web application built with **Vue 3**, **Nuxt**, **PrimeVue**, and **VeeValidate** that automatically generates a **VHDL testbench** based on the specifications of the **Progetto di reti Logiche** at Politecnico di Milano.
[Here](https://github.com/BIA3IA/TestBench-Generator/tree/master/docs) you can find the project's rules and specifications.

## Key Features
- Automatic generation of **VHDL testbench** based on user-defined parameters.
- Input data validation using **VeeValidate + Yup** to ensure correctness and consistency.
- Application of **3rd or 5th order differential filters** to input data with normalization and saturation.
- **Downloadable testbench** in `.vhd` format.
- **Modern and user-friendly UI** with **PrimeVue** integration.  

---

## Technologies Used
- **Frontend**: [Vue 3](https://vuejs.org/), [Nuxt 3](https://nuxt.com/), [PrimeVue](https://primevue.org/)  
- **Validation**: [VeeValidate](https://vee-validate.logaretm.com/) + [Yup](https://github.com/jquense/yup)  
- **UI Styling**: PrimeVue Components & CSS  
- **Testbench Generation**: Custom JavaScript logic  

---

## How to Use
1. **Fill in the required parameters** in the form:
   - Clock period
   - Sequence length
   - Memory address
   - Select differential filter order (3rd or 5th)
   - Enter a numerical sequence manually or generate a random one
2. **Click "Generate Testbench"** to process the data and create the output.
3. **Download the VHDL file** containing the ready-to-use testbench.

---

## Installation and Development
To run the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/testbench-generator.git

# Enter the project directory
cd testbench-generator

# Install dependencies
bun install  # If using Bun
# or
npm install  # If using npm

# Start the development server
bun run dev
# or
npm run dev
