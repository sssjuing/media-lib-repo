/* eslint-disable quotes */
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./packages/components/vite.config.ts",
  "./packages/route-layout/vite.config.ts",
  "./packages/service/vite.config.ts",
  "./apps/console/vite.config.ts",
]);
