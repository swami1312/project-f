// Utility Helper Functions

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Format date
const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Generate unique ID
const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};

// Debounce function
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Filter orders by status
const filterByStatus = (orders, status) => {
    if (!status || status === 'Any status') return orders;
    return orders.filter(order => order.status === status);
};

// Filter orders by price range
const filterByPriceRange = (orders, range) => {
    if (!range || range === 'All prices') return orders;
    
    const ranges = {
        '$0—$100': { min: 0, max: 100 },
        '$100—$500': { min: 100, max: 500 },
        '$500—$1000': { min: 500, max: 1000 },
        '$100—$1500': { min: 100, max: 1500 },
        '$1000—$2000': { min: 1000, max: 2000 },
        '$2000+': { min: 2000, max: Infinity }
    };
    
    const { min, max } = ranges[range] || { min: 0, max: Infinity };
    return orders.filter(order => order.total >= min && order.total <= max);
};

// Sort orders
const sortOrders = (orders, sortBy) => {
    const sorted = [...orders];
    
    switch (sortBy) {
        case 'Date (Newest)':
        case 'Sort by Date':
            return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'Date (Oldest)':
            return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'Amount (High)':
            return sorted.sort((a, b) => b.total - a.total);
        case 'Amount (Low)':
            return sorted.sort((a, b) => a.total - b.total);
        case 'Customer (A-Z)':
            return sorted.sort((a, b) => a.customer.name.localeCompare(b.customer.name));
        default:
            return sorted;
    }
};

// Calculate metrics from orders
const calculateMetrics = (orders) => {
    return {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
        paidOrders: orders.filter(o => o.status === 'Paid').length,
        completedOrders: orders.filter(o => o.status === 'Completed').length,
        deliveredOrders: orders.filter(o => o.status === 'Delivered').length
    };
};

// Export all helpers as default object
const Helpers = {
    formatCurrency,
    formatDate,
    generateId,
    debounce,
    filterByStatus,
    filterByPriceRange,
    sortOrders,
    calculateMetrics
};

export default Helpers;
