/**
 * ServiceNow ESC Automated Alerts System
 * 
 * Comprehensive alerting system for ESC compliance violations
 * with multi-channel notifications and escalation procedures.
 */

class ESCAutomatedAlerts {
    constructor() {
        this.alertChannels = new Map();
        this.alertRules = this.initializeAlertRules();
        this.escalationPolicies = this.initializeEscalationPolicies();
        this.alertHistory = [];
        this.activeAlerts = new Map();
        this.suppressionRules = new Map();
        this.notificationTemplates = this.initializeNotificationTemplates();
        this.isActive = false;
    }

    /**
     * Initialize alert rules for different violation types
     */
    initializeAlertRules() {
        return {
            critical: {
                variableCountExceeded: {
                    threshold: 100,
                    immediate: true,
                    channels: ['email', 'console', 'agent_message'],
                    escalate: true,
                    escalationTime: 300000, // 5 minutes
                    suppressionTime: 0 // No suppression for critical
                },
                securityViolation: {
                    immediate: true,
                    channels: ['email', 'console', 'agent_message', 'security_team'],
                    escalate: true,
                    escalationTime: 180000, // 3 minutes
                    suppressionTime: 0
                },
                invalidUserCriteria: {
                    immediate: true,
                    channels: ['email', 'console', 'agent_message'],
                    escalate: true,
                    escalationTime: 600000, // 10 minutes
                    suppressionTime: 0
                }
            },
            high: {
                performanceConcern: {
                    threshold: 5000, // 5 seconds
                    immediate: false,
                    channels: ['console', 'agent_message'],
                    escalate: true,
                    escalationTime: 900000, // 15 minutes
                    suppressionTime: 300000 // 5 minutes
                },
                itemDesignerLimitation: {
                    immediate: false,
                    channels: ['console', 'agent_message'],
                    escalate: false,
                    suppressionTime: 600000 // 10 minutes
                },
                integrationError: {
                    threshold: 3, // 3 consecutive errors
                    immediate: true,
                    channels: ['email', 'console', 'agent_message'],
                    escalate: true,
                    escalationTime: 600000, // 10 minutes
                    suppressionTime: 120000 // 2 minutes
                }
            },
            medium: {
                complianceScoreLow: {
                    threshold: 80,
                    immediate: false,
                    channels: ['console', 'agent_message'],
                    escalate: false,
                    suppressionTime: 1800000 // 30 minutes
                },
                tooManyVariables: {
                    threshold: 75,
                    immediate: false,
                    channels: ['console'],
                    escalate: false,
                    suppressionTime: 3600000 // 1 hour
                }
            },
            low: {
                bestPracticeViolation: {
                    immediate: false,
                    channels: ['console'],
                    escalate: false,
                    suppressionTime: 7200000 // 2 hours
                }
            }
        };
    }

    /**
     * Initialize escalation policies
     */
    initializeEscalationPolicies() {
        return {
            level1: {
                targets: ['development_team', 'agent_coordinators'],
                channels: ['email', 'console'],
                timeoutMinutes: 5
            },
            level2: {
                targets: ['technical_leads', 'senior_developers'],
                channels: ['email', 'phone', 'slack'],
                timeoutMinutes: 10
            },
            level3: {
                targets: ['management', 'architecture_team'],
                channels: ['email', 'phone', 'slack', 'pager'],
                timeoutMinutes: 15
            },
            level4: {
                targets: ['executive_team', 'emergency_contacts'],
                channels: ['phone', 'pager', 'emergency_sms'],
                timeoutMinutes: 30
            }
        };
    }

