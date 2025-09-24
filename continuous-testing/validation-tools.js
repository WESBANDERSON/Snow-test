/**
 * ServiceNow ESC Technical Validation Tools
 * 
 * Comprehensive suite of technical validation tools for ensuring
 * ServiceNow ESC compliance at the code and configuration level.
 */

class ESCValidationTools {
    constructor() {
        this.validationRules = this.loadValidationRules();
        this.cache = new Map();
        this.validationHistory = [];
        this.customValidators = new Map();
    }

    /**
     * Load all ESC validation rules
     */
    loadValidationRules() {
        return {
            catalogItem: {
                maxVariables: 100,
                recommendedVariables: 75,
                requiredFields: ['name', 'short_description', 'category'],
                forbiddenItemDesignerFeatures: ['ui_policy', 'client_script', 'complex_approval'],
                userCriteriaLevel: 'item'
            },
            performance: {
                maxFormLoadTime: 5000,
                maxQueryExecutionTime: 2000,
                maxMemoryUsage: 512,
                maxCPUUsage: 80,
                recommendedIndexes: ['sys_id', 'active', 'category', 'state']
            },
            security: {
                requiredACL: true,
                encryptionRequired: ['ssn', 'credit_card', 'password', 'api_key'],
                forbiddenACLPatterns: ['gs.nil()', 'true', 'answer == "yes"'],
                maxACLComplexity: 10
            },
            integration: {
                maxTablesPerPipeline: 250,
                requiredColumns: ['sys_id'],
                forbiddenCharacters: ['$', '#', '@'],
                maxRetryAttempts: 3,
                requiredErrorHandling: true
            },
            architecture: {
                maxCustomizationLevel: 70,
                requiredUpdateSets: true,
                forbiddenDirectProductionChanges: true,
                recommendedDocumentation: ['README', 'CHANGELOG', 'API_DOCS']
            }
        };
    }

    /**
     * Comprehensive validation of catalog item configuration
     */
    async validateCatalogItem(catalogItemConfig) {
        console.log('📋 Validating catalog item configuration...');
        
        const validation = {
            itemName: catalogItemConfig.name || 'Unknown',
            timestamp: new Date().toISOString(),
            compliant: true,
            score: 100,
            violations: [],
            warnings: [],
            recommendations: []
        };

        try {
            // Core validation checks
            await this.validateVariableCount(catalogItemConfig, validation);
            await this.validateUserCriteria(catalogItemConfig, validation);
            await this.validateItemDesignerUsage(catalogItemConfig, validation);
            await this.validateRequiredFields(catalogItemConfig, validation);
            await this.validateVariableConfiguration(catalogItemConfig, validation);
            await this.validateApprovalWorkflow(catalogItemConfig, validation);
            await this.validatePerformanceImpact(catalogItemConfig, validation);
            
            // Calculate final score
            this.calculateValidationScore(validation);
            
            // Cache results
            this.cache.set(`catalog_item_${catalogItemConfig.name}`, validation);
            
            console.log(`   ✅ Catalog item validation complete: ${validation.score}/100`);
            
        } catch (error) {
            validation.compliant = false;
            validation.violations.push({
                type: 'validation_error',
                severity: 'critical',
                message: `Validation failed: ${error.message}`
            });
            console.error('❌ Catalog item validation error:', error);
        }

        return validation;
    }

    /**
     * Validate variable count against ESC limits
     */
    async validateVariableCount(config, validation) {
        const variableCount = config.variables ? config.variables.length : 0;
        const rules = this.validationRules.catalogItem;

        if (variableCount > rules.maxVariables) {
            validation.violations.push({
                type: 'variable_count_exceeded',
                severity: 'critical',
                actual: variableCount,
                limit: rules.maxVariables,
                message: `Variable count ${variableCount} exceeds ESC limit of ${rules.maxVariables}`,
                correction: 'Reduce variables or split into multiple catalog items'
            });
            validation.compliant = false;
        } else if (variableCount > rules.recommendedVariables) {
            validation.warnings.push({
                type: 'variable_count_high',
                severity: 'medium',
                actual: variableCount,
                recommended: rules.recommendedVariables,
                message: `Variable count ${variableCount} exceeds recommended limit of ${rules.recommendedVariables}`,
                suggestion: 'Consider optimizing variable count for better performance'
            });
        }

        // Analyze variable complexity
        if (config.variables) {
            const complexVariables = this.analyzeVariableComplexity(config.variables);
            if (complexVariables.length > 0) {
                validation.warnings.push({
                    type: 'complex_variables',
                    severity: 'low',
                    count: complexVariables.length,
                    variables: complexVariables,
                    message: `${complexVariables.length} variables have complex configurations that may impact performance`
                });
            }
        }
    }

