export default [
    {
        id: 1,
        icon: 'build',
        title: 'System Setting',
        model: true,
        role: 'superadmin',
        permission: 'role:view',
        children: [
        {
            id: 1,
            icon: 'supervisor_account',
            title: 'Manage Roles',
            to: '/hello',
            role: 'superadmin',
            permission: 'role:view',
            selected: false
        },
        {
            id: 2,
            icon: 'perm_identity',
            title: 'Manage Permissions',
            to: '/permissions',
            role: 'superadmin',
            permission: 'permission:view',
            selected: false
        }
        ]
    },
    {
        id: 2,
        icon: 'group',
        title: 'Manage Administrators',
        model: false,
        role: 'superadmin',
        permission: 'role:view',
        children: []
    }
]