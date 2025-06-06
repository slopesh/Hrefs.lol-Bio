import { siteMonitor } from '../lib/monitoring';
import { browserChecker } from '../lib/browser-compatibility';

async function startMonitoring() {
  console.log('Starting monitoring services...');

  try {
    // Start site monitoring
    await siteMonitor.startMonitoring();
    console.log('✓ Site monitoring started');

    // Start browser compatibility checking
    await browserChecker.startChecking();
    console.log('✓ Browser compatibility checking started');

    // Handle process termination
    process.on('SIGINT', async () => {
      console.log('\nStopping monitoring services...');
      try {
        await siteMonitor.stopMonitoring();
        await browserChecker.stopChecking();
        console.log('✓ Monitoring services stopped');
        process.exit(0);
      } catch (error) {
        console.error('Error stopping monitoring services:', error);
        process.exit(1);
      }
    });

    // Handle uncaught errors
    process.on('uncaughtException', async (error) => {
      console.error('Uncaught exception:', error);
      await cleanup();
      process.exit(1);
    });

    process.on('unhandledRejection', async (reason) => {
      console.error('Unhandled rejection:', reason);
      await cleanup();
      process.exit(1);
    });

  } catch (error) {
    console.error('Error starting monitoring services:', error);
    await cleanup();
    process.exit(1);
  }
}

async function cleanup() {
  try {
    await siteMonitor.stopMonitoring();
    await browserChecker.stopChecking();
    console.log('✓ Cleanup completed');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

// Start monitoring
startMonitoring().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 