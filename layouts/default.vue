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