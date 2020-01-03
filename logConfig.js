function logConfig() {

  const log4js = require('log4js');
  log4js.configure({
    appenders:{
      console: {type: 'console'},
      info: {
        type: 'file',
        filename: './logs/info.log',
      },
      warn: {
        type: 'file',
        filename: './logs/warn.log',
        layout: {
          type: 'pattern',
          pattern: '%d %p %m %f:%l'
        }
      },
      error: {
        type: 'file',
        filename: './logs/error.log',
        layout: {
          type: 'pattern',
          pattern: '%d %p %m \n%s'
        }
      },
    },
    categories: {
      default: {
        appenders: ['info', 'warn'],
        level: 'info'
      },
      error: {
        appenders: ['error'],
        level: 'error',
        enableCallStack: true
      }
    },
    replaceConsole: true
  })

  const logger = log4js.getLogger();
  const logError = log4js.getLogger('error')

  global.logger = logger
  global.logError = logError
  
  return log4js

}
module.exports = logConfig