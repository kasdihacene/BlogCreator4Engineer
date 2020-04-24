// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),

            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        reporters: [
            // Output code coverage files
            'coverage'
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        // Configure code coverage reporter
        coverageReporter: {
            reporters: [
                // generates ./coverage/lcov.info
                { type: 'lcovonly', subdir: '.' },
                // generates ./coverage/coverage-final.json
                { type: 'json', subdir: '.' },
            ]
        },
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--remote-debugging-port=9222',
                ]
            }
        },
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        restartOnFileChange: true
    });
};