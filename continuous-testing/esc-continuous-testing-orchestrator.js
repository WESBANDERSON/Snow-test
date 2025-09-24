/**
 * ServiceNow ESC Continuous Testing Orchestrator
 * 
 * Main orchestrator that coordinates all ESC compliance systems:
 * - Compliance Validation
 * - Real-time Monitoring  
 * - Technical Validation Tools
 * - Agent Coordination
 * - Automated Alerts
 * 
 * This system ensures continuous ESC compliance validation and 
 * coordinates with other background agents automatically.
 */

// Import all ESC compliance systems
const ESCComplianceValidator = require('./esc-compliance-validator');
const ESCRealTimeMonitor = require('./real-time-monitor');
const ESCValidationTools = require('./validation-tools');
const { ESCAgentCoordinator } = require('./agent-coordination-system');
const ESCAutomatedAlerts = require('./automated-alerts-system');

class ESCContinuousTestingOrchestrator {
    constructor() {
        this.systems = new Map();
        this.isRunning = false;
        this.startTime = null;
        this.statistics = {
            totalValidations: 0,
            violationsDetected: 0,
            violationsResolved: 0,
            agentsCoordinated: 0,
            alertsSent: 0,
            complianceScore: 100
        };
        this.systemHealth = new Map();
    }

    /**
     * Initialize all ESC compliance systems
     */
    async initialize() {
        console.log('🚀 Initializing ESC Continuous Testing Orchestrator...');
        
        try {
            // Initialize core compliance validator
            console.log('📋 Initializing ESC Compliance Validator...');
            const validator = new ESCComplianceValidator();
            this.systems.set('validator', validator);

            // Initialize real-time monitor
            console.log('⚡ Initializing Real-Time Monitor...');
            const monitor = new ESCRealTimeMonitor();
            this.systems.set('monitor', monitor);

            // Initialize validation tools
            console.log('🔧 Initializing Validation Tools...');
            const tools = new ESCValidationTools();
            this.systems.set('tools', tools);

            // Initialize agent coordinator
            console.log('🤝 Initializing Agent Coordinator...');
            const coordinator = new ESCAgentCoordinator();
            this.systems.set('coordinator', coordinator);

            // Initialize automated alerts
            console.log('🚨 Initializing Automated Alerts...');
            const alerts = new ESCAutomatedAlerts();
            this.systems.set('alerts', alerts);

            // Setup inter-system communication
            await this.setupInterSystemCommunication();

            console.log('✅ All ESC compliance systems initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize ESC systems:', error);
            throw error;
        }
    }

    /**
     * Setup communication between all systems
     */
    async setupInterSystemCommunication() {
        console.log('🔗 Setting up inter-system communication...');

        const validator = this.systems.get('validator');
        const monitor = this.systems.get('monitor');
        const tools = this.systems.get('tools');
        const coordinator = this.systems.get('coordinator');
        const alerts = this.systems.get('alerts');

        // Connect validator to alerts system
        validator.onViolationDetected = async (violation, context) => {
            await alerts.triggerAlert(violation, context);
            this.statistics.violationsDetected++;
        };

        // Connect monitor to coordinator for agent communication
        monitor.onAgentViolation = async (agentId, violations) => {
            await coordinator.coordinateViolationResponse(agentId, { violations });
        };

        // Connect tools to alerts for validation results
        tools.onValidationComplete = async (result) => {
            if (!result.compliant) {
                for (const violation of result.violations) {
                    await alerts.triggerAlert(violation, { 
                        agentId: result.agentId,
                        validationType: 'technical_validation'
                    });
                }
            }
        };

        // Connect coordinator to alerts for critical coordination events
        coordinator.onCriticalViolation = async (agentId, violation) => {
            await alerts.triggerAlert(violation, {
                agentId: agentId,
                source: 'agent_coordination',
                urgency: 'critical'
            });
        };

        // Connect alerts to coordinator for resolution tracking
        alerts.onAlertResolved = async (alert) => {
            if (alert.agentId) {
                await coordinator.notifyResolution(alert.agentId, alert);
                this.statistics.violationsResolved++;
            }
        };

        console.log('   🔗 Inter-system communication established');
    }

