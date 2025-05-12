import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: { turbo: turboPlugin },
    rules: { 'turbo/no-undeclared-env-vars': 'warn' },
  },
  { plugins: { onlyWarn } },
  {
    ignores: [
      // 忽略目录
      'build/',
      'tests/',
      'demo/',
      'dist/',
      '.eslintrc.cjs',

      // node 覆盖率文件
      'coverage/',

      // 忽略文件
      '**/*-min.js',
      '**/*.min.js',
    ],
  },
];
