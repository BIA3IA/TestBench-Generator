<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>

const appConfig = useAppConfig();
useHead({
	title: appConfig.brand,
	titleTemplate: `%s - ${appConfig.title}`
});

</script>