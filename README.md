# eink-games  

## Web Framework Compatibility

Tested web frameworks and their compatibility with Kindle browser. The Kindle browser is based on WebKit and has limited support for modern web standards. The following frameworks have been tested:

### NextJs

There is one particular version of NextJs works with Kindle browser: `14.2.28`, which use the swc compiler version `1.4.4`. Please check the package.json file for more details:

```json
// file https://github.com/vercel/next.js/blob/v14.2.28/package.json

"@swc/cli": "0.1.55",
"@swc/core": "1.4.4",
"@swc/helpers": "0.5.5",
```

The complier: Webpack + SWC.

If there is an "unepxected token" error, it is likely due to the fact that the Kindle browser does not support some modern JavaScript features. You can try to use the `transpilePackages` option in your NextJs config file to transpile specific packages that are causing issues.

Transpiler dependency in webpack + swc process of building modules for libraries like `"tailwind-merge"` and `radix-ui`:

```json
// get the list of radix-ui packages from npm
  transpilePackages: [
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/primitive",
    "@radix-ui/react-context",
    "@radix-ui/react-use-controllable-state",
    "@radix-ui/react-use-layout-effect",
    "@radix-ui/react-use-effect-event",
    "@radix-ui/react-slot",
    "@radix-ui/react-menu",
    "@radix-ui/react-collection",
    "@radix-ui/react-dismissable-layer",
    "@radix-ui/react-use-callback-ref",
    "@radix-ui/react-use-escape-keydown",
    "@radix-ui/react-focus-guards",
    "@radix-ui/react-focus-scope",
    "@radix-ui/react-id",
    ...
  ],
```

### Vite

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. The Kindle browser has limited support for modern JavaScript features, so not all versions of Vite will work.
And the version of Vite that works with Kindle browser is `4.4.1`. The following packages are used in this version:

```json
"@vitejs/plugin-react-swc": "^3.3.2"
"@swc/core": "^1.3.96"
```

A Vite version 5 does not seems to works with Kindle anymore.

Vite without swc does not work as well.

### Conclusion

Vite with SWC (used the similar version that works for NextJs) is the best option and simple to use, compared to NextJs.

## CSS hack

Don't use Flex gap, use margin instead.
