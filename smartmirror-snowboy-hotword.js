Module.register('smartmirror-snowboy-hotword', {

	defaults: {

	},

	start: function() {
		this.sendSocketNotification('SNOWBOY_START', this.config);
		Log.info('Starting node module: ' + this.name);
	}

});
