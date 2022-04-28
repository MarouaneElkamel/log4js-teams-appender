const { IncomingWebhook } = require('ms-teams-webhook');

let sendMessage = (logType, categoryName, message, webhookUrl) => {
    const webhook = new IncomingWebhook(webhookUrl);
    let themeColor = '';
    switch (logType) {
        case 'ERROR':
            themeColor = 'FF0000';
            break;
        case 'WARN':
            themeColor = 'FFFF00';
            break;
        case 'INFO':
            themeColor = '00FF00';
            break;
        case 'TRACE':
            themeColor = '0000FF';
            break;
        case 'DEBUG':
            themeColor = '00FFFF';
            break;
        case 'FATAL':
            themeColor = 'FF00FF';
            break;

    }
    webhook.send(JSON.stringify({
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "themeColor": "f50e02",
        "summary": "Ripple - ERROR",
        "title":  "Ripple - ERROR",
        "text" : message
    })).then(() => {
    })
        .catch(function (err) {
            console.error('log4js ms-teams appender - Error happened', 'Error in calling webhook', err);
        });
};

function configure(config, layouts) {
    let pattern = '`%p` %c%n%m';
    let layout = layouts.patternLayout(pattern);
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }
    if (!config.webhookUrl)
        return new Error('log4js ms-teams appender - Incomplete configurations');
    return teamsAppender(config, layout);
}

function teamsAppender(config, layout, pattern) {
    const appender = (loggingEvent) => {
        if (!config.webhookUrl)
            console.error('log4js ms-teams appender - Error happened', 'WebHook not defined in config');
        else {
            let message = '';
            loggingEvent.data.forEach(d => {
                if (typeof d !== 'string')
                    d = JSON.stringify(d);
                message += d + ' ';
            })

            sendMessage(loggingEvent.level.levelStr, loggingEvent.categoryName, message, config.webhookUrl);

        }
    };
    return appender;
}

exports.configure = configure;
