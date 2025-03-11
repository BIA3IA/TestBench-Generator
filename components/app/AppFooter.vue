<template> 
    <div class="flex justify-content-center align-items-center flex-wrap">    
        <span class="font-small text-colored font-bold">
            {{ appConfig.title }} - {{ appConfig.version }} | {{ appConfig.brand }}
        </span>
    </div>
</template>

<script setup>

const appConfig = useAppConfig();

</script>