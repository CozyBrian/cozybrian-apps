import type { Config } from "tailwindcss"
import sharedConfig from "@cozy/styling/tailwind.config.ts"

const config: Pick<Config, "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
}

export default config