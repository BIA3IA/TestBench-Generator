<template>
    <div class="flex flex-column p-4 align-items-center justify-content-center">
        <Form class="w-full" style="max-width: 1200px;" :validation-schema="schema" @submit="onSubmit">
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4 flex flex-column justify-content-end">
                    <label for="clock-period" class="text-colored font-bold">Periodo di Clock:</label>
                    <ErrorMessage class="error-message" name="CLOCK_PERIOD" />
                    <Field :rules="schema.fields.CLOCK_PERIOD" v-model="form.CLOCK_PERIOD" name="CLOCK_PERIOD">
                        <InputNumber id="clock-period" suffix=" ns" class="outlined" v-model="form.CLOCK_PERIOD"
                            :useGrouping="false" placeholder="Inserisci il periodo di clock" />
                    </Field>
                </div>
                <div class="field col-12 md:col-4 flex flex-column justify-content-end">
                    <label for="scenario-length" class="text-colored font-bold">Lunghezza della Sequenza:</label>
                    <ErrorMessage class="error-message" name="SCENARIO_LENGTH" />
                    <Field :rules="schema.fields.SCENARIO_LENGTH" v-model="form.SCENARIO_LENGTH" name="SCENARIO_LENGTH">
                        <InputNumber id="scenario-length" class="outlined" v-model="form.SCENARIO_LENGTH"
                            :useGrouping="false" placeholder="Inserisci la lunghezza" />
                    </Field>
                </div>
                <div class="field col-12 md:col-4 flex flex-column justify-content-end">
                    <label for="memory-address" class="text-colored font-bold">Indirizzo di Memoria:</label>
                    <ErrorMessage class="error-message" name="SCENARIO_ADDRESS" />
                    <Field :rules="schema.fields.SCENARIO_ADDRESS" v-model="form.SCENARIO_ADDRESS"
                        name="SCENARIO_ADDRESS">
                        <InputNumber id="memory-address" class="outlined" v-model="form.SCENARIO_ADDRESS"
                            :useGrouping="false" placeholder="Inserisci l'indirizzo di memoria" />
                    </Field>
                </div>
                <div class="field col-12 md:col-4 flex flex-column justify-content-end">
                    <label class="text-colored font-bold">Filtro:</label>
                    <div class="status-button-group">
                        <Button label="Ordine 3" type="button"
                            :class="{ 'button-primary': form.SCENARIO_S === 0, 'button-secondary': form.SCENARIO_S !== 0 }"
                            @click="setScenario(0)" />
                        <Button label="Ordine 5" type="button"
                            :class="{ 'button-primary': form.SCENARIO_S === 1, 'button-secondary': form.SCENARIO_S !== 1 }"
                            @click="setScenario(1)" />
                    </div>
                </div>
                <div class="field col-12 md:col-5 flex flex-column justify-content-end">
                    <label for="scenario-coeffs" class="text-colored font-bold">Genera Valori Casuali o Inserisci i
                        Tuoi Coefficenti:</label>
                    <ErrorMessage class="error-message" name="SCENARIO_COEFFS" />
                    <Field :rules="schema.fields.SCENARIO_COEFFS" v-model="form.SCENARIO_COEFFS" name="SCENARIO_COEFFS">
                        <InputText id="scenario-coeffs" class="outlined" v-model="form.SCENARIO_COEFFS"
                            placeholder="Inserisci i valori separati da virgola" />
                    </Field>
                </div>
                <div class="field col-12 md:col-3 flex flex-column justify-content-end">
                    <Button type="button" class="button-primary" label="Genera Coefficenti Casuali"
                        @click="generateRandomCoeffs" />
                </div>
                <div class="field col-12 md:col-9 flex flex-column justify-content-end">
                    <label for="scenario-input" class="text-colored font-bold">Genera Valori Casuali o Inserisci la
                        Tua Sequenza Numerica:</label>
                    <ErrorMessage class="error-message" name="SCENARIO_INPUT" />
                    <Field :rules="schema.fields.SCENARIO_INPUT" v-model="form.SCENARIO_INPUT" name="SCENARIO_INPUT">
                        <InputText id="scenario-input" class="outlined" v-model="form.SCENARIO_INPUT"
                            placeholder="Inserisci i valori separati da virgola" />
                    </Field>
                </div>
                <div class="field col-12 md:col-3 flex flex-column justify-content-end">
                    <Button type="button" class="button-primary" label="Genera Sequenza Casuale"
                        @click="generateRandomValues" />
                </div>
                <div class="field col-12 md:col-12">
                    <Button class="button-primary" type="submit" label="Scarica Testbench" />
                </div>
            </div>
        </Form>
        <Divider class="divider" style="max-width: 1200px;" />
        <Form class="w-full pt-3" style="max-width: 1200px;" :validation-schema="schema_casuale"
            @submit="generateCasuale">
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-6 flex flex-column justify-content-end">
                    <label for="max-input" class="text-colored font-bold">Lunghezza Massima Sequenza Casuale:</label>
                    <ErrorMessage class="error-message" name="MAX_SEQUENCE_LENGTH" />
                    <Field :rules="schema_casuale.fields.MAX_SEQUENCE_LENGTH" v-model="MAX_SEQUENCE_LENGTH"
                        name="MAX_SEQUENCE_LENGTH">
                        <InputNumber id="max-input" class="outlined" v-model="MAX_SEQUENCE_LENGTH" :useGrouping="false"
                            placeholder="Inserisci il valore massimo della lunghezza della sequenza" />
                    </Field>
                </div>
                <div class="field col-12 md:col-6 flex flex-column justify-content-end">
                    <Button class="button-primary" type="submit" label="Genera e Scarica Testbench Casuale" />
                </div>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { generateTestbench } from '~/utils/tbGenerator';
