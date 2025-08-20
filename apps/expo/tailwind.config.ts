import type { Config } from 'tailwindcss';
import baseConfig from '@internal/tailwind-config/native';

// @ts-expect-error - no types
import nativewind from 'nativewind/preset';

export default {
  content: [...baseConfig.content],
  presets: [baseConfig, nativewind],
} satisfies Config;