    /**
     * Initialize notification templates
     */
    initializeNotificationTemplates() {
        return {
            critical_violation: {
                subject: '🚨 CRITICAL ESC VIOLATION - Immediate Action Required',
                template: `
CRITICAL ServiceNow ESC Violation Detected

Agent: {{agentId}}
Violation: {{violationType}}
Severity: CRITICAL
Time: {{timestamp}}

Details:
{{violationDetails}}

IMMEDIATE ACTION REQUIRED:
{{correctionActions}}

This violation may prevent ServiceNow ESC compliance and must be addressed immediately.

Alert ID: {{alertId}}
                `
            },
            high_priority: {
                subject: '⚠️ High Priority ESC Issue - {{violationType}}',
                template: `
High Priority ServiceNow ESC Issue

Agent: {{agentId}}
Issue: {{violationType}}
Severity: HIGH
Time: {{timestamp}}

Details:
{{violationDetails}}

Recommended Actions:
{{recommendedActions}}

Please address this issue to maintain ESC compliance.

Alert ID: {{alertId}}
                `
            },
            performance_alert: {
                subject: '⚡ ESC Performance Alert - {{metricName}}',
                template: `
ServiceNow ESC Performance Alert

Metric: {{metricName}}
Current Value: {{currentValue}}
Threshold: {{threshold}}
Agent: {{agentId}}
Time: {{timestamp}}

Performance Impact:
{{performanceImpact}}

Optimization Suggestions:
{{optimizationSuggestions}}

Alert ID: {{alertId}}
                `
            },
            compliance_summary: {
                subject: '📊 ESC Compliance Summary - {{period}}',
                template: `
ServiceNow ESC Compliance Summary ({{period}})

Overall Compliance Score: {{overallScore}}/100
Active Agents: {{activeAgents}}
Total Violations: {{totalViolations}}
Critical Violations: {{criticalViolations}}

Top Issues:
{{topIssues}}

Trending Improvements:
{{improvements}}

Recommendations:
{{recommendations}}

Report Generated: {{timestamp}}
                `
            }
        };
    }

    /**
     * Start the automated alerts system
     */
    async startAlertSystem() {
        console.log('🚨 Starting ESC Automated Alerts System...');
        this.isActive = true;

        // Initialize alert channels
        await this.initializeAlertChannels();

        // Start alert processing
        await this.startAlertProcessing();

        // Start escalation monitoring
        await this.startEscalationMonitoring();

        // Start periodic reporting
        await this.startPeriodicReporting();

        console.log('✅ Automated alerts system active');
    }

    /**
     * Initialize different alert channels
     */
    async initializeAlertChannels() {
        console.log('📡 Initializing alert channels...');

        // Console channel (always available)
        this.alertChannels.set('console', new ConsoleAlertChannel());

        // Email channel
        this.alertChannels.set('email', new EmailAlertChannel({
            smtpHost: process.env.SMTP_HOST || 'localhost',
            smtpPort: process.env.SMTP_PORT || 587,
            from: process.env.ALERT_FROM_EMAIL || 'esc-alerts@company.com'
        }));

        // Agent message channel
        this.alertChannels.set('agent_message', new AgentMessageChannel());

        // Slack channel (if configured)
        if (process.env.SLACK_WEBHOOK_URL) {
            this.alertChannels.set('slack', new SlackAlertChannel({
                webhookUrl: process.env.SLACK_WEBHOOK_URL,
                channel: process.env.SLACK_CHANNEL || '#esc-alerts'
            }));
        }

        // Security team channel
        this.alertChannels.set('security_team', new SecurityTeamChannel({
            emails: (process.env.SECURITY_EMAILS || '').split(','),
            escalationPhone: process.env.SECURITY_ESCALATION_PHONE
        }));

        console.log(`   📡 ${this.alertChannels.size} alert channels initialized`);
    }

    /**
     * Start alert processing loop
     */
    async startAlertProcessing() {
        setInterval(async () => {
            if (!this.isActive) return;

            try {
                await this.processAlertQueue();
                await this.checkAlertSuppressions();
                await this.updateAlertStatuses();
            } catch (error) {
                console.error('❌ Alert processing error:', error);
            }
        }, 5000); // Every 5 seconds
    }

    /**
     * Start escalation monitoring
     */
    async startEscalationMonitoring() {
        setInterval(async () => {
            if (!this.isActive) return;

            try {
                await this.checkPendingEscalations();
                await this.processEscalations();
            } catch (error) {
                console.error('❌ Escalation monitoring error:', error);
            }
        }, 60000); // Every minute
    }

    /**
     * Start periodic reporting
     */
    async startPeriodicReporting() {
        // Hourly summary
        setInterval(async () => {
            if (!this.isActive) return;
            await this.generateHourlySummary();
        }, 3600000); // Every hour

        // Daily compliance report
        setInterval(async () => {
            if (!this.isActive) return;
            await this.generateDailyComplianceReport();
        }, 86400000); // Every 24 hours

        // Weekly trend analysis
        setInterval(async () => {
            if (!this.isActive) return;
            await this.generateWeeklyTrendReport();
        }, 604800000); // Every 7 days
    }

