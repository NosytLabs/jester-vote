module.exports = {
  apps: [{
    name: 'topjester',
    script: 'dist/index.js',
    cwd: '/home/oldpc/projects/jester-vote',
    instances: 1,
    env: {
      NODE_ENV: 'production',
      PORT: '3013',
      DATABASE_URL: 'mysql://topjester:topjesterpass@127.0.0.1:3306/topjester'
    },
    autorestart: true,
    max_restarts: 10,
    min_uptime: 10000
  }]
};
