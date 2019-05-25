const {PHASE_PRODUCTION_SERVER} = require('next-server/constants')
module.exports = (phase, {defaultConfig}) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      /* production only config */
    }
  }
  const withSass = require('@zeit/next-sass')
  return withSass({})
}
