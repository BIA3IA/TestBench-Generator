<template>
    <div>
        <div class="layout-wrapper" :class="containerClass">
            <div class="card p-4">
            <app-topbar />
            <div class="layout-main-container">
                <div class="layout-main">
                    <slot />
                </div>

            <app-footer />
            </div>
            <div class="layout-mask" />
        </div>
        </div>
    </div>
</template>

<script setup>

const { layoutConfig, layoutState } = useLayout();

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': layoutConfig.inputStyle.value === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple.value
    }
});

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
</style>