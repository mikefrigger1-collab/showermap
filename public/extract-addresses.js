// Simple Address Extractor - extracts only the "address" field in plain text
// Run with: node extract-addresses-simple.js ./data/states

const fs = require('fs');
const path = require('path');

class SimpleAddressExtractor {
  constructor() {
    this.addresses = [];
  }

  processStateFile(stateCode, filePath) {
    console.log(`Processing ${stateCode}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  File not found: ${filePath}`);
      return;
    }

    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      const stateData = JSON.parse(rawData);
      
      if (!stateData.locations || !Array.isArray(stateData.locations)) {
        console.log(`  Invalid data format in ${filePath}`);
        return;
      }

      // Extract only the address field
      stateData.locations.forEach(location => {
        if (location.address && location.address.trim()) {
          this.addresses.push(location.address.trim());
        }
      });

      console.log(`  Found ${stateData.locations.length} locations, ${stateData.locations.filter(l => l.address && l.address.trim()).length} with addresses`);

    } catch (error) {
      console.error(`  Error processing ${stateCode}:`, error.message);
    }
  }

  saveAddressesByChunks(outputFolder, chunkSize = 500) {
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    console.log(`\nSaving ${this.addresses.length} addresses in chunks of ${chunkSize}...`);

    let fileIndex = 1;
    for (let i = 0; i < this.addresses.length; i += chunkSize) {
      const chunk = this.addresses.slice(i, i + chunkSize);
      const fileName = `addresses-${fileIndex.toString().padStart(3, '0')}.txt`;
      const filePath = path.join(outputFolder, fileName);
      
      // Join addresses with newlines
      const content = chunk.join('\n');
      fs.writeFileSync(filePath, content);
      
      console.log(`  Saved ${chunk.length} addresses to ${fileName}`);
      fileIndex++;
    }

    // Save summary
    const summaryPath = path.join(outputFolder, 'summary.txt');
    const summary = `Address Extraction Summary
Generated: ${new Date().toISOString()}
Total addresses: ${this.addresses.length}
Files created: ${Math.ceil(this.addresses.length / chunkSize)}
Addresses per file: ${chunkSize}
`;
    fs.writeFileSync(summaryPath, summary);

    console.log(`\nSummary saved to ${summaryPath}`);
  }

  processAllStates(inputFolder, outputFolder = './extracted-addresses') {
    const allStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    console.log(`Extracting addresses from ${allStates.length} states...\n`);

    // Process each state file
    allStates.forEach(stateCode => {
      const filePath = path.join(inputFolder, `${stateCode}.json`);
      this.processStateFile(stateCode, filePath);
    });

    // Save addresses in chunks
    this.saveAddressesByChunks(outputFolder, 500);

    console.log('\n=== EXTRACTION COMPLETE ===');
    console.log(`Total addresses extracted: ${this.addresses.length}`);
    console.log(`Files created in: ${outputFolder}`);
  }
}

// CLI Usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
📍 Simple Address Extractor

Usage: node extract-addresses-simple.js <input-folder> [output-folder]

Examples:
  node extract-addresses-simple.js ./data/states
  node extract-addresses-simple.js ./data/states ./my-addresses

This will:
- Extract only the "address" field from all state JSON files
- Save addresses as plain text, 500 per file
- Create files: addresses-001.txt, addresses-002.txt, etc.
    `);
    process.exit(1);
  }

  const inputFolder = args[0];
  const outputFolder = args[1] || './extracted-addresses';

  if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder does not exist: ${inputFolder}`);
    process.exit(1);
  }

  const extractor = new SimpleAddressExtractor();
  extractor.processAllStates(inputFolder, outputFolder);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { SimpleAddressExtractor };