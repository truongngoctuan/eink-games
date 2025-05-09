/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  transpilePackages: [
    "tailwind-merge",

    "@radix-ui/primitive",
    "@radix-ui/react-accessible-icon",
    "@radix-ui/react-accordion",
    "@radix-ui/react-alert-dialog",
    "@radix-ui/react-arrow",
    "@radix-ui/react-aspect-ratio",
    "@radix-ui/react-avatar",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-collapsible",
    "@radix-ui/react-collection",
    "@radix-ui/react-compose-refs",
    "@radix-ui/react-context",
    "@radix-ui/react-context-menu",
    "@radix-ui/react-dialog",
    "@radix-ui/react-direction",
    "@radix-ui/react-dismissable-layer",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-focus-guards",
    "@radix-ui/react-focus-scope",
    "@radix-ui/react-form",
    "@radix-ui/react-hover-card",
    "@radix-ui/react-label",
    "@radix-ui/react-menu",
    "@radix-ui/react-menubar",
    "@radix-ui/react-navigation-menu",
    "@radix-ui/react-one-time-password-field",
    "@radix-ui/react-popover",
    "@radix-ui/react-popper",
    "@radix-ui/react-portal",
    "@radix-ui/react-presence",
    "@radix-ui/react-primitive",
    "@radix-ui/react-progress",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-roving-focus",
    "@radix-ui/react-scroll-area",
    "@radix-ui/react-select",
    "@radix-ui/react-separator",
    "@radix-ui/react-slider",
    "@radix-ui/react-slot",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "@radix-ui/react-toast",
    "@radix-ui/react-toggle",
    "@radix-ui/react-toggle-group",
    "@radix-ui/react-toolbar",
    "@radix-ui/react-tooltip",
    "@radix-ui/react-use-callback-ref",
    "@radix-ui/react-use-controllable-state",
    "@radix-ui/react-use-effect-event",
    "@radix-ui/react-use-escape-keydown",
    "@radix-ui/react-use-is-hydrated",
    "@radix-ui/react-use-layout-effect",
    "@radix-ui/react-use-size",
    "@radix-ui/react-visually-hidden",

    "@radix-ui/react-id",
  ],
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? "/eink-games/" : "",
  basePath: isProd ? "/eink-games" : "",
  output: "export",
};

export default nextConfig;