import * as yup from 'yup';
import { useForm, Form, Field, ErrorMessage } from 'vee-validate';

const { handleSubmit } = useForm();

const form = ref({
    CLOCK_PERIOD: 20,
    SCENARIO_LENGTH: 24,
    SCENARIO_S: 0,
    SCENARIO_INPUT: "32, -24, -35, 0, 46, -54, -39, -22, -53, -47, 12, 11, 11, 45, -30, -14, -35, -25, -19, -35, -41, -61, -24, -62",
    SCENARIO_OUTPUT: "11, 43, -13, -54, 33, 53, -28, 8, 18, -38, -31, 7, -24, 23, 33, -1, 7, -11, 5, 10, 15, -12, 3, -10",
    SCENARIO_ADDRESS: 1234,
    SCENARIO_COEFFS: "0, -1, 8, 0, -8, 1, 0, 1, -9, 45, 0, -45, 9, -1"
});

// Schema di validazione
const schema = yup.object().shape({
    CLOCK_PERIOD: yup.number()
        .required('É obbligatorio')
        .positive('Deve essere un numero positivo')
        .integer('Deve essere un numero intero'),
    SCENARIO_LENGTH: yup.number()
        .required('É obbligatoria')
        .positive('Deve essere un numero positivo')
        .integer('Deve essere un numero intero')
        .min(7, 'Deve essere almeno 7')
        .max(MAX_RAM_SIZE - 17, 'Deve essere al massimo ' + (MAX_RAM_SIZE - 17) ),
    SCENARIO_ADDRESS: yup.number()
        .required('É obbligatorio')
        .integer('Deve essere un numero intero')
        .test('is-valid-address', function (value) {
            return validateScenarioAddress(value, this);
        }),
    SCENARIO_INPUT: yup.string()
        .required('La sequenza numerica è obbligatoria')
        .test(
            'is-valid-sequence',
            function (value) {
                return validateScenarioInput(value, this);
            }
        ),
    SCENARIO_COEFFS: yup.string()
        .required('I coefficienti sono obbligatori')
        .test(
            'is-valid-sequence',
            function (value) {
                return validateScenarioCoeffs(value, this);
            }
        ),  
});

const schema_casuale = yup.object().shape({
    MAX_SEQUENCE_LENGTH: yup.number()
        .required('É obbligatoria se si vuole generare un testbench casuale')
        .integer('Deve essere un numero intero')
        .min(7, 'Deve essere almeno 7')
        .max(MAX_RAM_SIZE - 17, 'Deve essere al massimo ' + (MAX_RAM_SIZE - 17) ),
});

// Funzione di validazione per SCENARIO_INPUT
const validateScenarioInput = (value, context) => {
    const scenarioLength = context.parent.SCENARIO_LENGTH;

    if (!value) {
        return context.createError({ message: 'É obbligatoria' });
    }

    const numbers = value.split(',').map(num => num.trim());

    if (scenarioLength && numbers.length !== scenarioLength) {
        return context.createError({ message: `Deve contenere ${scenarioLength} numeri` });
    }

    for (let num of numbers) {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) {
            return context.createError({ message: `Contiene un valore non numerico: "${num}"` });
        }
        if (parsedNum < -128 || parsedNum > 127) {
            return context.createError({ message: `Il numero ${parsedNum} non è compreso tra -128 e 127` });
        }
    }

    return true;
};

