import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./apps/login/vite.config.ts",
  "./apps/console/vite.config.ts",
  "./apps/h5/vite.config.ts",
  "./packages/antd-layout/vite.config.ts",
  "./packages/service/vite.config.ts",
  "./packages/ui/vite.config.ts",
]);
