const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    disable: prod ? false : true,
    dest: 'public'
  },
})
