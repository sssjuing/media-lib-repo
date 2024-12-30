/* eslint-disable quotes */
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./apps/console/vite.config.ts",
  "./apps/h5/vite.config.ts",
  "./packages/antd-layout/vite.config.ts",
  "./packages/service/vite.config.ts",
  "./packages/ui/vite.config.ts",
]);
