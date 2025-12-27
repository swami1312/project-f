// User Data - Current logged in user info
const userData = {
    id: 'user-001',
    name: 'Kristina Evans',
    email: 'kris.evans@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
    role: 'Admin',
    notifications: 3
};

const UserData = {
    current: userData,
    getName: () => userData.name,
    getEmail: () => userData.email,
    getAvatar: () => userData.avatar,
    getNotifications: () => userData.notifications
};

export default UserData;
