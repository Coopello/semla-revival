/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "src/app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
};
