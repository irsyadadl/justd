import fs from "node:fs"
import path from "node:path"

const PATH = path.resolve(__dirname, "../../components/ui")

// Define the target directory and classes to search for
const TARGET_DIR = PATH
const TARGET_CLASSES = [
  "bg-primary",
  "bg-accent",
  "bg-overlay",
  "bg-secondary",
  "bg-muted",
  "bg-warning",
  "bg-success",
]

// Function to read files recursively and find matches
const findComponentsUsingClasses = (
  dir: string,
  targetClasses: string[],
): Record<string, string[]> => {
  const result: Record<string, string[]> = {}

  targetClasses.forEach((cls) => {
    result[cls] = []
  })

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Recursively check subdirectories
      const subResults = findComponentsUsingClasses(fullPath, targetClasses)
      targetClasses.forEach((cls) => {
        result[cls] = result[cls]!.concat(subResults[cls]!)
      })
    } else if (stat.isFile() && file.endsWith(".tsx")) {
      // Check .tsx files for the target classes
      const content = fs.readFileSync(fullPath, "utf8")
      targetClasses.forEach((cls) => {
        if (content.includes(cls)) {
          const componentName = path.basename(file, ".tsx")
          if (!result[cls]!.includes(componentName)) {
            result[cls]!.push(componentName)
          }
        }
      })
    }
  }

  return result
}

// Main function
const main = () => {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`Directory not found: ${TARGET_DIR}`)
    process.exit(1)
  }

  const components = findComponentsUsingClasses(TARGET_DIR, TARGET_CLASSES)

  TARGET_CLASSES.forEach((cls) => {
    if (components[cls]!.length === 0) {
    } else {
      components[cls]!.forEach((component) => {
        console.info(`Found ${component} using ${cls}`)
      })
    }
  })
}

main()