    /**
     * Trigger alert for ESC violation
     */
    async triggerAlert(violation, context = {}) {
        console.log(`🚨 Triggering alert for ${violation.type} (${violation.severity})`);

        const alert = {
            id: this.generateAlertId(),
            timestamp: new Date().toISOString(),
            type: violation.type,
            severity: violation.severity,
            agentId: context.agentId || 'unknown',
            solutionId: context.solutionId,
            violation: violation,
            context: context,
            status: 'active',
            escalationLevel: 0,
            notificationsSent: [],
            suppressedUntil: null
        };

        // Check if alert should be suppressed
        if (await this.shouldSuppressAlert(alert)) {
            console.log(`   🔇 Alert suppressed: ${alert.id}`);
            return alert;
        }

        // Store alert
        this.activeAlerts.set(alert.id, alert);
        this.alertHistory.push(alert);

        // Get alert rules for this violation
        const rules = this.getAlertRules(violation);

        // Send immediate notifications if required
        if (rules.immediate) {
            await this.sendImmediateNotifications(alert, rules);
        } else {
            await this.queueNotifications(alert, rules);
        }

        // Schedule escalation if required
        if (rules.escalate) {
            await this.scheduleEscalation(alert, rules);
        }

        // Set suppression if configured
        if (rules.suppressionTime > 0) {
            await this.setSuppression(alert, rules.suppressionTime);
        }

        console.log(`   ✅ Alert triggered: ${alert.id}`);
        return alert;
    }

    /**
     * Send immediate notifications for critical alerts
     */
    async sendImmediateNotifications(alert, rules) {
        console.log(`📢 Sending immediate notifications for alert ${alert.id}`);

        for (const channelName of rules.channels) {
            const channel = this.alertChannels.get(channelName);
            if (channel) {
                try {
                    const notification = await this.createNotification(alert, channelName);
                    await channel.sendNotification(notification);
                    
                    alert.notificationsSent.push({
                        channel: channelName,
                        timestamp: new Date().toISOString(),
                        status: 'sent'
                    });
                    
                    console.log(`   ✅ Notification sent via ${channelName}`);
                } catch (error) {
                    console.error(`   ❌ Failed to send notification via ${channelName}:`, error);
                    
                    alert.notificationsSent.push({
                        channel: channelName,
                        timestamp: new Date().toISOString(),
                        status: 'failed',
                        error: error.message
                    });
                }
            }
        }
    }

    /**
     * Create notification content for alert
     */
    async createNotification(alert, channelName) {
        const templateKey = this.getTemplateKey(alert);
        const template = this.notificationTemplates[templateKey];

        if (!template) {
            throw new Error(`No template found for ${templateKey}`);
        }

        // Prepare template variables
        const variables = {
            alertId: alert.id,
            agentId: alert.agentId,
            violationType: alert.type,
            severity: alert.severity.toUpperCase(),
            timestamp: alert.timestamp,
            violationDetails: this.formatViolationDetails(alert.violation),
            correctionActions: this.formatCorrectionActions(alert.violation),
            recommendedActions: this.formatRecommendedActions(alert.violation),
            performanceImpact: this.formatPerformanceImpact(alert.violation),
            optimizationSuggestions: this.formatOptimizationSuggestions(alert.violation)
        };

        // Replace template variables
        const subject = this.replaceTemplateVariables(template.subject, variables);
        const content = this.replaceTemplateVariables(template.template, variables);

        return {
            subject: subject,
            content: content,
            priority: this.mapSeverityToPriority(alert.severity),
            alert: alert,
            channel: channelName
        };
    }

    /**
     * Schedule escalation for unresolved alerts
     */
    async scheduleEscalation(alert, rules) {
        const escalationTime = new Date(Date.now() + rules.escalationTime);
        
        alert.escalationScheduled = escalationTime.toISOString();
        alert.escalationLevel = 1;
        
        console.log(`⏰ Escalation scheduled for alert ${alert.id} at ${escalationTime.toISOString()}`);
    }

    /**
     * Process pending escalations
     */
    async processEscalations() {
        const now = new Date();
        
        for (const alert of this.activeAlerts.values()) {
            if (alert.status !== 'active') continue;
            if (!alert.escalationScheduled) continue;
            
            const escalationTime = new Date(alert.escalationScheduled);
            if (now >= escalationTime) {
                await this.escalateAlert(alert);
            }
        }
    }