    /**
     * Validate user criteria configuration
     */
    async validateUserCriteria(config, validation) {
        const rules = this.validationRules.catalogItem;

        // Check if user criteria is configured
        if (!config.user_criteria && !config.userCriteria) {
            validation.warnings.push({
                type: 'missing_user_criteria',
                severity: 'medium',
                message: 'No user criteria configured - catalog item will be visible to all users',
                suggestion: 'Configure appropriate user criteria to control access'
            });
            return;
        }

        // Check user criteria level
        const criteriaLevel = config.user_criteria_level || config.userCriteriaLevel;
        if (criteriaLevel && criteriaLevel !== rules.userCriteriaLevel) {
            validation.violations.push({
                type: 'invalid_user_criteria_level',
                severity: 'critical',
                actual: criteriaLevel,
                required: rules.userCriteriaLevel,
                message: `User criteria configured at ${criteriaLevel} level instead of ${rules.userCriteriaLevel} level`,
                correction: 'Configure user criteria at item level only'
            });
            validation.compliant = false;
        }

        // Validate user criteria syntax
        const userCriteria = config.user_criteria || config.userCriteria;
        if (userCriteria && typeof userCriteria === 'string') {
            const criteriaValidation = this.validateUserCriteriaSyntax(userCriteria);
            if (!criteriaValidation.valid) {
                validation.violations.push({
                    type: 'invalid_user_criteria_syntax',
                    severity: 'high',
                    message: `Invalid user criteria syntax: ${criteriaValidation.error}`,
                    correction: 'Fix user criteria syntax according to ServiceNow standards'
                });
            }
        }
    }

    /**
     * Validate Item Designer usage against limitations
     */
    async validateItemDesignerUsage(config, validation) {
        const rules = this.validationRules.catalogItem;
        const creationMethod = config.creation_method || config.creationMethod;

        if (creationMethod === 'item_designer') {
            // Check for features not supported by Item Designer
            const unsupportedFeatures = [];

            if (config.ui_policies || config.uiPolicies) {
                unsupportedFeatures.push('UI Policies');
            }
            if (config.client_scripts || config.clientScripts) {
                unsupportedFeatures.push('Client Scripts');
            }
            if (config.complex_approval || this.hasComplexApproval(config)) {
                unsupportedFeatures.push('Complex Approval Logic');
            }
            if (config.backend_variables || this.hasBackendVariables(config)) {
                unsupportedFeatures.push('Backend Variables');
            }

            if (unsupportedFeatures.length > 0) {
                validation.violations.push({
                    type: 'item_designer_limitation',
                    severity: 'critical',
                    unsupportedFeatures: unsupportedFeatures,
                    message: `Item Designer does not support: ${unsupportedFeatures.join(', ')}`,
                    correction: 'Use traditional catalog item creation method for complex requirements'
                });
                validation.compliant = false;
            }

            // Warn about Item Designer limitations
            validation.recommendations.push({
                type: 'item_designer_considerations',
                message: 'Item Designer has limitations - consider traditional approach for complex requirements',
                details: [
                    'No UI Policies support',
                    'No Client Scripts support', 
                    'Limited approval configuration',
                    'Direct production deployment (no update sets)'
                ]
            });
        }
    }

