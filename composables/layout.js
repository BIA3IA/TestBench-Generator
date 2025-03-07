export function useLayout() {
  const layoutConfig = reactive({
    ripple: true,
    darkTheme: true,
    inputStyle: "outlined",
    menuMode: "static",
    theme: "mdc-dark-deeppurple",
    scale: 14,
    activeMenuItem: null,
  });

  const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  });

  return { layoutConfig, layoutState };
}
