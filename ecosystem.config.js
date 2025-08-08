export const apps = [
    {
        name: 'frontend',
        script: 'npm',
        args: 'run dev', 
        instances: 1,
        max_memory_restart: '300M',
        autorestart: true,
        watch: false,
        env: {
            NODE_ENV: 'development',
        },
    },
];