    /**
     * Validate required fields
     */
    async validateRequiredFields(config, validation) {
        const rules = this.validationRules.catalogItem;

        for (const field of rules.requiredFields) {
            if (!config[field] || config[field].trim() === '') {
                validation.violations.push({
                    type: 'missing_required_field',
                    severity: 'high',
                    field: field,
                    message: `Required field '${field}' is missing or empty`,
                    correction: `Provide a value for the '${field}' field`
                });
            }
        }

        // Validate field content quality
        if (config.short_description && config.short_description.length > 160) {
            validation.warnings.push({
                type: 'long_short_description',
                severity: 'low',
                actual: config.short_description.length,
                recommended: 160,
                message: 'Short description is longer than recommended (160 characters)',
                suggestion: 'Keep short description concise for better user experience'
            });
        }
    }

    /**
     * Validate variable configuration
     */
    async validateVariableConfiguration(config, validation) {
        if (!config.variables || !Array.isArray(config.variables)) {
            return;
        }

        const variableNames = new Set();
        const mandatoryVariables = [];

        for (let i = 0; i < config.variables.length; i++) {
            const variable = config.variables[i];
            
            // Check for duplicate variable names
            if (variableNames.has(variable.name)) {
                validation.violations.push({
                    type: 'duplicate_variable_name',
                    severity: 'high',
                    variableName: variable.name,
                    message: `Duplicate variable name: ${variable.name}`,
                    correction: 'Ensure all variable names are unique'
                });
            }
            variableNames.add(variable.name);

            // Validate variable naming convention
            if (!this.isValidVariableName(variable.name)) {
                validation.warnings.push({
                    type: 'invalid_variable_naming',
                    severity: 'low',
                    variableName: variable.name,
                    message: `Variable name '${variable.name}' doesn't follow recommended naming convention`,
                    suggestion: 'Use descriptive names with prefixes (req_, opt_, int_)'
                });
            }

            // Check mandatory variables
            if (variable.mandatory) {
                mandatoryVariables.push(variable.name);
            }

            // Validate variable type configuration
            this.validateVariableType(variable, validation, i);
        }

        // Check for reasonable number of mandatory variables
        if (mandatoryVariables.length > 20) {
            validation.warnings.push({
                type: 'too_many_mandatory_variables',
                severity: 'medium',
                count: mandatoryVariables.length,
                message: `${mandatoryVariables.length} mandatory variables may overwhelm users`,
                suggestion: 'Review if all mandatory fields are truly required'
            });
        }
    }

    /**
     * Validate individual variable type configuration
     */
    validateVariableType(variable, validation, index) {
        switch (variable.type) {
            case 'string':
                if (variable.max_length && variable.max_length > 4000) {
                    validation.warnings.push({
                        type: 'excessive_string_length',
                        severity: 'low',
                        variableName: variable.name,
                        maxLength: variable.max_length,
                        message: `Variable '${variable.name}' allows strings longer than 4000 characters`,
                        suggestion: 'Consider if such long strings are necessary'
                    });
                }
                break;

            case 'select':
                if (!variable.options || variable.options.length === 0) {
                    validation.violations.push({
                        type: 'select_without_options',
                        severity: 'high',
                        variableName: variable.name,
                        message: `Select variable '${variable.name}' has no options defined`,
                        correction: 'Define options for select variables'
                    });
                }
                break;

            case 'reference':
                if (!variable.reference) {
                    validation.violations.push({
                        type: 'reference_without_table',
                        severity: 'high',
                        variableName: variable.name,
                        message: `Reference variable '${variable.name}' has no reference table defined`,
                        correction: 'Specify the reference table for reference variables'
                    });
                }
                break;
        }
    }

    /**
     * Validate approval workflow configuration
     */
    async validateApprovalWorkflow(config, validation) {
        if (!config.workflow && !config.approval) {
            return;
        }

        const workflow = config.workflow || config.approval;

        // Check for complex approval logic in Item Designer
        if (config.creation_method === 'item_designer' && this.hasComplexApproval(workflow)) {
            validation.violations.push({
                type: 'complex_approval_in_item_designer',
                severity: 'critical',
                message: 'Complex approval logic not supported in Item Designer',
                correction: 'Use Flow Designer for complex approval workflows'
            });
            validation.compliant = false;
        }

        // Validate approval configuration
        if (workflow.approval_required) {
            if (!workflow.approval_conditions && !workflow.approver && !workflow.approval_group) {
                validation.violations.push({
                    type: 'approval_without_approver',
                    severity: 'high',
                    message: 'Approval required but no approver or approval conditions defined',
                    correction: 'Define approval conditions, approver, or approval group'
                });
            }
        }

        // Check for approval timeout
        if (workflow.approval_timeout && workflow.approval_timeout > 168) { // 1 week
            validation.warnings.push({
                type: 'long_approval_timeout',
                severity: 'low',
                timeout: workflow.approval_timeout,
                message: `Approval timeout of ${workflow.approval_timeout} hours may be too long`,
                suggestion: 'Consider shorter approval timeouts for better user experience'
            });
        }
    }

