/**
 * Migration orchestrator. Runs all steps in order by default, or a subset:
 *
 *   npx tsx storyblok/migrate/run.ts                 # everything
 *   npx tsx storyblok/migrate/run.ts --lang          # add EN language only
 *   npx tsx storyblok/migrate/run.ts --components    # push schema only
 *   npx tsx storyblok/migrate/run.ts --assets        # upload photos only
 *   npx tsx storyblok/migrate/run.ts --content       # push stories only
 *
 * Steps are independent and idempotent; re-running is safe.
 */
import "./load-env";
import { ensureLanguage } from "./mapi";
import { pushComponents } from "./push-components";
import { uploadAssets } from "./assets";
import { pushContent } from "./content";

async function main() {
  const flags = new Set(process.argv.slice(2));
  const all = flags.size === 0;

  if (all || flags.has("--lang")) {
    console.log("\n== Languages ==");
    await ensureLanguage("en", "English");
  }
  if (all || flags.has("--components")) {
    console.log("\n== Components ==");
    await pushComponents();
  }
  if (all || flags.has("--assets")) {
    console.log("\n== Assets ==");
    await uploadAssets();
  }
  if (all || flags.has("--content")) {
    console.log("\n== Content ==");
    await pushContent();
  }
  console.log("\n✓ Migration finished.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
