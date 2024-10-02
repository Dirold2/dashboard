module.exports = {
    apps: [{
        name: 'cuteworld',
        script: 'npm',
        args: 'run start',
        env: {
            NODE_ENV: 'production',
        },
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
    }],
};