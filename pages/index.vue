<template>
	<div class="flex-container">
		<!-- Descrizione dello strumento -->
		<div class="flex w-full overflow-y-auto p-4 pb-0">
			<h4 class="text-colored text-justify">
				Questo tool ti permette di generare automaticamente un file VHDL di testbench basato sulle specifiche
				del Progetto di Reti Logiche del Politecnico di Milano.
				Compila i parametri di test e ottieni un testbench personalizzato!
				<br>
				Se vuoi più informazioni sul progetto, visita questo <a href="https://github.com/BIA3IA/TestBench-Generator">link</a>.
			</h4>
		</div>

		<!-- Form per l'inserimento dei parametri -->
		<div class="flex w-full h-full overflow-y-auto p-2 pt-0 mt-0">
			<Form :validation-schema="schema" @submit="onSubmit" class="p-2">
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="clock-period" class="text-colored font-bold">Periodo di Clock:</label>
						<Field :rules="schema.fields.CLOCK_PERIOD" v-model="form.CLOCK_PERIOD" name="CLOCK_PERIOD">
							<InputNumber id="clock-period" suffix=" ns" class="outlined w-full" v-model="form.CLOCK_PERIOD"
								required :useGrouping="false" />
							<ErrorMessage class="error-colored" name="CLOCK_PERIOD" />
						</Field>
					</div>
					<div class="field col-12 md:col-3">
						<label for="sequence-length" class="text-colored font-bold">Lunghezza della Sequenza:</label>
						<Field :rules="schema.fields.SCENARIO_LENGTH" v-model="form.SCENARIO_LENGTH"
							name="SCENARIO_LENGTH">
							<InputNumber id="sequence-length" class="outlined w-full" v-model="form.SCENARIO_LENGTH"
								required :useGrouping="false" />
							<ErrorMessage class="error-colored" name="SCENARIO_LENGTH" />
						</Field>
					</div>
					<div class="field col-12 md:col-3">
						<label for="memory-address" class="text-colored font-bold">Indirizzo di Memoria:</label>
						<Field :rules="schema.fields.SCENARIO_ADDRESS" v-model="form.SCENARIO_ADDRESS"
							name="SCENARIO_ADDRESS">
							<InputNumber id="memory-address" class="outlined w-full" v-model="form.SCENARIO_ADDRESS"
								required :useGrouping="false" />
							<ErrorMessage class="error-colored" name="SCENARIO_ADDRESS" />
						</Field>
					</div>
					<div class="field col-12 md:col-3">
						<label class="text-colored font-bold">Filtro:</label>
						<div class="status-button-group">
							<Button label="Ordine 3"
								:class="{ 'p-button-primary': form.SCENARIO_S === 0, 'p-button-secondary': form.SCENARIO_S !== 0 }"
								@click="setScenario(0)" />
							<Button label="Ordine 5"
								:class="{ 'p-button-primary': form.SCENARIO_S === 1, 'p-button-secondary': form.SCENARIO_S !== 1 }"
								@click="setScenario(1)" />
						</div>
					</div>
					<div class="field col-12">
						<label for="sequence-input" class="text-colored font-bold">Genera Valori Casuali o Inserisci la
							Tua Sequenza
							Numerica:</label>
						<div class="grid pt-2">
							<div class="col-12 md:col-8">
								<Field :rules="schema.fields.SCENARIO_INPUT" v-model="form.SCENARIO_INPUT"
									name="SCENARIO_INPUT">
								<InputText id="sequence-input" class="outlined w-full" v-model="form.SCENARIO_INPUT"
									required placeholder="Inserisci i valori separati da virgola" />
								<ErrorMessage class="error-colored" name="SCENARIO_INPUT" />
								</Field>
							</div>
							<div class="col-12 md:col-4">
								<Button class="p-button-primary w-full" label="Genera Valori Casuali"
									@click="generateRandomValues" />
							</div>
						</div>
					</div>
					<div class="field col-12">
						<Button class="p-button-primary w-full" type="submit" label="Genera Testbench"/>
					</div>
				</div>
			</Form>
		</div>
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
});

// Schema di validazione
const schema = yup.object().shape({
  CLOCK_PERIOD: yup.number()
    .required('Il periodo di clock è obbligatorio')
    .positive('Deve essere un numero positivo'),
  SCENARIO_LENGTH: yup.number()
    .required('La lunghezza della sequenza è obbligatoria')
    .positive('Deve essere un numero positivo')
    .integer('Deve essere un numero intero'),
  SCENARIO_ADDRESS: yup.number()
    .required('L\'indirizzo di memoria è obbligatorio')
    .positive('Deve essere un numero positivo')
    .integer('Deve essere un numero intero')
	.test('is-valid-address', function (value) {
      return validateScenarioAddress(value, this);
    }),
  SCENARIO_INPUT: yup.string()
    .required('La sequenza numerica è obbligatoria')
    .test(
      'is-valid-sequence',
      function(value) {
        return validateScenarioInput(value, this);
      }
    ),
});

// Funzione di validazione per SCENARIO_INPUT
const validateScenarioInput = (value, context) => {
  const scenarioLength = context.parent.SCENARIO_LENGTH;

  if (!value) {
    return context.createError({ message: 'La sequenza numerica è obbligatoria' });
  }

  const numbers = value.split(',').map(num => num.trim());

  if (numbers.length !== scenarioLength) {
    return context.createError({ message: `La sequenza deve contenere esattamente ${scenarioLength} numeri` });
  }

  for (let num of numbers) {
    const parsedNum = parseInt(num, 10);
    if (isNaN(parsedNum)) {
      return context.createError({ message: `La sequenza contiene un valore non numerico: "${num}"` });
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
      message: `L'indirizzo di memoria è troppo alto. Deve essere inferiore a ${maxAddress}.`,
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
    const coeffs = isOrder3 ? [0, -1, 8, 0, -8, 1, 0] : [1, -9, 45, 0, -45, 9, -1];
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

// Genera il testbench
const onSubmit = handleSubmit(async () => {
    try {
        // Validazione del form
        await schema.validate(form.value);

        // Genera il filtro e l'output
        generateOutput();

        // Genera il codice VHDL
        const vhdlContent = generateTestbench(form.value);

        // Scarica il file VHDL
        downloadVHDLFile(vhdlContent);

    } catch (err) {
        console.error("Errore nella generazione del testbench:", err);
    }
});

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


<style scoped>

</style>