    /**
     * Validate performance impact
     */
    async validatePerformanceImpact(config, validation) {
        let performanceScore = 100;
        const performanceIssues = [];

        // Variable count impact
        const variableCount = config.variables ? config.variables.length : 0;
        if (variableCount > 75) {
            const impact = Math.min(30, (variableCount - 75) * 2);
            performanceScore -= impact;
            performanceIssues.push(`High variable count (${variableCount}) may slow form loading`);
        }

        // Reference variable impact
        const referenceVariables = this.countReferenceVariables(config);
        if (referenceVariables > 10) {
            const impact = Math.min(20, (referenceVariables - 10) * 2);
            performanceScore -= impact;
            performanceIssues.push(`Many reference variables (${referenceVariables}) may impact performance`);
        }

        // Complex variable configurations
        const complexVariables = this.analyzeVariableComplexity(config.variables || []);
        if (complexVariables.length > 5) {
            performanceScore -= 10;
            performanceIssues.push(`Complex variable configurations may slow form rendering`);
        }

        // Report performance concerns
        if (performanceScore < 80) {
            validation.warnings.push({
                type: 'performance_concern',
                severity: 'medium',
                score: performanceScore,
                issues: performanceIssues,
                message: `Catalog item may have performance issues (score: ${performanceScore}/100)`,
                suggestion: 'Optimize variable count and complexity for better performance'
            });
        }

        validation.performanceScore = performanceScore;
    }

    /**
     * Validate JavaScript/server-side code for ESC compliance
     */
    async validateServerSideCode(code, context = 'business_rule') {
        console.log(`🔍 Validating server-side code for ${context}...`);
        
        const validation = {
            context: context,
            timestamp: new Date().toISOString(),
            compliant: true,
            violations: [],
            warnings: [],
            suggestions: []
        };

        try {
            // Parse the code for analysis
            const codeAnalysis = this.analyzeCode(code);
            
            // Check for ESC-specific violations
            await this.checkDatabaseQueryOptimization(codeAnalysis, validation);
            await this.checkPerformancePatterns(codeAnalysis, validation);
            await this.checkSecurityPatterns(codeAnalysis, validation);
            await this.checkErrorHandling(codeAnalysis, validation);
            await this.checkESCBestPractices(codeAnalysis, validation);
            
            console.log(`   ✅ Server-side code validation complete: ${validation.violations.length} violations`);
            
        } catch (error) {
            validation.compliant = false;
            validation.violations.push({
                type: 'code_analysis_error',
                severity: 'high',
                message: `Code analysis failed: ${error.message}`
            });
        }

        return validation;
    }

    /**
     * Analyze code structure and patterns
     */
    analyzeCode(code) {
        return {
            glideRecordQueries: this.findGlideRecordQueries(code),
            performancePatterns: this.findPerformancePatterns(code),
            securityPatterns: this.findSecurityPatterns(code),
            errorHandling: this.findErrorHandling(code),
            apiCalls: this.findAPICalls(code),
            loops: this.findLoops(code),
            functions: this.findFunctions(code)
        };
    }

