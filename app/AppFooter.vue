<template> 
    <div class="mt-4 layout-footer">
        <div class="flex justify-content-center align-items-center flex-wrap">
            <div class="field mr-4">
        <span class="font-small">
            {{ appConfig.title }} - {{ appConfig.version }}
        </span>
        </div>
    </div>
    </div>
</template>

<script setup>

const appConfig = useAppConfig();

</script>


<style lang="scss" scoped></style>
