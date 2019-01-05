module.exports = {
  apps : [{
    name: 'cometMarketing',
    script: 'npm',
    args: 'start',
    instances: 1,
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};