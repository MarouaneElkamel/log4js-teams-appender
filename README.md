Log4js Node Teams Appender
--------------------------------

Sends log events to a MS Teams channel. This is an appender for use with log4js.

## Instructions:
## Install the package:
```
npm i @kevit/log4js-teams
```

## Configuration

* `type` - `@kevit/log4js-teams`
* `webhookURL` - Your channel's incoming webhhok URL
* `layout` - `object` (optional, defaults to `patternLayout` with pattern  ``` `%p` %c%n%m ```) - the layout to use for the message (see [layouts](https://log4js-node.github.io/log4js-node/layouts.html)).
## Example

#### With webhook url
```javascript
log4js.configure({
    appenders: {
        teamsAlert: {
            type: '@kevit/log4js-teams',
            webhookUrl: 'https://outlook.office.com/webhook/***/IncomingWebhook/***/***'
        }
    },
    categories: {default: {appenders: ['teamsAlert'], level: 'warn'}}
});
```
This configuration will send all warn (and above) messages to the respective teams channel.


#### With multiple appenders
```javascript
log4js.configure({
	appenders: {
		out: {type: 'stdout'},
		allLogs: {type: 'file', filename: 'all.log', maxLogSize: 10485760, backups: 10, compress: true},
		outFilter: {
			type: 'logLevelFilter', appender: 'out', level: process.env.LOG_LEVEL || 'all'
		},
		teamsAlert: {
		    type: '@kevit/log4js-teams',
		    webhookUrl: 'https://outlook.office.com/webhook/***/IncomingWebhook/***/***'
		    },
		teamsFilter: {
			type: 'logLevelFilter', appender: 'teamsAlert', level: process.env.ALERT_LOG_LEVEL || 'warn'
		}
	},
	categories: {
		default: {appenders: ['allLogs','outFilter', 'teamsFilter'], level: process.env.LOG_LEVEL || 'all'}
	}
});
```
This configuration displays use of multiple appenders.

- `outFilter`: Push log in **stdout** with filter `LOG_LEVEL` set in environment, if not set then `all` levels
- `teamsFilter`: Push log in **teams channel** with filter `ALERT_LOG_LEVEL` set in environment, if not set then `warn` levels


For more configuration, see [log4js](https://log4js-node.github.io/log4js-node)