// Funzione di validazione per SCENARIO_INPUT
const validateScenarioCoeffs = (value, context) => {

    if (!value) {
        return context.createError({ message: 'É obbligatoria' });
    }

    const numbers = value.split(',').map(num => num.trim());

    if (numbers.length !== 14) {
        return context.createError({ message: `Deve contenere 14 numeri` });
    }

    for (let num of numbers) {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) {
            return context.createError({ message: `Contiene un valore non numerico: "${num}"` });
        }
        if (parsedNum < -128 || parsedNum > 127) {
            return context.createError({ message: `Il numero ${parsedNum} non è compreso tra -128 e 127` });
        }
    }

    return true;
};

// Validazione per SCENARIO_ADDRESS
const MAX_RAM_SIZE = 65536;

const validateScenarioAddress = (address, context) => {
    const scenarioLength = context.parent.SCENARIO_LENGTH;
    const maxAddress = MAX_RAM_SIZE - 17 - scenarioLength;
    if (address > maxAddress) {
        return context.createError({
            message: `Deve essere inferiore a ${maxAddress}`,
        });
    }
    if (address < 0) {
        return context.createError({
            message: `Deve essere maggiore o uguale a 0`,
        });
    }
    return true;
};

function setScenario(value) {
    form.value.SCENARIO_S = value;
}

// Applicare filtro differenziale di ordine 5 o 3
function generateOutput() {
    const input = form.value.SCENARIO_INPUT.split(',').map(num => parseInt(num.trim()));
    const output = [];
    const isOrder3 = form.value.SCENARIO_S === 0;

    // Coefficienti e normalizzazione in base all'ordine scelto
    const coeffsFull = form.value.SCENARIO_COEFFS.split(',').map(num => parseInt(num.trim()));
    const coeffs = isOrder3 ? coeffsFull.slice(1, 6) : coeffsFull.slice(7, 14);

    const filterLength = coeffs.length;
    const halfFilter = Math.floor(filterLength / 2);

    // Normalizzazione con shift bitwise
    function normalize(value, order) {
        let result = 0;
        if (order === 3) {
            result += (value >> 4) + (value < 0 ? 1 : 0); // 1/16
            result += (value >> 6) + (value < 0 ? 1 : 0); // 1/64
            result += (value >> 8) + (value < 0 ? 1 : 0); // 1/256
            result += (value >> 10) + (value < 0 ? 1 : 0); // 1/1024
        } else {
            result += (value >> 6) + (value < 0 ? 1 : 0); // 1/64
            result += (value >> 10) + (value < 0 ? 1 : 0); // 1/1024
        }
        return result;
    }

    // Applicazione del filtro
    for (let i = 0; i < input.length; i++) {
        let acc = 0;
        for (let j = 0; j < filterLength; j++) {
            const index = i + j - halfFilter;
            const value = (index >= 0 && index < input.length) ? input[index] : 0; // Bordi con valore 0
            acc += value * coeffs[j];
        }

        // Normalizzazione e saturazione
        let normalized = normalize(acc, isOrder3 ? 3 : 5);
        let saturated = Math.max(-128, Math.min(127, normalized));

        output.push(saturated);
    }

    form.value.SCENARIO_OUTPUT = output.join(', ');
}

// Genera valori casuali compresi tra -128 e 127
function generateRandomValues() {
    const values = [];

    for (let i = 0; i < form.value.SCENARIO_LENGTH; i++)
        values.push(Math.floor(Math.random() * 256) - 128);

    form.value.SCENARIO_INPUT = values.join(", ");
}

// Genera valori casuali compresi tra -128 e 127
function generateRandomCoeffs() {
    const coeffs = [];

    for (let i = 0; i < 14; i++)
        coeffs.push(Math.floor(Math.random() * 256) - 128);

    form.value.SCENARIO_COEFFS = coeffs.join(", ");
}

// Genera il testbench
const onSubmit = handleSubmit(async () => {
    generateOutput();
    downloadVHDLFile(generateTestbench(form.value));
});

const MAX_SEQUENCE_LENGTH = ref(null);

// Genera un testbench casuale
const generateCasuale = () => {
    form.value.CLOCK_PERIOD = 20;
    form.value.SCENARIO_S = Math.random() < 0.5 ? 0 : 1;
    form.value.SCENARIO_LENGTH = Math.floor(Math.random() * (MAX_SEQUENCE_LENGTH.value - 7 + 1)) + 7;

    const maxAddress = MAX_RAM_SIZE - 17 - form.value.SCENARIO_LENGTH;
    form.value.SCENARIO_ADDRESS = Math.floor(Math.random() * (maxAddress + 1));
    generateRandomValues();
    generateRandomCoeffs();

    onSubmit();
};

// Scarica il file VHDL
function downloadVHDLFile(content, filename = "testbench.vhd") {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

</script>
