# ServiceNow ESC Best Practices for Compliant Solutions

This document provides actionable best practices for developing solutions that comply with ServiceNow Enterprise Service Catalog (ESC) limitations and constraints.

## 1. Catalog Item Design Best Practices

### Variable Management
```javascript
// ❌ AVOID: Too many variables (impacts performance and UX)
// Having 150+ variables in a single catalog item

// ✅ RECOMMENDED: Group related functionality
// Break complex items into multiple related items
// Use variable sets for reusable variable groups
// Limit to 50-75 variables per item for optimal performance
```

### User Criteria Configuration
```javascript
// ❌ AVOID: Relying on category-level user criteria when item-level exists
var categoryUserCriteria = "role=admin"; // This will be ignored!

// ✅ RECOMMENDED: Always set user criteria at item level
var itemUserCriteria = "role=admin,role=catalog_admin"; // This will be honored
```

### Variable Naming and Organization
```javascript
// ✅ BEST PRACTICE: Use consistent naming conventions
var variablePrefix = "req_"; // For required fields
var optionalPrefix = "opt_"; // For optional fields
var internalPrefix = "int_"; // For internal/backend variables

// Example variable names:
// req_business_justification
// opt_preferred_delivery_date  
// int_approval_group
```

## 2. Performance Optimization

### Database Query Best Practices
```javascript
// ❌ AVOID: Unoptimized queries
var gr = new GlideRecord('catalog_item');
gr.query(); // Loads entire table!

// ✅ RECOMMENDED: Use proper filtering and indexing
var gr = new GlideRecord('catalog_item');
gr.addQuery('active', true);
gr.addQuery('category', categoryId);
gr.setLimit(100); // Limit results
gr.query();
```

### Memory Management
```javascript
// ✅ BEST PRACTICE: Implement pagination for large datasets
function getItemsPaginated(offset, limit) {
    var gr = new GlideRecord('sc_cat_item');
    gr.addQuery('active', true);
    gr.chooseWindow(offset, offset + limit);
    gr.query();
    return gr;
}
```

## 3. Security and Access Control

### ACL Implementation
```javascript
// ✅ BEST PRACTICE: Implement granular ACLs
// Create specific roles for catalog management
// Example: catalog_admin, catalog_viewer, catalog_approver

// ✅ Regular ACL audit script
function auditCatalogACLs() {
    var gr = new GlideRecord('sys_security_acl');
    gr.addQuery('type', 'record');
    gr.addQuery('operation', 'read');
    gr.addQuery('name', 'CONTAINS', 'catalog');
    gr.query();
    
    while (gr.next()) {
        gs.info('ACL: ' + gr.name + ' - Script: ' + gr.script);
    }
}
```

### Data Protection
```javascript
// ✅ BEST PRACTICE: Encrypt sensitive catalog variables
// Use encrypted variables for PII, credentials, etc.
var sensitiveVar = new GlideRecord('item_option_new');
sensitiveVar.addQuery('name', 'social_security_number');
sensitiveVar.setValue('encrypt', true);
sensitiveVar.update();
```

## 4. Integration Best Practices

### REST API Usage
```javascript
// ✅ BEST PRACTICE: Implement proper error handling and rate limiting
function callExternalAPI(endpoint, data) {
    try {
        var request = new sn_ws.RESTMessageV2();
        request.setEndpoint(endpoint);
        request.setHttpMethod('POST');
        request.setRequestBody(JSON.stringify(data));
        
        // Implement retry logic
        var maxRetries = 3;
        var retryCount = 0;
        var response;
        
        do {
            response = request.execute();
            if (response.getStatusCode() === 429) { // Rate limited
                gs.sleep(1000 * Math.pow(2, retryCount)); // Exponential backoff
                retryCount++;
            } else {
                break;
            }
        } while (retryCount < maxRetries);
        
        return response;
    } catch (ex) {
        gs.error('API call failed: ' + ex.getMessage());
        return null;
    }
}
```

### External System Integration
```javascript
// ✅ BEST PRACTICE: Use middleware for complex integrations
// Create integration tables for data mapping
var integrationMap = new GlideRecord('u_external_system_mapping');
integrationMap.addQuery('source_system', 'legacy_hr');
integrationMap.addQuery('active', true);
integrationMap.query();
```

## 5. User Experience Optimization

### Form Design
```xml
<!-- ✅ BEST PRACTICE: Use progressive disclosure for complex forms -->
<catalog_item>
    <variables>
        <!-- Core required variables first -->
        <variable name="request_type" type="select" mandatory="true"/>
        
        <!-- Conditional variables based on selection -->
        <variable name="hardware_type" type="select" 
                 depends_on="request_type" 
                 relevant_condition="request_type=hardware"/>
        
        <!-- Group related variables -->
        <variable_set name="approval_details" 
                     relevant_condition="requires_approval=true"/>
    </variables>
</catalog_item>
```

### Search Optimization
```javascript
// ✅ BEST PRACTICE: Implement custom search for attachments
function searchCatalogWithAttachments(searchTerm) {
    var results = [];
    
    // Search catalog items
    var catalogItems = new GlideRecord('sc_cat_item');
    catalogItems.addQuery('short_description', 'CONTAINS', searchTerm);
    catalogItems.addQuery('active', true);
    catalogItems.query();
    
    // Search attachment content (workaround for limitation)
    var attachments = new GlideRecord('sys_attachment');
    attachments.addQuery('table_name', 'sc_cat_item');
    attachments.query();
    
    while (attachments.next()) {
        // Implement custom attachment content search
        if (attachmentContainsText(attachments.sys_id, searchTerm)) {
            results.push(attachments.table_sys_id);
        }
    }
    
    return results;
}
```

