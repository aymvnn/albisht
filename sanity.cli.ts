import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y1819joy",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  // Enable hosting the Studio on <name>.sanity.studio via `npx sanity deploy`.
  studioHost: "albisht",
  deployment: {
    appId: "mpjchwqmo308pmcoo7ov3rvc",
  },
});
