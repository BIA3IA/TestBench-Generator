<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Analytics />
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt'

const appConfig = useAppConfig();
useHead({
	titleTemplate: `${appConfig.title}`
});

</script>