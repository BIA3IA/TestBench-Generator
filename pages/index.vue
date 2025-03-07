<template>
	<div class="flex-container">
		<div class="flex w-full overflow-y-auto p-4">
			<h4 class="text-colored">
				Questo tool ti permette di generare automaticamente un file VHDL di testbench basato sulle specifiche del Progetto di Reti Logiche del Politecnico di Milano.
				Compila i parametri di test e ottieni un testbench personalizzato. Se vuoi piú informazioni sul progetto, visita questo <a href="https://www.reti-logiche.it/progetto">link</a>.
			</h4>
		</div>

			<div class="flex px-2 w-full overflow-y-auto pt-0 mt-0">
					<div class="grid p-3 pt-0 m-0">
						<div class="col-12">
							<form @submit.prevent="submitForm" class="pt-2">
								<div class="p-fluid formgrid grid">
									<div class="field col-12 md:col-3">
										<label>Periodo di Clock:</label>
										<InputNumber v-model="form.CLOCK_PERIOD" required />
									</div>
									<div class="field col-12 md:col-3">
										<label>Lunghezza della Sequenza:</label>
										<InputNumber v-model="form.SCENARIO_LENGTH" required />
									</div>
									<div class="field col-12 md:col-3">
										<label>Indirizzo di memoria:</label>
										<InputNumber v-model="form.SCENARIO_ADDRESS" required />
									</div>
									<div class="field col-12 md:col-3">
										<label>Filtro:</label>
										<div class="status-button-group">
											<Button label="Ordine 3"
												:class="{ 'p-button-primary': form.SCENARIO_S === 0, 'p-button-secondary': form.SCENARIO_S !== 0 }"
												@click="setScenario(0)" />
											<Button label="Ordine 5"
												:class="{ 'p-button-primary': form.SCENARIO_S === 1, 'p-button-secondary': form.SCENARIO_S !== 1 }"
												@click="setScenario(1)" />
										</div>
									</div>
									<div class="field col-12 p-fluid formgrid grid">
										<div class="field col-12">
											<label>Genera Valori Casuali o Inserisci la tua sequenza numerica</label>
										</div>
										<div class="field col-12 md:col-4">
											<div class="status-button-group">
												<Button severity="primary" label="Genera Valori Casuali"/>
											</div>
										</div>
										<div class="field col-12 md:col-8">
											<InputText class="outlined" v-model="form.SCENARIO_INPUT" required 
												placeholder="Inserisci i valori separati da virgola" />
										</div>
									</div>
									
									<div class="field col-12">
										<Button type="submit" label="Genera Testbench"/>
									</div>
								</div>
							</form>
						</div>
					</div>
			</div>

		<!-- Area di output del codice generato -->
		<div v-if="tbCode">
			<h2>Codice VHDL Generato</h2>
			<textarea rows="15" cols="80" v-model="tbCode" readonly></textarea>
			<button @click="downloadTB">Scarica Testbench</button>
		</div>

</div>
</template>

<script setup>
import { ref } from 'vue';

// Stato del form
const form = ref({
	CLOCK_PERIOD: 20,
	SCENARIO_LENGTH: 24,
	SCENARIO_S: 0,
	SCENARIO_INPUT: "32, -24, -35, 0, 46, -54, -39, -22, -53, -47, 12, 11, 11, 45, -30, -14, -35, -25, -19, -35, -41, -61, -24, -62",
	SCENARIO_OUTPUT: "11, 43, -13, -54, 33, 53, -28, 8, 18, -38, -31, 7, -24, 23, 33, -1, 7, -11, 5, 10, 15, -12, 3, -10",
	SCENARIO_ADDRESS: 1234,
	add: "0000000000000000",
	CASUALI: 0
});

function setScenario(value) {
	form.value.SCENARIO_S = value;
}

function setCasuali(value) {
	form.value.CASUALI = value;
}

// Stato per il codice generato
const tbCode = ref("");

// Funzione per generare il testbench
const generateTestbench = () => {
	// 
};

// Funzione per scaricare il file generato
const downloadTB = () => {

};

</script>


<style scoped>
.card {
	padding: 50px;
	border-radius: 50px;
	background-color: #1e1e1e;
	margin-bottom: 20px;
	margin-top: 20px;
	margin-left: 20px;
	margin-right: 20px;
	border: 2px solid #ab47bc;
	box-shadow: #ab47bc 0px 0px 10px 0px;
}
.text-colored{
	color: #ab47bc;
}
.status-button-group {
    display: flex;
    gap: 0.5rem;
}
.p-button-secondary {
    background-color: #a1a1a1 !important; /* Grigio chiaro */
    color: #3a3a3a !important; /* Testo grigio scuro */
}
.outlined {
	border: 1px solid #ab47bc;
	box-shadow: #ab47bc 0px 0px 5px 0px;
	color: #ab47bc;
	
}
</style>