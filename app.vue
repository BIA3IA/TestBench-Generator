<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>

const appConfig = useAppConfig();
useHead({
	titleTemplate: `${appConfig.title}`
});

</script>