## 6. Approval Workflow Design

### Flow Designer Best Practices
```javascript
// ✅ BEST PRACTICE: Use Flow Designer for complex approvals
// Instead of relying on Item Designer limitations

// Create reusable approval flows
// Example: Dynamic approval based on cost thresholds
function getApprovalGroup(requestedItem, cost) {
    if (cost > 10000) {
        return 'executive_approval';
    } else if (cost > 1000) {
        return 'manager_approval';
    } else {
        return 'auto_approve';
    }
}
```

## 7. Testing and Quality Assurance

### Performance Testing
```javascript
// ✅ BEST PRACTICE: Test with realistic data volumes
function performanceTestCatalogLoad() {
    var startTime = new GlideDateTime();
    
    // Simulate user loading catalog with 1000+ items
    var gr = new GlideRecord('sc_cat_item');
    gr.addQuery('active', true);
    gr.setLimit(1000);
    gr.query();
    
    var endTime = new GlideDateTime();
    var duration = GlideDateTime.subtract(startTime, endTime);
    
    gs.info('Catalog load test duration: ' + duration.getDisplayValue());
    
    // Alert if performance threshold exceeded
    if (duration.getNumericValue() > 5000) { // 5 seconds
        gs.warn('Catalog performance issue detected');
    }
}
```

### User Acceptance Testing
```javascript
// ✅ BEST PRACTICE: Implement automated UAT scenarios
var testScenarios = [
    {
        name: 'Standard User Request',
        user: 'standard.user',
        item: 'laptop_request',
        expectedApproval: 'manager'
    },
    {
        name: 'Executive Request',
        user: 'executive.user', 
        item: 'high_value_software',
        expectedApproval: 'auto_approve'
    }
];
```

## 8. Maintenance and Monitoring

### Health Monitoring
```javascript
// ✅ BEST PRACTICE: Implement catalog health checks
function catalogHealthCheck() {
    var issues = [];
    
    // Check for items with too many variables
    var gr = new GlideRecord('sc_cat_item');
    gr.query();
    
    while (gr.next()) {
        var variableCount = getVariableCount(gr.sys_id);
        if (variableCount > 100) {
            issues.push({
                item: gr.name,
                issue: 'Too many variables: ' + variableCount
            });
        }
    }
    
    // Check for orphaned variables
    var orphanedVars = new GlideRecord('item_option_new');
    orphanedVars.addNullQuery('cat_item');
    orphanedVars.query();
    
    if (orphanedVars.getRowCount() > 0) {
        issues.push({
            issue: 'Orphaned variables found: ' + orphanedVars.getRowCount()
        });
    }
    
    return issues;
}
```

### Update Management
```javascript
// ✅ BEST PRACTICE: Use update sets for all changes
function createCatalogUpdateSet(description) {
    var updateSet = new GlideRecord('sys_update_set');
    updateSet.initialize();
    updateSet.name = 'Catalog Changes - ' + description;
    updateSet.description = description;
    updateSet.state = 'build';
    updateSet.insert();
    
    // Set as current update set
    gs.setProperty('glide.update_set.current', updateSet.sys_id);
    
    return updateSet.sys_id;
}
```

## 9. Documentation Standards

### Catalog Item Documentation
```javascript
// ✅ BEST PRACTICE: Comprehensive documentation template
var catalogItemDoc = {
    name: 'Laptop Request',
    description: 'Standard laptop procurement process',
    variables: [
        {
            name: 'laptop_type',
            type: 'select',
            mandatory: true,
            options: ['Standard', 'High-Performance', 'Developer'],
            businessRules: 'Triggers approval workflow based on selection'
        }
    ],
    approvalWorkflow: 'Standard IT approval process',
    fulfillmentProcess: 'Auto-creates RITM and assigns to IT procurement',
    limitations: [
        'Cannot request more than 2 laptops per request',
        'High-performance laptops require VP approval'
    ],
    integrations: ['Asset Management', 'Procurement System'],
    testScenarios: ['Standard user request', 'Bulk request', 'Emergency request']
};
```

## 10. Migration and Upgrade Considerations

### Version Compatibility
```javascript
// ✅ BEST PRACTICE: Check platform version compatibility
function checkESCCompatibility() {
    var currentVersion = gs.getProperty('glide.war');
    var supportedFeatures = [];
    
    // Check for version-specific limitations
    if (currentVersion >= 'utah') {
        supportedFeatures.push('Enhanced search');
        // Note: Utah has search placeholder character limit
    }
    
    if (currentVersion >= 'vancouver') {
        supportedFeatures.push('Improved Item Designer');
        // But still has same limitations
    }
    
    return supportedFeatures;
}
```

## Conclusion

Following these best practices ensures your ServiceNow ESC solutions are:
- **Compliant** with platform limitations
- **Performant** under realistic load conditions  
- **Maintainable** over time
- **Secure** and properly governed
- **User-friendly** and adoptable

Always test thoroughly and document any workarounds for platform limitations. Remember that working within ServiceNow's constraints often leads to more robust and upgrade-safe solutions.