    /**
     * Check database query optimization
     */
    async checkDatabaseQueryOptimization(analysis, validation) {
        for (const query of analysis.glideRecordQueries) {
            // Check for missing query filters
            if (!query.hasFilters) {
                validation.violations.push({
                    type: 'unfiltered_query',
                    severity: 'high',
                    line: query.line,
                    message: 'GlideRecord query without filters may impact performance',
                    correction: 'Add appropriate query filters'
                });
            }

            // Check for missing query limits
            if (!query.hasLimit && query.table !== 'sys_properties') {
                validation.warnings.push({
                    type: 'unlimited_query',
                    severity: 'medium',
                    line: query.line,
                    table: query.table,
                    message: `Query on ${query.table} without limit may return too many records`,
                    suggestion: 'Consider adding setLimit() for better performance'
                });
            }

            // Check for inefficient query patterns
            if (query.hasOrderBy && !query.hasLimit) {
                validation.warnings.push({
                    type: 'orderby_without_limit',
                    severity: 'medium',
                    line: query.line,
                    message: 'ORDER BY without LIMIT may cause performance issues',
                    suggestion: 'Add setLimit() when using orderBy()'
                });
            }
        }
    }

    /**
     * Check performance patterns
     */
    async checkPerformancePatterns(analysis, validation) {
        // Check for nested loops with database queries
        for (const loop of analysis.loops) {
            if (loop.containsGlideRecord) {
                validation.violations.push({
                    type: 'query_in_loop',
                    severity: 'critical',
                    line: loop.line,
                    message: 'Database query inside loop can cause severe performance issues',
                    correction: 'Move query outside loop or use batch processing'
                });
            }
        }

        // Check for synchronous API calls
        for (const apiCall of analysis.apiCalls) {
            if (apiCall.synchronous) {
                validation.warnings.push({
                    type: 'synchronous_api_call',
                    severity: 'medium',
                    line: apiCall.line,
                    message: 'Synchronous API call may block form processing',
                    suggestion: 'Consider asynchronous processing for API calls'
                });
            }
        }
    }

    /**
     * Check security patterns
     */
    async checkSecurityPatterns(analysis, validation) {
        // Check for hardcoded credentials
        if (analysis.securityPatterns.hardcodedCredentials.length > 0) {
            validation.violations.push({
                type: 'hardcoded_credentials',
                severity: 'critical',
                occurrences: analysis.securityPatterns.hardcodedCredentials.length,
                message: 'Hardcoded credentials detected in code',
                correction: 'Use encrypted system properties for credentials'
            });
        }

        // Check for SQL injection vulnerabilities
        if (analysis.securityPatterns.sqlInjectionRisk.length > 0) {
            validation.violations.push({
                type: 'sql_injection_risk',
                severity: 'high',
                occurrences: analysis.securityPatterns.sqlInjectionRisk.length,
                message: 'Potential SQL injection vulnerability detected',
                correction: 'Use parameterized queries and input validation'
            });
        }

        // Check for XSS vulnerabilities
        if (analysis.securityPatterns.xssRisk.length > 0) {
            validation.violations.push({
                type: 'xss_risk',
                severity: 'high',
                occurrences: analysis.securityPatterns.xssRisk.length,
                message: 'Potential XSS vulnerability detected',
                correction: 'Properly encode output and validate input'
            });
        }
    }

    /**
     * Check error handling
     */
    async checkErrorHandling(analysis, validation) {
        // Check for try-catch blocks
        const hasTryCatch = analysis.errorHandling.tryCatchBlocks > 0;
        const hasRiskyOperations = analysis.apiCalls.length > 0 || 
                                 analysis.glideRecordQueries.some(q => q.table.startsWith('u_'));

        if (hasRiskyOperations && !hasTryCatch) {
            validation.warnings.push({
                type: 'missing_error_handling',
                severity: 'medium',
                message: 'Code performs risky operations without error handling',
                suggestion: 'Add try-catch blocks around API calls and custom table operations'
            });
        }
    }

    /**
     * Check ESC-specific best practices
     */
    async checkESCBestPractices(analysis, validation) {
        // Check for variable count validation
        const hasVariableCountCheck = this.hasVariableCountValidation(analysis);
        if (!hasVariableCountCheck) {
            validation.suggestions.push({
                type: 'add_variable_count_validation',
                message: 'Consider adding variable count validation for ESC compliance',
                example: 'if (current.variables.length > 100) { /* handle violation */ }'
            });
        }

        // Check for performance monitoring
        const hasPerformanceMonitoring = this.hasPerformanceMonitoring(analysis);
        if (!hasPerformanceMonitoring) {
            validation.suggestions.push({
                type: 'add_performance_monitoring',
                message: 'Consider adding performance monitoring for ESC compliance',
                example: 'var startTime = new GlideDateTime(); /* ... */ logPerformance(startTime);'
            });
        }
    }

