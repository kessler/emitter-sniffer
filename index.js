function defaultLog () {
	console.log(arguments)
}

module.exports.attach = function(emitter, log) {
	log = log || defaultLog
	var emit = emitter.emit

	emitter.emit = function(type) {
		log.apply(null, arguments)
		var emitArgs = [type].concat(Array.prototype.slice.call(arguments, 1))
		emit.apply(emitter, emitArgs)
	}

	return {
		detach: function () {
			emitter.emit = emit
		}
	}
}