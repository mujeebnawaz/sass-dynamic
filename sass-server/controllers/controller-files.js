const fs   = require('fs');
const path = require('path');

// Function to recursively process Sass files
function processSassFile(filePath, processedFiles = new Set()) {
    if (processedFiles.has(filePath)) {
        // Prevent infinite loop if there are circular imports
        return;
    }

    processedFiles.add(filePath);

    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse Sass content to find import statements
    const importStatements = fileContent.match(/@import\s+['"](.*)['"]/g);

    if (importStatements) {
        importStatements.forEach(importStatement => {
            const importedFilePath = path.resolve(path.dirname(filePath), importStatement.match(/['"](.*?)['"]/)[1] + '.scss');

            if (fs.existsSync(importedFilePath)) {
                // Read content of imported file
                const importedFileContent = fs.readFileSync(importedFilePath, 'utf8');
                console.log(`Content of ${importedFilePath}:`);
                console.log(importedFileContent);

                // Process the imported file recursively
                processSassFile(importedFilePath, processedFiles);
            } else {
                console.error(`File not found: ${importedFilePath}`);
            }
        });
    }
}