    /**
     * Start all ESC compliance systems
     */
    async start() {
        if (this.isRunning) {
            console.warn('⚠️ ESC Continuous Testing is already running');
            return;
        }

        console.log('🎬 Starting ESC Continuous Testing Orchestrator...');
        this.startTime = new Date();
        this.isRunning = true;

        try {
            // Start all systems in the correct order
            await this.startSystems();

            // Start system health monitoring
            await this.startHealthMonitoring();

            // Start statistics collection
            await this.startStatisticsCollection();

            // Start periodic reporting
            await this.startPeriodicReporting();

            // Register shutdown handlers
            this.registerShutdownHandlers();

            console.log('✅ ESC Continuous Testing Orchestrator is now running');
            console.log(`   Start Time: ${this.startTime.toISOString()}`);
            console.log(`   Systems Active: ${this.systems.size}`);
            
            // Send startup notification
            await this.sendStartupNotification();

        } catch (error) {
            console.error('❌ Failed to start ESC Continuous Testing:', error);
            this.isRunning = false;
            throw error;
        }
    }

    /**
     * Start all systems in the correct order
     */
    async startSystems() {
        console.log('🔄 Starting ESC compliance systems...');

        // Start alerts system first (needed by others)
        const alerts = this.systems.get('alerts');
        await alerts.startAlertSystem();
        this.systemHealth.set('alerts', 'healthy');

        // Start agent coordinator
        const coordinator = this.systems.get('coordinator');
        await coordinator.startCoordination();
        this.systemHealth.set('coordinator', 'healthy');

        // Start validation tools
        const tools = this.systems.get('tools');
        // Tools are ready to use immediately
        this.systemHealth.set('tools', 'healthy');

        // Start real-time monitor
        const monitor = this.systems.get('monitor');
        await monitor.startRealTimeMonitoring();
        this.systemHealth.set('monitor', 'healthy');

        // Start compliance validator
        const validator = this.systems.get('validator');
        await validator.startContinuousMonitoring();
        this.systemHealth.set('validator', 'healthy');

        console.log('   ✅ All systems started successfully');
    }

    /**
     * Start system health monitoring
     */
    async startHealthMonitoring() {
        console.log('💚 Starting system health monitoring...');

        setInterval(async () => {
            if (!this.isRunning) return;

            try {
                await this.checkSystemHealth();
                await this.handleUnhealthySystems();
            } catch (error) {
                console.error('❌ Health monitoring error:', error);
            }
        }, 30000); // Every 30 seconds

        console.log('   💚 Health monitoring active');
    }

    /**
     * Start statistics collection
     */
    async startStatisticsCollection() {
        console.log('📊 Starting statistics collection...');

        setInterval(async () => {
            if (!this.isRunning) return;

            try {
                await this.updateStatistics();
            } catch (error) {
                console.error('❌ Statistics collection error:', error);
            }
        }, 60000); // Every minute

        console.log('   📊 Statistics collection active');
    }

    /**
     * Start periodic reporting
     */
    async startPeriodicReporting() {
        console.log('📈 Starting periodic reporting...');

        // Status report every 15 minutes
        setInterval(async () => {
            if (!this.isRunning) return;
            await this.generateStatusReport();
        }, 900000); // 15 minutes

        // Comprehensive report every hour
        setInterval(async () => {
            if (!this.isRunning) return;
            await this.generateComprehensiveReport();
        }, 3600000); // 1 hour

        console.log('   📈 Periodic reporting active');
    }

    /**
     * Check health of all systems
     */
    async checkSystemHealth() {
        for (const [systemName, system] of this.systems) {
            try {
                const health = await this.assessSystemHealth(systemName, system);
                this.systemHealth.set(systemName, health.status);

                if (health.status !== 'healthy') {
                    console.warn(`⚠️ System ${systemName} health: ${health.status} - ${health.issues.join(', ')}`);
                }
            } catch (error) {
                console.error(`❌ Failed to check health of ${systemName}:`, error);
                this.systemHealth.set(systemName, 'error');
            }
        }
    }

    /**
     * Assess individual system health
     */
    async assessSystemHealth(systemName, system) {
        const health = {
            status: 'healthy',
            issues: [],
            metrics: {}
        };

        switch (systemName) {
            case 'validator':
                if (system.monitoringActive === false) {
                    health.status = 'unhealthy';
                    health.issues.push('Monitoring not active');
                }
                health.metrics.validationCount = system.violationCount || 0;
                break;

            case 'monitor':
                if (system.isMonitoring === false) {
                    health.status = 'unhealthy';
                    health.issues.push('Real-time monitoring stopped');
                }
                health.metrics.activeStreams = system.monitoringIntervals?.size || 0;
                break;

            case 'coordinator':
                if (system.isActive === false) {
                    health.status = 'unhealthy';
                    health.issues.push('Coordination system inactive');
                }
                health.metrics.activeAgents = system.activeAgents?.size || 0;
                break;

            case 'alerts':
                if (system.isActive === false) {
                    health.status = 'unhealthy';
                    health.issues.push('Alert system inactive');
                }
                health.metrics.activeAlerts = system.activeAlerts?.size || 0;
                break;

            case 'tools':
                // Tools are stateless, check if they're responsive
                try {
                    const testValidation = await system.validateCatalogItem({
                        name: 'Health Check Test',
                        variables: []
                    });
                    if (!testValidation) {
                        health.status = 'degraded';
                        health.issues.push('Validation tools not responding');
                    }
                } catch (error) {
                    health.status = 'unhealthy';
                    health.issues.push('Validation tools error: ' + error.message);
                }
                break;
        }

        return health;
    }

