// Orders Data - Mock data for the application
const ordersData = [
    {
        id: '390561',
        customer: {
            name: 'Michelle Black',
            email: 'michelle.black@email.com',
            avatar: 'https://i.pravatar.cc/150?img=1'
        },
        status: 'Paid',
        total: 780.00,
        date: 'Jan 8',
        items: [
            { name: 'Ryobi ONE drill/driver', price: 409.00, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop' },
            { name: 'Socket Systeme Electric', price: 238.00, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
            { name: 'DVB-T2 receiver bbk', price: 133.00, image: 'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '663334',
        customer: {
            name: 'Janice Chandler',
            email: 'janice.chandler@email.com',
            avatar: 'https://i.pravatar.cc/150?img=5'
        },
        status: 'Delivered',
        total: 1250.00,
        date: 'Jan 6',
        items: [
            { name: 'Professional Tool Kit', price: 750.00, image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f2436?w=100&h=100&fit=crop' },
            { name: 'Safety Equipment Set', price: 500.00, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '418135',
        customer: {
            name: 'Mildred Hall',
            email: 'mildred.hall@email.com',
            avatar: 'https://i.pravatar.cc/150?img=9'
        },
        status: 'Paid',
        total: 540.95,
        date: 'Jan 5',
        items: [
            { name: 'Electric Screwdriver Set', price: 340.95, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&h=100&fit=crop' },
            { name: 'Drill Bits Collection', price: 200.00, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '801999',
        customer: {
            name: 'Ana Carter',
            email: 'ana.carter@email.com',
            avatar: 'https://i.pravatar.cc/150?img=16'
        },
        status: 'Paid',
        total: 1489.00,
        date: 'Jan 2',
        items: [
            { name: 'Industrial Power Drill', price: 899.00, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop' },
            { name: 'Workshop Organizer', price: 590.00, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '517783',
        customer: {
            name: 'John Sherman',
            email: 'john.sherman@email.com',
            avatar: 'https://i.pravatar.cc/150?img=12'
        },
        status: 'Completed',
        total: 925.00,
        date: 'Dec 28',
        items: [
            { name: 'Pneumatic Nail Gun', price: 525.00, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&h=100&fit=crop' },
            { name: 'Air Compressor', price: 400.00, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '602992',
        customer: {
            name: 'James Miller',
            email: 'james.miller@email.com',
            avatar: 'https://i.pravatar.cc/150?img=68'
        },
        status: 'Paid',
        total: 1620.00,
        date: 'Dec 26',
        items: [
            { name: 'Ryobi ONE drill/driver', price: 409.00, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop' },
            { name: 'Socket Systeme Electric', price: 238.00, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
            { name: 'DVB-T2 receiver bbk', price: 139.00, image: 'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=100&h=100&fit=crop' },
            { name: 'Inforce oil-free compressor', price: 135.00, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop' },
            { name: 'TIG-200 welding inverter', price: 699.00, image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f2436?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '730345',
        customer: {
            name: 'Travis French',
            email: 'travis.french@email.com',
            avatar: 'https://i.pravatar.cc/150?img=14'
        },
        status: 'Paid',
        total: 315.50,
        date: 'Dec 22',
        items: [
            { name: 'Hand Tool Set', price: 315.50, image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f2436?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '126955',
        customer: {
            name: 'Ralph Hall',
            email: 'ralph.hall@email.com',
            avatar: 'https://i.pravatar.cc/150?img=15'
        },
        status: 'Paid',
        total: 1267.45,
        date: 'Dec 20',
        items: [
            { name: 'Professional Welder', price: 867.45, image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f2436?w=100&h=100&fit=crop' },
            { name: 'Safety Gear Bundle', price: 400.00, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '045321',
        customer: {
            name: 'Gary Gilbert',
            email: 'gary.gilbert@email.com',
            avatar: 'https://i.pravatar.cc/150?img=17'
        },
        status: 'Completed',
        total: 287.00,
        date: 'Dec 18',
        items: [
            { name: 'Precision Measuring Tools', price: 287.00, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '082848',
        customer: {
            name: 'Frances Howell',
            email: 'frances.howell@email.com',
            avatar: 'https://i.pravatar.cc/150?img=20'
        },
        status: 'Delivered',
        total: 1740.00,
        date: 'Dec 17',
        items: [
            { name: 'Industrial Tool Bundle', price: 1740.00, image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f2436?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '646072',
        customer: {
            name: 'Herbert Boyd',
            email: 'herbert.boyd@email.com',
            avatar: 'https://i.pravatar.cc/150?img=22'
        },
        status: 'Paid',
        total: 714.00,
        date: 'Dec 14',
        items: [
            { name: 'Cordless Drill Pro', price: 714.00, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '432019',
        customer: {
            name: 'Alan White',
            email: 'alan.white@email.com',
            avatar: 'https://i.pravatar.cc/150?img=25'
        },
        status: 'Paid',
        total: 267.65,
        date: 'Dec 13',
        items: [
            { name: 'Basic Tool Set', price: 267.65, image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f2436?w=100&h=100&fit=crop' }
        ]
    },
    {
        id: '985927',
        customer: {
            name: 'Julie Martin',
            email: 'julie.martin@email.com',
            avatar: 'https://i.pravatar.cc/150?img=26'
        },
        status: 'Delivered',
        total: 389.00,
        date: 'Dec 11',
        items: [
            { name: 'Home Repair Kit', price: 389.00, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&h=100&fit=crop' }
        ]
    }
];

// Default export for ES modules style
const OrdersData = {
    orders: ordersData,
    getOrderById: (id) => ordersData.find(order => order.id === id),
    getOrdersByStatus: (status) => ordersData.filter(order => order.status === status),
    getTotalRevenue: () => ordersData.reduce((sum, order) => sum + order.total, 0),
    getOrdersCount: () => ordersData.length
};

export default OrdersData;
