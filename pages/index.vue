<template>
	<div class="flex-container">
		<!-- Descrizione dello strumento -->
		<div class="flex w-full overflow-y-auto p-4 pb-0">
			<h4 class="text-colored text-justify">
				Questo tool ti permette di generare automaticamente un file VHDL di testbench basato sulle specifiche
				del Progetto di Reti Logiche del Politecnico di Milano.
				Compila i parametri di test e ottieni un testbench personalizzato!
				<br>
				Se vuoi più informazioni sul progetto, visita questo <a href="https://www.reti-logiche.it/progetto">link</a>.
			</h4>
		</div>

		<!-- Form per l'inserimento dei parametri -->
		<div class="flex w-full h-full overflow-y-auto p-2 pt-0 mt-0">
			<Form :validation-schema="schema" @submit.prevent="onSubmit" class="p-2">
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="clock-period" class="text-colored font-bold">Periodo di Clock:</label>
						<Field :rules="schema.fields.CLOCK_PERIOD" v-model="form.CLOCK_PERIOD" name="CLOCK_PERIOD">
							<InputNumber id="clock-period" suffix=" ns" class="outlined w-full" v-model="form.CLOCK_PERIOD"
								required :useGrouping="false" />
							<ErrorMessage name="CLOCK_PERIOD" />
						</Field>
					</div>
					<div class="field col-12 md:col-3">
						<label for="sequence-length" class="text-colored font-bold">Lunghezza della Sequenza:</label>
						<Field :rules="schema.fields.SCENARIO_LENGTH" v-model="form.SCENARIO_LENGTH"
							name="SCENARIO_LENGTH">
							<InputNumber id="sequence-length" class="outlined w-full" v-model="form.SCENARIO_LENGTH"
								required :useGrouping="false" />
							<ErrorMessage name="SCENARIO_LENGTH" />
						</Field>
					</div>
					<div class="field col-12 md:col-3">
						<label for="memory-address" class="text-colored font-bold">Indirizzo di Memoria:</label>
						<Field :rules="schema.fields.SCENARIO_ADDRESS" v-model="form.SCENARIO_ADDRESS"
							name="SCENARIO_ADDRESS">
							<InputNumber id="memory-address" class="outlined w-full" v-model="form.SCENARIO_ADDRESS"
								required :useGrouping="false" />
							<ErrorMessage name="SCENARIO_ADDRESS" />
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
								<ErrorMessage name="SCENARIO_INPUT" />
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
    .integer('Deve essere un numero intero')
	.test('is-valid-address', function (value) {
      return validateScenarioAddress(value, this);
    }),
  SCENARIO_ADDRESS: yup.number()
    .required('L\'indirizzo di memoria è obbligatorio')
    .positive('Deve essere un numero positivo')
    .integer('Deve essere un numero intero'),
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
      message: `L'indirizzo di memoria è troppo alto. Deve essere inferiore a ${maxAddress + 1}.`,
    });
  }
  return true;
};

function setScenario(value) {
	form.value.SCENARIO_S = value;
}

// Applicare filtro differenziale di ordine 5 o 3
function generateOutput(){
	const input = form.value.SCENARIO_INPUT.split(',').map(num => parseInt(num));
	const output = [];

	form.value.SCENARIO_OUTPUT = output.join(", ");
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
	if (await schema.validate(form.value)) {
		generateTestbench(form.value);
	}
});

</script>


<style scoped>
.text-colored {
	color: #9925fe;
}

.status-button-group {
	display: flex;
	gap: 0.5rem;
}

.p-button-secondary {
	background-color: #a1a1a1 !important;
	/* Grigio chiaro */
	color: #3a3a3a !important;
	/* Testo grigio scuro */
}

.outlined {
	border: 1px solid #9925fe;
}

.p-button-primary {
	background-color: #9925fe !important;
	/* Viola */
	color: #ffffff !important;
	/* Testo bianco */
}
</style>