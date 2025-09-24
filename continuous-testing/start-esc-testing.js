#!/usr/bin/env node

/**
 * ServiceNow ESC Continuous Testing Startup Script
 * 
 * This script starts the complete ESC continuous testing framework
 * with proper initialization, error handling, and configuration validation.
 */

const ESCContinuousTestingOrchestrator = require('./esc-continuous-testing-orchestrator');
const fs = require('fs');
const path = require('path');

class ESCTestingStarter {
    constructor() {
        this.orchestrator = null;
        this.config = this.loadConfiguration();
    }

    /**
     * Load configuration from environment and config files
     */
    loadConfiguration() {
        console.log('📋 Loading ESC testing configuration...');

        const config = {
            // Email configuration
            email: {
                smtpHost: process.env.SMTP_HOST || 'localhost',
                smtpPort: parseInt(process.env.SMTP_PORT) || 587,
                fromEmail: process.env.ALERT_FROM_EMAIL || 'esc-alerts@company.com',
                enabled: !!process.env.SMTP_HOST
            },

            // Slack configuration
            slack: {
                webhookUrl: process.env.SLACK_WEBHOOK_URL,
                channel: process.env.SLACK_CHANNEL || '#esc-alerts',
                enabled: !!process.env.SLACK_WEBHOOK_URL
            },

            // Security team configuration
            security: {
                emails: (process.env.SECURITY_EMAILS || '').split(',').filter(e => e.trim()),
                escalationPhone: process.env.SECURITY_ESCALATION_PHONE,
                enabled: !!(process.env.SECURITY_EMAILS || process.env.SECURITY_ESCALATION_PHONE)
            },

            // Performance thresholds
            performance: {
                maxFormLoadTime: parseInt(process.env.MAX_FORM_LOAD_TIME) || 5000,
                maxVariableCount: parseInt(process.env.MAX_VARIABLE_COUNT) || 100,
                complianceThreshold: parseInt(process.env.COMPLIANCE_THRESHOLD) || 80,
                maxQueryTime: parseInt(process.env.MAX_QUERY_TIME) || 2000,
                maxMemoryUsage: parseInt(process.env.MAX_MEMORY_USAGE) || 512
            },

            // Monitoring intervals (in milliseconds)
            monitoring: {
                performanceInterval: parseInt(process.env.PERFORMANCE_INTERVAL) || 10000,
                complianceInterval: parseInt(process.env.COMPLIANCE_INTERVAL) || 30000,
                securityInterval: parseInt(process.env.SECURITY_INTERVAL) || 15000,
                integrationInterval: parseInt(process.env.INTEGRATION_INTERVAL) || 20000,
                coordinationInterval: parseInt(process.env.COORDINATION_INTERVAL) || 5000
            },

            // Logging configuration
            logging: {
                level: process.env.LOG_LEVEL || 'info',
                file: process.env.LOG_FILE || 'logs/esc-testing.log',
                console: process.env.LOG_CONSOLE !== 'false'
            },

            // Development mode
            development: process.env.NODE_ENV === 'development' || process.env.DEBUG
        };

        console.log('   📋 Configuration loaded successfully');
        return config;
    }

    /**
     * Validate configuration before starting
     */
    validateConfiguration() {
        console.log('✅ Validating configuration...');

        const errors = [];
        const warnings = [];

        // Validate performance thresholds
        if (this.config.performance.maxFormLoadTime < 1000) {
            warnings.push('Form load time threshold is very low (< 1 second)');
        }

        if (this.config.performance.maxVariableCount > 150) {
            errors.push('Variable count threshold is too high (> 150) for ESC compliance');
        }

        if (this.config.performance.complianceThreshold < 50) {
            errors.push('Compliance threshold is too low (< 50)');
        }

        // Validate email configuration
        if (this.config.email.enabled && !this.config.email.smtpHost) {
            errors.push('SMTP host is required when email alerts are enabled');
        }

        // Validate Slack configuration
        if (this.config.slack.enabled && !this.config.slack.webhookUrl.startsWith('https://hooks.slack.com/')) {
            warnings.push('Slack webhook URL format appears invalid');
        }

        // Validate monitoring intervals
        if (this.config.monitoring.performanceInterval < 5000) {
            warnings.push('Performance monitoring interval is very frequent (< 5 seconds)');
        }

        // Log validation results
        if (errors.length > 0) {
            console.error('❌ Configuration errors:');
            errors.forEach(error => console.error(`   - ${error}`));
            throw new Error('Configuration validation failed');
        }

        if (warnings.length > 0) {
            console.warn('⚠️ Configuration warnings:');
            warnings.forEach(warning => console.warn(`   - ${warning}`));
        }

        console.log('   ✅ Configuration validation passed');
    }

    /**
     * Setup logging
     */
    setupLogging() {
        if (this.config.logging.file) {
            const logDir = path.dirname(this.config.logging.file);
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }
        }