    /**
     * Validate integration configuration
     */
    async validateIntegrationConfig(integrationConfig) {
        console.log('🔗 Validating integration configuration...');
        
        const validation = {
            integrationName: integrationConfig.name || 'Unknown',
            timestamp: new Date().toISOString(),
            compliant: true,
            violations: [],
            warnings: [],
            recommendations: []
        };

        try {
            await this.validateTableLimits(integrationConfig, validation);
            await this.validateTableStructure(integrationConfig, validation);
            await this.validateErrorHandlingConfig(integrationConfig, validation);
            await this.validateRetryLogic(integrationConfig, validation);
            await this.validateRateLimiting(integrationConfig, validation);
            
            console.log(`   ✅ Integration validation complete: ${validation.violations.length} violations`);
            
        } catch (error) {
            validation.compliant = false;
            validation.violations.push({
                type: 'integration_validation_error',
                severity: 'critical',
                message: `Integration validation failed: ${error.message}`
            });
        }

        return validation;
    }

    /**
     * Validate table limits for integration
     */
    async validateTableLimits(config, validation) {
        const rules = this.validationRules.integration;
        const tableCount = config.tables ? config.tables.length : 0;

        if (tableCount > rules.maxTablesPerPipeline) {
            validation.violations.push({
                type: 'table_limit_exceeded',
                severity: 'critical',
                actual: tableCount,
                limit: rules.maxTablesPerPipeline,
                message: `Integration processes ${tableCount} tables, exceeding limit of ${rules.maxTablesPerPipeline}`,
                correction: 'Reduce table count or split into multiple integrations'
            });
            validation.compliant = false;
        }
    }

    /**
     * Validate table structure requirements
     */
    async validateTableStructure(config, validation) {
        const rules = this.validationRules.integration;

        if (config.tables) {
            for (const table of config.tables) {
                // Check for required sys_id column
                if (!table.columns || !table.columns.includes('sys_id')) {
                    validation.violations.push({
                        type: 'missing_sys_id_column',
                        severity: 'critical',
                        tableName: table.name,
                        message: `Table '${table.name}' lacks required sys_id column`,
                        correction: 'Add sys_id column to table structure'
                    });
                    validation.compliant = false;
                }

                // Check for forbidden characters in table/column names
                if (this.containsForbiddenChars(table.name, rules.forbiddenCharacters)) {
                    validation.violations.push({
                        type: 'forbidden_characters_in_name',
                        severity: 'high',
                        tableName: table.name,
                        forbiddenChars: rules.forbiddenCharacters,
                        message: `Table name '${table.name}' contains forbidden characters`,
                        correction: 'Remove forbidden characters from table name'
                    });
                }

                // Check column names
                if (table.columns) {
                    for (const column of table.columns) {
                        if (this.containsForbiddenChars(column, rules.forbiddenCharacters)) {
                            validation.violations.push({
                                type: 'forbidden_characters_in_column',
                                severity: 'high',
                                tableName: table.name,
                                columnName: column,
                                message: `Column '${column}' in table '${table.name}' contains forbidden characters`,
                                correction: 'Remove forbidden characters from column name'
                            });
                        }
                    }
                }
            }
        }
    }

    /**
     * Calculate validation score
     */
    calculateValidationScore(validation) {
        let score = 100;

        for (const violation of validation.violations) {
            switch (violation.severity) {
                case 'critical':
                    score -= 25;
                    break;
                case 'high':
                    score -= 15;
                    break;
                case 'medium':
                    score -= 10;
                    break;
                case 'low':
                    score -= 5;
                    break;
            }
        }

        for (const warning of validation.warnings) {
            score -= 3;
        }

        validation.score = Math.max(0, score);
        validation.compliant = validation.compliant && score >= 80;
    }

