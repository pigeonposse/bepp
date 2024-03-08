import { resolve } from "node:path";
import { createGenerator } from "ts-json-schema-generator";
import { writeFile } from "node:fs/promises"; // Use fs.promises to get promise-based file operations

async function generateSchema() {
  const route = resolve("src", "build", 'config');

  const config = {
    path: resolve(route, "types.ts"),
    tsconfig: resolve("tsconfig.json"),
    type: "BuildConfig", // Or <type-name> if you want to generate schema for that one type only,
    expose: 'none',
  };
  const outputPath = resolve(route, "schema.json");

  console.log({
    title: 'config data:',
    value: {
      ...config,
      outputPath
    }
  });

  try {
    // @ts-ignore
    const schema = createGenerator(config).createSchema(config.type);
    const schemaString = JSON.stringify(schema, null, 2);
    
    await writeFile(outputPath, schemaString); // Use await to wait for the file writing operation to complete
    console.log("Schema file written successfully!");
  } catch (err) {
    console.error("Error writing schema file:", err);
  }
}

generateSchema();