        // Setup console logging based on level
        if (this.config.development) {
            console.log('🐛 Debug mode enabled');
        }
    }

    /**
     * Display startup banner
     */
    displayStartupBanner() {
        console.log('\n' + '='.repeat(80));
        console.log('🚀 ServiceNow ESC Continuous Testing Framework');
        console.log('='.repeat(80));
        console.log(`📅 Start Time: ${new Date().toISOString()}`);
        console.log(`🔧 Environment: ${process.env.NODE_ENV || 'production'}`);
        console.log(`📊 Performance Threshold: ${this.config.performance.maxFormLoadTime}ms`);
        console.log(`📋 Variable Limit: ${this.config.performance.maxVariableCount}`);
        console.log(`📈 Compliance Threshold: ${this.config.performance.complianceThreshold}%`);
        
        if (this.config.email.enabled) {
            console.log(`📧 Email Alerts: Enabled (${this.config.email.smtpHost})`);
        }
        
        if (this.config.slack.enabled) {
            console.log(`💬 Slack Alerts: Enabled (${this.config.slack.channel})`);
        }
        
        if (this.config.security.enabled) {
            console.log(`🔒 Security Alerts: Enabled (${this.config.security.emails.length} contacts)`);
        }
        
        console.log('='.repeat(80) + '\n');
    }

    /**
     * Initialize and start the ESC testing framework
     */
    async start() {
        try {
            // Validate configuration
            this.validateConfiguration();

            // Setup logging
            this.setupLogging();

            // Display startup banner
            this.displayStartupBanner();

            // Create orchestrator
            console.log('🏗️ Creating ESC Continuous Testing Orchestrator...');
            this.orchestrator = new ESCContinuousTestingOrchestrator();

            // Apply configuration
            await this.applyConfiguration();

            // Initialize systems
            console.log('⚙️ Initializing ESC compliance systems...');
            await this.orchestrator.initialize();

            // Start continuous testing
            console.log('🎬 Starting continuous ESC compliance testing...');
            await this.orchestrator.start();

            // Display success message
            this.displaySuccessMessage();

            // Setup monitoring
            this.setupProcessMonitoring();

        } catch (error) {
            console.error('❌ Failed to start ESC Continuous Testing:', error);
            
            if (this.config.development) {
                console.error('Stack trace:', error.stack);
            }
            
            process.exit(1);
        }
    }

    /**
     * Apply configuration to the orchestrator
     */
    async applyConfiguration() {
        // Configuration is applied through environment variables
        // that the individual systems read during initialization
        console.log('⚙️ Applying configuration to systems...');
    }

    /**
     * Display success message
     */
    displaySuccessMessage() {
        console.log('\n' + '🎉'.repeat(20));
        console.log('🎉 ESC CONTINUOUS TESTING IS NOW ACTIVE! 🎉');
        console.log('🎉'.repeat(20) + '\n');
        
        console.log('✅ Systems Status:');
        console.log('   🔍 ESC Compliance Validator: ACTIVE');
        console.log('   ⚡ Real-Time Monitor: ACTIVE');
        console.log('   🔧 Technical Validation Tools: READY');
        console.log('   🤝 Agent Coordination System: ACTIVE');
        console.log('   🚨 Automated Alerts System: ACTIVE');
        
        console.log('\n📊 Monitoring:');
        console.log('   • Variable count limits (max: ' + this.config.performance.maxVariableCount + ')');
        console.log('   • Form load performance (max: ' + this.config.performance.maxFormLoadTime + 'ms)');
        console.log('   • User criteria compliance (item-level only)');
        console.log('   • Item Designer limitations');
        console.log('   • Security compliance (ACLs, encryption)');
        console.log('   • Integration constraints');
        
        console.log('\n🤖 Agent Coordination:');
        console.log('   • Real-time violation detection');
        console.log('   • Immediate correction commands');
        console.log('   • Knowledge sharing between agents');
        console.log('   • Automated recovery assistance');
        
        console.log('\n🚨 Alert Channels:');
        if (this.config.email.enabled) {
            console.log('   📧 Email notifications configured');
        }
        if (this.config.slack.enabled) {
            console.log('   💬 Slack notifications configured');
        }
        if (this.config.security.enabled) {
            console.log('   🔒 Security team notifications configured');
        }
        console.log('   🖥️ Console alerts always active');
        
        console.log('\n📈 Reports:');
        console.log('   • Real-time status updates (every 15 minutes)');
        console.log('   • Comprehensive reports (hourly)');
        console.log('   • Daily compliance summaries');
        console.log('   • Weekly trend analysis');
        
        console.log('\n🎯 Ready to ensure ESC compliance!');
        console.log('Press Ctrl+C to stop gracefully\n');
    }

    /**
     * Setup process monitoring
     */
    setupProcessMonitoring() {
        // Monitor memory usage
        setInterval(() => {
            const usage = process.memoryUsage();
            const memoryMB = Math.round(usage.heapUsed / 1024 / 1024);
            
            if (memoryMB > this.config.performance.maxMemoryUsage) {
                console.warn(`⚠️ High memory usage: ${memoryMB}MB (threshold: ${this.config.performance.maxMemoryUsage}MB)`);
            }
            
            if (this.config.development && memoryMB > 100) {
                console.log(`💾 Memory usage: ${memoryMB}MB`);
            }
        }, 60000); // Every minute

        // Monitor CPU usage (simplified)
        let lastCpuUsage = process.cpuUsage();
        setInterval(() => {
            const currentUsage = process.cpuUsage(lastCpuUsage);
            const cpuPercent = Math.round((currentUsage.user + currentUsage.system) / 10000);
            
            if (cpuPercent > 80) {
                console.warn(`⚠️ High CPU usage: ${cpuPercent}%`);
            }
            
            lastCpuUsage = process.cpuUsage();
        }, 30000); // Every 30 seconds

        // Log uptime periodically
        if (this.config.development) {
            setInterval(() => {
                const uptimeHours = Math.floor(process.uptime() / 3600);
                const uptimeMinutes = Math.floor((process.uptime() % 3600) / 60);
                console.log(`⏱️ Uptime: ${uptimeHours}h ${uptimeMinutes}m`);
            }, 300000); // Every 5 minutes
        }
    }

    /**
     * Graceful shutdown
     */
    async shutdown() {
        console.log('\n🛑 Initiating graceful shutdown...');
        
        if (this.orchestrator) {
            await this.orchestrator.shutdown();
        }
        
        console.log('✅ ESC Continuous Testing stopped gracefully');
        process.exit(0);
    }
}

