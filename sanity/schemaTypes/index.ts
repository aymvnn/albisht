import type { SchemaTypeDefinition } from "sanity";
import { localeString, localeText } from "./locale";
import { objectTypes } from "./objects";
import { documentTypes } from "./documents";

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  ...objectTypes,
  ...documentTypes,
];