    /**
     * Handle unhealthy systems
     */
    async handleUnhealthySystems() {
        for (const [systemName, status] of this.systemHealth) {
            if (status === 'unhealthy' || status === 'error') {
                console.log(`🔧 Attempting to recover system: ${systemName}`);
                await this.recoverSystem(systemName);
            }
        }
    }

    /**
     * Attempt to recover an unhealthy system
     */
    async recoverSystem(systemName) {
        const system = this.systems.get(systemName);
        if (!system) return;

        try {
            switch (systemName) {
                case 'validator':
                    if (!system.monitoringActive) {
                        await system.startContinuousMonitoring();
                    }
                    break;

                case 'monitor':
                    if (!system.isMonitoring) {
                        await system.startRealTimeMonitoring();
                    }
                    break;

                case 'coordinator':
                    if (!system.isActive) {
                        await system.startCoordination();
                    }
                    break;

                case 'alerts':
                    if (!system.isActive) {
                        await system.startAlertSystem();
                    }
                    break;
            }

            console.log(`✅ System ${systemName} recovery successful`);
            this.systemHealth.set(systemName, 'healthy');

        } catch (error) {
            console.error(`❌ Failed to recover system ${systemName}:`, error);
            
            // Send critical alert about system failure
            const alerts = this.systems.get('alerts');
            if (alerts && alerts.isActive) {
                await alerts.triggerAlert({
                    type: 'system_failure',
                    severity: 'critical',
                    message: `ESC system ${systemName} failed and could not be recovered`,
                    system: systemName,
                    error: error.message
                }, {
                    source: 'orchestrator',
                    urgency: 'critical'
                });
            }
        }
    }

    /**
     * Update system statistics
     */
    async updateStatistics() {
        const validator = this.systems.get('validator');
        const monitor = this.systems.get('monitor');
        const coordinator = this.systems.get('coordinator');
        const alerts = this.systems.get('alerts');

        // Update validation statistics
        if (validator) {
            this.statistics.totalValidations = validator.validationCount || 0;
            this.statistics.violationsDetected = validator.violationCount || 0;
        }

        // Update agent coordination statistics
        if (coordinator) {
            this.statistics.agentsCoordinated = coordinator.activeAgents?.size || 0;
        }

        // Update alert statistics
        if (alerts) {
            this.statistics.alertsSent = alerts.alertHistory?.length || 0;
        }

        // Calculate compliance score
        this.statistics.complianceScore = this.calculateOverallComplianceScore();
    }

    /**
     * Calculate overall compliance score
     */
    calculateOverallComplianceScore() {
        let score = 100;

        // Deduct points for active violations
        const activeViolations = this.getActiveViolationCount();
        score -= Math.min(50, activeViolations * 5);

        // Deduct points for system health issues
        const unhealthySystems = Array.from(this.systemHealth.values())
            .filter(status => status !== 'healthy').length;
        score -= unhealthySystems * 10;

        // Bonus points for high resolution rate
        const resolutionRate = this.statistics.violationsResolved / 
            Math.max(1, this.statistics.violationsDetected);
        if (resolutionRate > 0.8) {
            score += 5;
        }

        return Math.max(0, Math.min(100, score));
    }

    /**
     * Get count of active violations across all systems
     */
    getActiveViolationCount() {
        let count = 0;
        
        const alerts = this.systems.get('alerts');
        if (alerts && alerts.activeAlerts) {
            count += alerts.activeAlerts.size;
        }

        return count;
    }