    // Helper methods for code analysis
    findGlideRecordQueries(code) {
        const queries = [];
        const lines = code.split('\n');
        
        lines.forEach((line, index) => {
            if (line.includes('new GlideRecord')) {
                const tableMatch = line.match(/new GlideRecord\(['"]([^'"]+)['"]\)/);
                queries.push({
                    line: index + 1,
                    table: tableMatch ? tableMatch[1] : 'unknown',
                    hasFilters: this.checkForFilters(lines, index),
                    hasLimit: this.checkForLimit(lines, index),
                    hasOrderBy: this.checkForOrderBy(lines, index)
                });
            }
        });
        
        return queries;
    }

    findPerformancePatterns(code) {
        return {
            nestedLoops: this.findNestedLoops(code),
            recursiveFunctions: this.findRecursiveFunctions(code),
            heavyOperations: this.findHeavyOperations(code)
        };
    }

    findSecurityPatterns(code) {
        return {
            hardcodedCredentials: this.findHardcodedCredentials(code),
            sqlInjectionRisk: this.findSQLInjectionRisks(code),
            xssRisk: this.findXSSRisks(code)
        };
    }

    findErrorHandling(code) {
        const tryCatchCount = (code.match(/try\s*{/g) || []).length;
        return {
            tryCatchBlocks: tryCatchCount,
            hasGlobalErrorHandler: code.includes('gs.error') || code.includes('gs.warn')
        };
    }

    findAPICalls(code) {
        const apiCalls = [];
        const patterns = [
            /new sn_ws\.RESTMessageV2/g,
            /gs\.include/g,
            /new XMLHttpRequest/g
        ];

        patterns.forEach(pattern => {
            const matches = code.match(pattern);
            if (matches) {
                apiCalls.push(...matches.map(match => ({
                    type: match,
                    synchronous: !code.includes('async') && !code.includes('callback')
                })));
            }
        });

        return apiCalls;
    }

    findLoops(code) {
        const loops = [];
        const lines = code.split('\n');
        
        lines.forEach((line, index) => {
            if (line.match(/for\s*\(|while\s*\(|\.forEach\(/)) {
                loops.push({
                    line: index + 1,
                    type: line.includes('for') ? 'for' : line.includes('while') ? 'while' : 'forEach',
                    containsGlideRecord: this.checkForGlideRecordInBlock(lines, index)
                });
            }
        });
        
        return loops;
    }

    // Additional helper methods
    analyzeVariableComplexity(variables) {
        return variables.filter(variable => {
            return variable.type === 'reference' ||
                   (variable.type === 'select' && variable.options && variable.options.length > 20) ||
                   variable.relevant_condition ||
                   variable.readonly_condition;
        });
    }

    countReferenceVariables(config) {
        if (!config.variables) return 0;
        return config.variables.filter(v => v.type === 'reference').length;
    }

    isValidVariableName(name) {
        // Check for recommended naming patterns
        const patterns = [/^req_/, /^opt_/, /^int_/, /^sys_/];
        return patterns.some(pattern => pattern.test(name)) || 
               /^[a-z][a-z0-9_]*$/.test(name);
    }

    hasComplexApproval(workflow) {
        if (!workflow) return false;
        return workflow.approval_conditions && workflow.approval_conditions.length > 1 ||
               workflow.dynamic_approver ||
               workflow.escalation_rules;
    }

    hasBackendVariables(config) {
        if (!config.variables) return false;
        return config.variables.some(v => v.backend_only || v.fulfiller_only);
    }

    validateUserCriteriaSyntax(criteria) {
        // Basic syntax validation for user criteria
        try {
            // Check for common syntax errors
            if (criteria.includes('=') && !criteria.includes('role=') && !criteria.includes('group=')) {
                return { valid: false, error: 'Invalid criteria format' };
            }
            return { valid: true };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }

    containsForbiddenChars(name, forbiddenChars) {
        return forbiddenChars.some(char => name.includes(char));
    }

    // Code analysis helper methods
    checkForFilters(lines, startIndex) {
        for (let i = startIndex; i < Math.min(startIndex + 10, lines.length); i++) {
            if (lines[i].includes('.addQuery') || lines[i].includes('.addEncodedQuery')) {
                return true;
            }
        }
        return false;
    }

    checkForLimit(lines, startIndex) {
        for (let i = startIndex; i < Math.min(startIndex + 10, lines.length); i++) {
            if (lines[i].includes('.setLimit')) {
                return true;
            }
        }
        return false;
    }

    checkForOrderBy(lines, startIndex) {
        for (let i = startIndex; i < Math.min(startIndex + 10, lines.length); i++) {
            if (lines[i].includes('.orderBy')) {
                return true;
            }
        }
        return false;
    }

    checkForGlideRecordInBlock(lines, startIndex) {
        let braceCount = 0;
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            braceCount += (line.match(/{/g) || []).length;
            braceCount -= (line.match(/}/g) || []).length;
            
            if (braceCount === 0 && i > startIndex) break;
            
            if (line.includes('new GlideRecord')) {
                return true;
            }
        }
        return false;
    }

    hasVariableCountValidation(analysis) {
        return analysis.functions.some(func => 
            func.includes('variables.length') && func.includes('100'));
    }

    hasPerformanceMonitoring(analysis) {
        return analysis.functions.some(func => 
            func.includes('GlideDateTime') || func.includes('performance'));
    }

    // Placeholder methods for additional analysis
    findNestedLoops(code) { return []; }
    findRecursiveFunctions(code) { return []; }
    findHeavyOperations(code) { return []; }
    findHardcodedCredentials(code) { return []; }
    findSQLInjectionRisks(code) { return []; }
    findXSSRisks(code) { return []; }
    findFunctions(code) { return []; }
    validateErrorHandlingConfig(config, validation) { return Promise.resolve(); }
    validateRetryLogic(config, validation) { return Promise.resolve(); }
    validateRateLimiting(config, validation) { return Promise.resolve(); }

    /**
     * Register custom validator
     */
    registerCustomValidator(name, validator) {
        this.customValidators.set(name, validator);
        console.log(`✅ Registered custom validator: ${name}`);
    }

    /**
     * Run all validations on a complete solution
     */
    async validateCompleteSolution(solution) {
        console.log('🔍 Validating complete solution...');
        
        const results = {
            timestamp: new Date().toISOString(),
            overallCompliant: true,
            overallScore: 100,
            validations: {}
        };

        // Validate catalog items
        if (solution.catalogItems) {
            for (const item of solution.catalogItems) {
                results.validations[`catalog_item_${item.name}`] = await this.validateCatalogItem(item);
            }
        }

        // Validate integrations
        if (solution.integrations) {
            for (const integration of solution.integrations) {
                results.validations[`integration_${integration.name}`] = await this.validateIntegrationConfig(integration);
            }
        }

        // Validate server-side code
        if (solution.serverCode) {
            for (const [name, code] of Object.entries(solution.serverCode)) {
                results.validations[`server_code_${name}`] = await this.validateServerSideCode(code, name);
            }
        }

        // Calculate overall results
        this.calculateOverallResults(results);
        
        console.log(`✅ Complete solution validation: ${results.overallScore}/100 (${results.overallCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'})`);
        
        return results;
    }

    /**
     * Calculate overall validation results
     */
    calculateOverallResults(results) {
        let totalScore = 0;
        let validationCount = 0;
        let hasViolations = false;

        for (const validation of Object.values(results.validations)) {
            if (validation.score !== undefined) {
                totalScore += validation.score;
                validationCount++;
            }
            
            if (!validation.compliant) {
                hasViolations = true;
            }
        }

        results.overallScore = validationCount > 0 ? Math.round(totalScore / validationCount) : 100;
        results.overallCompliant = !hasViolations && results.overallScore >= 80;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ESCValidationTools;
}

/**
 * USAGE EXAMPLES:
 * 
 * const validator = new ESCValidationTools();
 * 
 * // Validate a catalog item
 * const catalogValidation = await validator.validateCatalogItem(catalogItemConfig);
 * 
 * // Validate server-side code
 * const codeValidation = await validator.validateServerSideCode(businessRuleCode, 'business_rule');
 * 
 * // Validate integration
 * const integrationValidation = await validator.validateIntegrationConfig(integrationConfig);
 * 
 * // Validate complete solution
 * const solutionValidation = await validator.validateCompleteSolution(completeSolution);
 */