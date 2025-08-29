import { dirname } from "path"
import { fileURLToPath } from "url"

import { includeIgnoreFile } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import tanstackEslintPluginQuery from "@tanstack/eslint-plugin-query"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tanstackEslintPluginQuery.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  includeIgnoreFile(gitignorePath),
]

export default eslintConfig