    /**
     * Escalate alert to next level
     */
    async escalateAlert(alert) {
        const nextLevel = alert.escalationLevel + 1;
        const policy = this.escalationPolicies[`level${nextLevel}`];
        
        if (!policy) {
            console.warn(`⚠️ No escalation policy for level ${nextLevel}, alert ${alert.id}`);
            return;
        }

        console.log(`📈 Escalating alert ${alert.id} to level ${nextLevel}`);

        // Send escalation notifications
        await this.sendEscalationNotifications(alert, policy);

        // Update alert
        alert.escalationLevel = nextLevel;
        alert.escalationScheduled = new Date(Date.now() + (policy.timeoutMinutes * 60000)).toISOString();

        // Log escalation
        alert.escalationHistory = alert.escalationHistory || [];
        alert.escalationHistory.push({
            level: nextLevel,
            timestamp: new Date().toISOString(),
            policy: policy
        });

        console.log(`   📈 Alert ${alert.id} escalated to level ${nextLevel}`);
    }

    /**
     * Send escalation notifications
     */
    async sendEscalationNotifications(alert, policy) {
        const escalationNotification = {
            subject: `🚨 ESCALATED: ${alert.type} - Level ${alert.escalationLevel + 1}`,
            content: `
ESCALATED ALERT - Level ${alert.escalationLevel + 1}

Original Alert: ${alert.id}
Type: ${alert.type}
Severity: ${alert.severity.toUpperCase()}
Agent: ${alert.agentId}
Original Time: ${alert.timestamp}
Escalation Time: ${new Date().toISOString()}

This alert has been escalated due to lack of response.

Violation Details:
${this.formatViolationDetails(alert.violation)}

Required Actions:
${this.formatCorrectionActions(alert.violation)}

Previous Notifications:
${alert.notificationsSent.map(n => `- ${n.channel}: ${n.status} at ${n.timestamp}`).join('\n')}
            `,
            priority: 'critical',
            alert: alert,
            escalationLevel: alert.escalationLevel + 1
        };

        // Send to escalation channels
        for (const channelName of policy.channels) {
            const channel = this.alertChannels.get(channelName);
            if (channel) {
                try {
                    await channel.sendNotification(escalationNotification);
                    console.log(`   📢 Escalation notification sent via ${channelName}`);
                } catch (error) {
                    console.error(`   ❌ Failed to send escalation via ${channelName}:`, error);
                }
            }
        }
    }

    /**
     * Resolve alert
     */
    async resolveAlert(alertId, resolution = {}) {
        const alert = this.activeAlerts.get(alertId);
        if (!alert) {
            console.warn(`⚠️ Alert ${alertId} not found`);
            return false;
        }

        console.log(`✅ Resolving alert ${alertId}`);

        alert.status = 'resolved';
        alert.resolvedAt = new Date().toISOString();
        alert.resolution = resolution;

        // Send resolution notification
        await this.sendResolutionNotification(alert);

        // Remove from active alerts
        this.activeAlerts.delete(alertId);

        console.log(`   ✅ Alert ${alertId} resolved`);
        return true;
    }

    /**
     * Send resolution notification
     */
    async sendResolutionNotification(alert) {
        const notification = {
            subject: `✅ RESOLVED: ${alert.type} - Alert ${alert.id}`,
            content: `
Alert Resolved

Alert ID: ${alert.id}
Type: ${alert.type}
Severity: ${alert.severity.toUpperCase()}
Agent: ${alert.agentId}
Created: ${alert.timestamp}
Resolved: ${alert.resolvedAt}
Duration: ${this.calculateDuration(alert.timestamp, alert.resolvedAt)}

Resolution:
${alert.resolution.description || 'No description provided'}

Resolved by: ${alert.resolution.resolvedBy || 'System'}
            `,
            priority: 'low',
            alert: alert
        };

        // Send to original notification channels
        const originalChannels = alert.notificationsSent
            .filter(n => n.status === 'sent')
            .map(n => n.channel);

        for (const channelName of [...new Set(originalChannels)]) {
            const channel = this.alertChannels.get(channelName);
            if (channel) {
                try {
                    await channel.sendNotification(notification);
                } catch (error) {
                    console.error(`❌ Failed to send resolution notification via ${channelName}:`, error);
                }
            }
        }
    }