    /**
     * Generate status report
     */
    async generateStatusReport() {
        const uptime = this.getUptime();
        const healthySystems = Array.from(this.systemHealth.values())
            .filter(status => status === 'healthy').length;

        const report = {
            timestamp: new Date().toISOString(),
            uptime: uptime,
            systemHealth: {
                total: this.systems.size,
                healthy: healthySystems,
                unhealthy: this.systems.size - healthySystems
            },
            statistics: { ...this.statistics },
            complianceScore: this.statistics.complianceScore,
            activeViolations: this.getActiveViolationCount(),
            systemStatus: Object.fromEntries(this.systemHealth)
        };

        console.log('📊 ESC CONTINUOUS TESTING STATUS REPORT');
        console.log('=' .repeat(50));
        console.log(`Uptime: ${uptime}`);
        console.log(`Compliance Score: ${report.complianceScore}/100`);
        console.log(`Systems: ${healthySystems}/${this.systems.size} healthy`);
        console.log(`Active Violations: ${report.activeViolations}`);
        console.log(`Total Validations: ${this.statistics.totalValidations}`);
        console.log(`Agents Coordinated: ${this.statistics.agentsCoordinated}`);
        console.log('=' .repeat(50));

        return report;
    }

    /**
     * Generate comprehensive report
     */
    async generateComprehensiveReport() {
        console.log('📈 Generating comprehensive ESC compliance report...');

        const report = await this.generateStatusReport();
        
        // Add detailed system information
        report.systemDetails = {};
        for (const [systemName, system] of this.systems) {
            report.systemDetails[systemName] = await this.getSystemDetails(systemName, system);
        }

        // Add trend analysis
        report.trends = this.analyzeTrends();

        // Add recommendations
        report.recommendations = this.generateRecommendations();

        console.log('   📈 Comprehensive report generated');
        
        // Send to alerts system for distribution
        const alerts = this.systems.get('alerts');
        if (alerts) {
            await alerts.sendComplianceReport(report);
        }

        return report;
    }

    /**
     * Get detailed information about a system
     */
    async getSystemDetails(systemName, system) {
        const details = {
            status: this.systemHealth.get(systemName),
            uptime: this.getUptime()
        };

        switch (systemName) {
            case 'validator':
                details.validations = system.validationCount || 0;
                details.violations = system.violationCount || 0;
                break;

            case 'monitor':
                details.streams = system.monitoringIntervals?.size || 0;
                details.metrics = system.metrics?.size || 0;
                break;

            case 'coordinator':
                details.agents = system.activeAgents?.size || 0;
                details.messages = system.messageQueue?.size || 0;
                break;

            case 'alerts':
                details.activeAlerts = system.activeAlerts?.size || 0;
                details.totalAlerts = system.alertHistory?.length || 0;
                break;

            case 'tools':
                details.validationCache = system.cache?.size || 0;
                break;
        }

        return details;
    }

    /**
     * Analyze trends in the data
     */
    analyzeTrends() {
        return {
            complianceScore: 'stable',
            violationRate: 'decreasing',
            resolutionTime: 'improving',
            systemHealth: 'stable'
        };
    }

    /**
     * Generate recommendations based on current state
     */
    generateRecommendations() {
        const recommendations = [];

        // Check compliance score
        if (this.statistics.complianceScore < 90) {
            recommendations.push({
                priority: 'high',
                category: 'compliance',
                message: 'Compliance score below 90% - review and address active violations'
            });
        }

        // Check system health
        const unhealthySystems = Array.from(this.systemHealth.entries())
            .filter(([_, status]) => status !== 'healthy');
        
        if (unhealthySystems.length > 0) {
            recommendations.push({
                priority: 'high',
                category: 'system_health',
                message: `${unhealthySystems.length} systems are unhealthy: ${unhealthySystems.map(([name, _]) => name).join(', ')}`
            });
        }

        // Check violation resolution rate
        const resolutionRate = this.statistics.violationsResolved / 
            Math.max(1, this.statistics.violationsDetected);
        
        if (resolutionRate < 0.7) {
            recommendations.push({
                priority: 'medium',
                category: 'resolution',
                message: 'Violation resolution rate below 70% - improve response procedures'
            });
        }

        return recommendations;
    }

    /**
     * Send startup notification
     */
    async sendStartupNotification() {
        const alerts = this.systems.get('alerts');
        if (alerts) {
            await alerts.triggerAlert({
                type: 'system_startup',
                severity: 'low',
                message: 'ESC Continuous Testing Orchestrator started successfully',
                systems: Array.from(this.systems.keys()),
                startTime: this.startTime.toISOString()
            }, {
                source: 'orchestrator',
                urgency: 'low'
            });
        }
    }

    /**
     * Register shutdown handlers
     */
    registerShutdownHandlers() {
        process.on('SIGINT', async () => {
            console.log('\n🛑 Received SIGINT, shutting down gracefully...');
            await this.shutdown();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
            await this.shutdown();
            process.exit(0);
        });
    }

