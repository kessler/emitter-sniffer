var emitterSniffer = require('../index')
var assert = require('assert')
var EventEmitter = require('events').EventEmitter

describe('emitterSniffer', function () {
	var emitter

	beforeEach(function () {
		emitter = new EventEmitter()
	})

	it('prints the type and arguments of fired events', function () {
		var loggedArgs
		var emittedArgs

		emitter.on('event', function() {
			emittedArgs = arguments
		})

		emitterSniffer.attach(emitter, function() {
			loggedArgs = arguments
		})

		emitter.emit('event', 1, 2, 3)
		assert.deepEqual(Array.prototype.slice.call(emittedArgs, 0), [1, 2, 3])
		assert.deepEqual(Array.prototype.slice.call(loggedArgs, 0), ['event', 1, 2, 3])
	})

	it('can be detached', function () {

		var sniffer = emitterSniffer.attach(emitter, function() {
			throw new Error('should not have been called')
		})

		// test the test
		assert.throws(function () {
			emitter.emit('something')
		})

		sniffer.detach()

		assert.doesNotThrow(function () {
			emitter.emit('something')
		})
	})
})