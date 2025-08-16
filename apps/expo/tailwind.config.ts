import type { Config } from 'tailwindcss';
// @ts-expect-error - no types
import nativewind from 'nativewind/preset';

import baseConfig from '@internal/tailwind-config/native';

export default {
  content: [...baseConfig.content],
  presets: [baseConfig, nativewind],
} satisfies Config;