    /**
     * Generate daily compliance report
     */
    async generateDailyComplianceReport() {
        console.log('📊 Generating daily ESC compliance report...');

        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const dayAlerts = this.alertHistory.filter(alert => 
            new Date(alert.timestamp) >= yesterday);

        const report = {
            period: 'Last 24 Hours',
            timestamp: now.toISOString(),
            summary: {
                totalAlerts: dayAlerts.length,
                criticalAlerts: dayAlerts.filter(a => a.severity === 'critical').length,
                highAlerts: dayAlerts.filter(a => a.severity === 'high').length,
                resolvedAlerts: dayAlerts.filter(a => a.status === 'resolved').length,
                activeAlerts: this.activeAlerts.size
            },
            topViolations: this.getTopViolations(dayAlerts),
            agentPerformance: this.getAgentPerformance(dayAlerts),
            trends: this.analyzeTrends(dayAlerts),
            recommendations: this.generateRecommendations(dayAlerts)
        };

        // Send report
        await this.sendComplianceReport(report);

        console.log('   📊 Daily compliance report sent');
    }

    /**
     * Generate weekly trend report
     */
    async generateWeeklyTrendReport() {
        console.log('📈 Generating weekly ESC trend report...');

        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const weekAlerts = this.alertHistory.filter(alert => 
            new Date(alert.timestamp) >= weekAgo);

        const report = {
            period: 'Last 7 Days',
            timestamp: now.toISOString(),
            trends: {
                alertTrend: this.calculateAlertTrend(weekAlerts),
                complianceTrend: this.calculateComplianceTrend(weekAlerts),
                violationTrend: this.calculateViolationTrend(weekAlerts)
            },
            improvements: this.identifyImprovements(weekAlerts),
            concerns: this.identifyConcerns(weekAlerts),
            actionItems: this.generateActionItems(weekAlerts)
        };

        await this.sendTrendReport(report);

        console.log('   📈 Weekly trend report sent');
    }

    // Helper methods
    generateAlertId() {
        return 'alert_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getAlertRules(violation) {
        const severityRules = this.alertRules[violation.severity] || {};
        return severityRules[violation.type] || severityRules.default || {};
    }

    async shouldSuppressAlert(alert) {
        const suppressionKey = `${alert.type}_${alert.agentId}`;
        const suppression = this.suppressionRules.get(suppressionKey);
        
        if (suppression && new Date() < new Date(suppression.until)) {
            return true;
        }
        
        return false;
    }

    async setSuppression(alert, suppressionTime) {
        const suppressionKey = `${alert.type}_${alert.agentId}`;
        const until = new Date(Date.now() + suppressionTime);
        
        this.suppressionRules.set(suppressionKey, {
            alertId: alert.id,
            until: until.toISOString(),
            reason: 'Automatic suppression'
        });
        
        alert.suppressedUntil = until.toISOString();
    }

    getTemplateKey(alert) {
        if (alert.severity === 'critical') return 'critical_violation';
        if (alert.severity === 'high') return 'high_priority';
        if (alert.type.includes('performance')) return 'performance_alert';
        return 'high_priority';
    }

