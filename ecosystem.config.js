const { version } = require("typescript");

module.exports = {
    apps: [{
        name: 'dashboard',
        script: 'npm',
        args: 'run start',
        version,
        env: {
            NODE_ENV: 'production',
        },
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
    }],
};