// Handle command line arguments
function parseArguments() {
    const args = process.argv.slice(2);
    const options = {};
    
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--help':
            case '-h':
                displayHelp();
                process.exit(0);
                break;
            case '--version':
            case '-v':
                displayVersion();
                process.exit(0);
                break;
            case '--config':
                options.configFile = args[++i];
                break;
            case '--debug':
                process.env.DEBUG = 'esc:*';
                process.env.NODE_ENV = 'development';
                break;
            case '--quiet':
                process.env.LOG_CONSOLE = 'false';
                break;
        }
    }
    
    return options;
}

function displayHelp() {
    console.log(`
ServiceNow ESC Continuous Testing Framework

Usage: node start-esc-testing.js [options]

Options:
  -h, --help         Show this help message
  -v, --version      Show version information
  --config <file>    Use custom configuration file
  --debug            Enable debug mode with verbose logging
  --quiet            Suppress console output (logs to file only)

Environment Variables:
  SMTP_HOST                 SMTP server for email alerts
  SMTP_PORT                 SMTP port (default: 587)
  ALERT_FROM_EMAIL          From address for alerts
  SLACK_WEBHOOK_URL         Slack webhook for notifications
  SLACK_CHANNEL             Slack channel (default: #esc-alerts)
  SECURITY_EMAILS           Security team email addresses (comma-separated)
  MAX_FORM_LOAD_TIME        Maximum form load time in ms (default: 5000)
  MAX_VARIABLE_COUNT        Maximum variables per catalog item (default: 100)
  COMPLIANCE_THRESHOLD      Minimum compliance score (default: 80)
  LOG_LEVEL                 Logging level (default: info)
  LOG_FILE                  Log file path (default: logs/esc-testing.log)

Examples:
  node start-esc-testing.js                    # Start with default configuration
  node start-esc-testing.js --debug            # Start in debug mode
  node start-esc-testing.js --config custom.env # Use custom configuration

For more information, see README.md
`);
}

function displayVersion() {
    const packageInfo = {
        name: 'ServiceNow ESC Continuous Testing Framework',
        version: '1.0.0',
        description: 'Continuous testing and validation of ServiceNow ESC compliance'
    };
    
    console.log(`${packageInfo.name} v${packageInfo.version}`);
    console.log(packageInfo.description);
}

// Main execution
async function main() {
    const options = parseArguments();
    const starter = new ESCTestingStarter();
    
    // Setup shutdown handlers
    process.on('SIGINT', async () => {
        await starter.shutdown();
    });
    
    process.on('SIGTERM', async () => {
        await starter.shutdown();
    });
    
    process.on('uncaughtException', (error) => {
        console.error('💥 Uncaught Exception:', error);
        if (starter.config && starter.config.development) {
            console.error('Stack trace:', error.stack);
        }
        process.exit(1);
    });
    
    process.on('unhandledRejection', (reason, promise) => {
        console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
    });
    
    // Start the ESC testing framework
    await starter.start();
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('💥 Fatal error:', error);
        process.exit(1);
    });
}

module.exports = ESCTestingStarter;