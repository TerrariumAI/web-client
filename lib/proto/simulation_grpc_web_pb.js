/**
 * @fileoverview gRPC-Web generated client stub for pb
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.pb = require('./simulation_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.SimulationClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.SimulationPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.pb.SimulationClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.pb.SimulationClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.SpawnAgentMessage,
 *   !proto.pb.SpawnAgentResultMessage>}
 */
const methodInfo_Simulation_SpawnAgent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.SpawnAgentResultMessage,
  /** @param {!proto.pb.SpawnAgentMessage} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.SpawnAgentResultMessage.deserializeBinary
);


/**
 * @param {!proto.pb.SpawnAgentMessage} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.SpawnAgentResultMessage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.SpawnAgentResultMessage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationClient.prototype.spawnAgent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.Simulation/SpawnAgent',
      request,
      metadata,
      methodInfo_Simulation_SpawnAgent,
      callback);
};


/**
 * @param {!proto.pb.SpawnAgentMessage} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.SpawnAgentResultMessage>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationPromiseClient.prototype.spawnAgent =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.spawnAgent(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.ObserveRequestMessage,
 *   !proto.pb.EntityUpdateMessage>}
 */
const methodInfo_Simulation_Observe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.EntityUpdateMessage,
  /** @param {!proto.pb.ObserveRequestMessage} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.EntityUpdateMessage.deserializeBinary
);


/**
 * @param {!proto.pb.ObserveRequestMessage} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pb.EntityUpdateMessage>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationClient.prototype.observe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/pb.Simulation/Observe',
      request,
      metadata,
      methodInfo_Simulation_Observe);
};


/**
 * @param {!proto.pb.ObserveRequestMessage} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pb.EntityUpdateMessage>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationPromiseClient.prototype.observe =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/pb.Simulation/Observe',
      request,
      metadata,
      methodInfo_Simulation_Observe);
};


module.exports = proto.pb;

