Module.register('smartmirror-snowboy-hotword', {

	defaults: {

	},

	start: function() {
		this.sendSocketNotification('SNOWBOY_START', this.config);
		Log.info('Starting node module: ' + this.name);
	},


	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if(notification === 'triggered') {
			this.sendNotification('HOTWORD_TRIGGERED', payload);

		}
	}
});
