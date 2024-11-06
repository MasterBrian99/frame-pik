import mantine from 'eslint-config-mantine';
import tseslint, { plugin } from 'typescript-eslint';

export default tseslint.config(...mantine, {
  ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', './.storybook/main.ts'],
  plugins: ['plugin:@tanstack/eslint-plugin-query/recommended'],
});