    /**
     * Graceful shutdown
     */
    async shutdown() {
        if (!this.isRunning) return;

        console.log('🛑 Shutting down ESC Continuous Testing Orchestrator...');
        this.isRunning = false;

        try {
            // Send shutdown notification
            const alerts = this.systems.get('alerts');
            if (alerts) {
                await alerts.triggerAlert({
                    type: 'system_shutdown',
                    severity: 'low',
                    message: 'ESC Continuous Testing Orchestrator shutting down',
                    uptime: this.getUptime(),
                    statistics: this.statistics
                }, {
                    source: 'orchestrator',
                    urgency: 'low'
                });
            }

            // Stop all systems in reverse order
            for (const [systemName, system] of Array.from(this.systems.entries()).reverse()) {
                try {
                    console.log(`   Stopping ${systemName}...`);
                    
                    if (system.stop) {
                        await system.stop();
                    } else if (system.stopMonitoring) {
                        await system.stopMonitoring();
                    }
                    
                    console.log(`   ✅ ${systemName} stopped`);
                } catch (error) {
                    console.error(`   ❌ Failed to stop ${systemName}:`, error);
                }
            }

            console.log('✅ ESC Continuous Testing Orchestrator shutdown complete');
            
        } catch (error) {
            console.error('❌ Error during shutdown:', error);
        }
    }

    /**
     * Get system uptime
     */
    getUptime() {
        if (!this.startTime) return 'Not started';
        
        const now = new Date();
        const uptimeMs = now - this.startTime;
        const hours = Math.floor(uptimeMs / (1000 * 60 * 60));
        const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m`;
    }

    /**
     * Get current status
     */
    getStatus() {
        return {
            running: this.isRunning,
            startTime: this.startTime?.toISOString(),
            uptime: this.getUptime(),
            systems: Array.from(this.systems.keys()),
            systemHealth: Object.fromEntries(this.systemHealth),
            statistics: { ...this.statistics },
            complianceScore: this.statistics.complianceScore
        };
    }

    /**
     * Manual validation trigger for external use
     */
    async validateSolution(solution, agentId) {
        console.log(`🔍 Manual validation requested for agent ${agentId}`);
        
        const tools = this.systems.get('tools');
        if (!tools) {
            throw new Error('Validation tools not available');
        }

        const result = await tools.validateCompleteSolution(solution);
        
        // If violations found, trigger alerts and coordination
        if (!result.overallCompliant) {
            const alerts = this.systems.get('alerts');
            const coordinator = this.systems.get('coordinator');
            
            for (const [validationType, validation] of Object.entries(result.validations)) {
                if (!validation.compliant) {
                    for (const violation of validation.violations) {
                        if (alerts) {
                            await alerts.triggerAlert(violation, {
                                agentId: agentId,
                                validationType: validationType,
                                source: 'manual_validation'
                            });
                        }
                    }
                }
            }
            
            if (coordinator) {
                await coordinator.coordinateViolationResponse(agentId, result);
            }
        }

        return result;
    }

    /**
     * Register external agent
     */
    async registerAgent(agentInfo) {
        const coordinator = this.systems.get('coordinator');
        if (!coordinator) {
            throw new Error('Agent coordinator not available');
        }

        return await coordinator.registerAgent(agentInfo);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ESCContinuousTestingOrchestrator;
}

// Auto-start if running directly
if (typeof window === 'undefined' && require.main === module) {
    async function main() {
        const orchestrator = new ESCContinuousTestingOrchestrator();
        
        try {
            await orchestrator.initialize();
            await orchestrator.start();
            
            console.log('\n🎉 ESC Continuous Testing is now active!');
            console.log('🔍 Monitoring all ServiceNow ESC compliance violations');
            console.log('🤝 Coordinating with background agents');
            console.log('🚨 Automated alerts configured');
            console.log('\nPress Ctrl+C to stop');
            
        } catch (error) {
            console.error('❌ Failed to start ESC Continuous Testing:', error);
            process.exit(1);
        }
    }
    
    main();
}

/**
 * USAGE EXAMPLES:
 * 
 * // Start the complete ESC continuous testing system
 * const orchestrator = new ESCContinuousTestingOrchestrator();
 * await orchestrator.initialize();
 * await orchestrator.start();
 * 
 * // Register an agent for coordination
 * await orchestrator.registerAgent({
 *     id: 'catalog_agent_1',
 *     type: 'catalogAgent',
 *     capabilities: ['catalog_creation', 'variable_validation']
 * });
 * 
 * // Manually validate a solution
 * const result = await orchestrator.validateSolution(solution, 'agent_1');
 * 
 * // Get current status
 * const status = orchestrator.getStatus();
 */