    replaceTemplateVariables(template, variables) {
        let result = template;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, value || 'N/A');
        }
        return result;
    }

    formatViolationDetails(violation) {
        return `Type: ${violation.type}\nMessage: ${violation.message}\nActual: ${violation.actual || 'N/A'}\nLimit: ${violation.limit || 'N/A'}`;
    }

    formatCorrectionActions(violation) {
        return violation.correction || 'Please review the violation and apply appropriate corrections.';
    }

    formatRecommendedActions(violation) {
        return violation.suggestion || 'Follow ESC best practices to prevent similar issues.';
    }

    formatPerformanceImpact(violation) {
        return violation.performanceImpact || 'May impact form load times and user experience.';
    }

    formatOptimizationSuggestions(violation) {
        return violation.optimizationSuggestions || 'Optimize variable count and query performance.';
    }

    mapSeverityToPriority(severity) {
        const mapping = {
            'critical': 'critical',
            'high': 'high',
            'medium': 'medium',
            'low': 'low'
        };
        return mapping[severity] || 'medium';
    }

    calculateDuration(start, end) {
        const duration = new Date(end) - new Date(start);
        const minutes = Math.floor(duration / 60000);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        }
        return `${minutes}m`;
    }

    // Placeholder methods for reporting
    getTopViolations(alerts) { return []; }
    getAgentPerformance(alerts) { return {}; }
    analyzeTrends(alerts) { return {}; }
    generateRecommendations(alerts) { return []; }
    calculateAlertTrend(alerts) { return 'stable'; }
    calculateComplianceTrend(alerts) { return 'improving'; }
    calculateViolationTrend(alerts) { return 'decreasing'; }
    identifyImprovements(alerts) { return []; }
    identifyConcerns(alerts) { return []; }
    generateActionItems(alerts) { return []; }
    async sendComplianceReport(report) { console.log('📧 Compliance report sent'); }
    async sendTrendReport(report) { console.log('📧 Trend report sent'); }
    async queueNotifications(alert, rules) { console.log(`📋 Notifications queued for ${alert.id}`); }
    async processAlertQueue() { /* Process queued notifications */ }
    async checkAlertSuppressions() { /* Check and remove expired suppressions */ }
    async updateAlertStatuses() { /* Update alert statuses */ }
    async checkPendingEscalations() { /* Check for pending escalations */ }
    async generateHourlySummary() { console.log('📊 Hourly summary generated'); }
}

/**
 * Console Alert Channel
 */
class ConsoleAlertChannel {
    async sendNotification(notification) {
        const severity = notification.alert.severity.toUpperCase();
        const timestamp = new Date().toLocaleString();
        
        console.log(`\n${'='.repeat(80)}`);
        console.log(`🚨 ESC ALERT [${severity}] - ${timestamp}`);
        console.log(`${'='.repeat(80)}`);
        console.log(`Subject: ${notification.subject}`);
        console.log(`Alert ID: ${notification.alert.id}`);
        console.log(`Agent: ${notification.alert.agentId}`);
        console.log(`\nDetails:`);
        console.log(notification.content);
        console.log(`${'='.repeat(80)}\n`);
    }
}

/**
 * Email Alert Channel
 */
class EmailAlertChannel {
    constructor(config) {
        this.config = config;
    }

    async sendNotification(notification) {
        // In a real implementation, this would send actual emails
        console.log(`📧 Email notification sent: ${notification.subject}`);
        console.log(`   To: ${this.getRecipients(notification)}`);
        console.log(`   Priority: ${notification.priority}`);
    }

    getRecipients(notification) {
        // Determine recipients based on alert type and severity
        const recipients = ['dev-team@company.com'];
        
        if (notification.alert.severity === 'critical') {
            recipients.push('tech-leads@company.com');
        }
        
        return recipients.join(', ');
    }
}

/**
 * Agent Message Channel
 */
class AgentMessageChannel {
    async sendNotification(notification) {
        // Send message to the specific agent
        console.log(`🤖 Agent message sent to ${notification.alert.agentId}: ${notification.subject}`);
        
        // In a real implementation, this would use the agent coordination system
        // to send direct messages to the agent
    }
}

/**
 * Slack Alert Channel
 */
class SlackAlertChannel {
    constructor(config) {
        this.config = config;
    }

    async sendNotification(notification) {
        // In a real implementation, this would send to Slack webhook
        console.log(`💬 Slack notification sent to ${this.config.channel}: ${notification.subject}`);
    }
}

/**
 * Security Team Channel
 */
class SecurityTeamChannel {
    constructor(config) {
        this.config = config;
    }

    async sendNotification(notification) {
        console.log(`🔒 Security team notification: ${notification.subject}`);
        
        // For critical security violations, also log to security system
        if (notification.alert.severity === 'critical') {
            console.log(`🚨 CRITICAL SECURITY ALERT logged to security system`);
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ESCAutomatedAlerts;
}

/**
 * USAGE EXAMPLE:
 * 
 * const alertSystem = new ESCAutomatedAlerts();
 * await alertSystem.startAlertSystem();
 * 
 * // Trigger an alert
 * await alertSystem.triggerAlert({
 *     type: 'variableCountExceeded',
 *     severity: 'critical',
 *     message: 'Catalog item has 120 variables',
 *     actual: 120,
 *     limit: 100
 * }, {
 *     agentId: 'catalog_agent_1',
 *     solutionId: 'laptop_request_v2'
 * });
 */