const killPort = require('kill-port');

async function killPortsInRange(startPort, endPort) {
  console.log(`Killing processes on ports ${startPort}-${endPort}...`);

  for (let port = startPort; port <= endPort; port++) {
    try {
      await killPort(port);
      console.log(`✓ Killed process on port ${port}`);
    } catch (error) {
      console.log(`✗ No process found on port ${port} or failed to kill: ${error.message}`);
    }
  }

  console.log('Port killing process completed.');
}

// Kill ports 3000-3005
killPortsInRange(3000, 3005).catch(console.error);
