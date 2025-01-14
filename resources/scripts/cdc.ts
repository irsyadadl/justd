import * as fs from "node:fs"
import path from "node:path"

/**
 * Function to get all .tsx files in a directory and its subdirectories
 * @param dir - The directory to scan
 * @param fileList - An optional array to store the file paths
 * @returns An array of file paths
 */
const getAllTsxFiles = (dir: string, fileList: string[] = []): string[] => {
    if (!fs.existsSync(dir)) {
        console.error(`Directory does not exist: ${dir}`);
        return fileList;
    }

    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        try {
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                getAllTsxFiles(filePath, fileList);
            } else if (filePath.endsWith('.tsx')) {
                fileList.push(filePath);
            }
        } catch (error) {
            console.error(`Error accessing path: ${filePath}`, error);
        }
    });

    return fileList;
};


/**
 * Function to find duplicate classes in a string
 * @param content - The string to search
 * @returns An array of duplicate class names
 */
const findDuplicateClasses = (content: string): string[] => {
    const classRegex = /class(Name)?="(.*?)"/g;
    const duplicates: string[] = [];

    let match;
    while ((match = classRegex.exec(content)) !== null) {
        const classes = match[2].split(/\s+/);
        const seen = new Set<string>();

        classes.forEach((cls) => {
            if (seen.has(cls)) {
                duplicates.push(cls);
            } else {
                seen.add(cls);
            }
        });
    }

    return duplicates;
};

/**
 * Function to scan directories recursively for .tsx files and check for duplicate classes
 * @param directories
 */
const detectDuplicateClasses = (directories: string[]) => {
    directories.forEach((dir) => {
        const files = getAllTsxFiles(dir);

        files.forEach((file) => {
            const content = fs.readFileSync(file, 'utf-8');
            const duplicates = findDuplicateClasses(content);

            if (duplicates.length > 0) {
                console.log(`File: ${file}`);
                console.log(`Duplicate classes: ${[...new Set(duplicates)].join(', ')}`);
                console.log('---');
            }
        });
    });
};

/**
 * Scan directories recursively for .tsx files and check for duplicate classes
 */
const directoriesToScan = ['app', 'components'];
detectDuplicateClasses(directoriesToScan);
