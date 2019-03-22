'use strict';
const NodeHelper = require('node_helper');

const {PythonShell} = require('python-shell');

/**
 * @module node_helper
 * @description Backend for the module to query data from the API providers.
 */


module.exports = NodeHelper.create({

   /**
     * @function start
     * @description Logs a start message to the console.
     * @override
     */
    start() {
        console.log(`Starting module helper: ${this.name}`);
    },

	startup : function (){
		const self = this;
		console.log("[MSG " + self.name + "] " + " starting...");
		self.snowboy_pyshell = new PythonShell('modules/' + self.name + '/python_scripts/snowboy-hotword-wrapper.py', {pythonPath: 'python' });
		self.snowboy_pyshell.on('message', function (message_string) {	
			try{
				var message = JSON.parse(message_string)
				if (message.hasOwnProperty('status')){
      				console.log("[" + self.name + "] " + message.status);
      			}
				if (message.hasOwnProperty('triggered')){
					self.sendSocketNotification('triggered', message.triggered);
					console.log("[" + self.name + "] hotword " + message.triggered + " was triggered");
				}
			}
			catch(err) {
				console.log("[" + self.name + "] not a jason answer");
			}
		});
	},

    python_start_snowboy: function () {
		const self = this;
		console.log("[MSG " + self.name + "] " + " starting snowboy hotword detection");
		/*self.en_pyshell = new PythonShell('modules/' + self.name + '/python_scripts/snowboy-hotword-wrapper.py', {pythonPath: 'python' });

    		self.en_pyshell.on('message', function (message_string) {
		try{	
			var message = JSON.parse(message_string)
			//console.log("[MSG " + self.name + "] " + message);
      			if (message.hasOwnProperty('status')){
      				console.log("[" + self.name + "] " + message.status);
      			}
			if (message.hasOwnProperty('triggered')){
				self.sendSocketNotification('Hotword_triggered', message.triggered);
      			}
		}
		catch(err) {
			console.log("[" + self.name + "] not a jason answer");
		}
    	}); */
	},

    socketNotificationReceived(notification, payload) {
		const self = this;
        if (notification === 'SNOWBOY_START') {
            /** @member {Object} config - Module config. */
            self.config = payload;
			//this.python_start_snowboy();
			self.startup();
			console.log("[MSG " + self.name + "] " + " started");
        }
    },

	stop: function() {
		const self = this;
		self.snowboy_pyshell.childProcess.kill('SIGKILL');
		self.snowboy_pyshell.end(function (err) {
           	if (err){
        		//throw err;
    		};
    		console.log('finished');
		});
	}

});
