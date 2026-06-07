/**
 * Push the content model in storyblok/components.json into the space.
 * Idempotent — updates components that already exist, creates the rest.
 */
import fs from "node:fs";
import path from "node:path";
import { upsertComponent } from "./mapi";

export async function pushComponents() {
  const file = path.resolve(process.cwd(), "storyblok", "components.json");
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as {
    components: {
      name: string;
      display_name?: string;
      schema: Record<string, unknown>;
      is_root?: boolean;
      is_nestable?: boolean;
    }[];
  };

  console.log(`Pushing ${parsed.components.length} components…`);
  for (const def of parsed.components) {
    await upsertComponent({
      name: def.name,
      display_name: def.display_name,
      schema: def.schema,
      is_root: def.is_root ?? false,
      is_nestable: def.is_nestable ?? false,
    });
  }
  console.log("Components done.");
}
