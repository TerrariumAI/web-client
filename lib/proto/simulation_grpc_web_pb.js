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
 *   !proto.pb.SpawnAgentRequest,
 *   !proto.pb.SpawnAgentResult>}
 */
const methodInfo_Simulation_SpawnAgent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.SpawnAgentResult,
  /** @param {!proto.pb.SpawnAgentRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.SpawnAgentResult.deserializeBinary
);


/**
 * @param {!proto.pb.SpawnAgentRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.SpawnAgentResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.SpawnAgentResult>|undefined}
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
 * @param {!proto.pb.SpawnAgentRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.SpawnAgentResult>}
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
 *   !proto.pb.AgentObservationRequest,
 *   !proto.pb.AgentObservationResult>}
 */
const methodInfo_Simulation_AgentObservation = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.AgentObservationResult,
  /** @param {!proto.pb.AgentObservationRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.AgentObservationResult.deserializeBinary
);


/**
 * @param {!proto.pb.AgentObservationRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.AgentObservationResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.AgentObservationResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationClient.prototype.agentObservation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.Simulation/AgentObservation',
      request,
      metadata,
      methodInfo_Simulation_AgentObservation,
      callback);
};


/**
 * @param {!proto.pb.AgentObservationRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.AgentObservationResult>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationPromiseClient.prototype.agentObservation =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.agentObservation(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.AgentActionRequest,
 *   !proto.pb.AgentActionResult>}
 */
const methodInfo_Simulation_AgentAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.AgentActionResult,
  /** @param {!proto.pb.AgentActionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.AgentActionResult.deserializeBinary
);


/**
 * @param {!proto.pb.AgentActionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.AgentActionResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.AgentActionResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationClient.prototype.agentAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.Simulation/AgentAction',
      request,
      metadata,
      methodInfo_Simulation_AgentAction,
      callback);
};


/**
 * @param {!proto.pb.AgentActionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.AgentActionResult>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationPromiseClient.prototype.agentAction =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.agentAction(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.ResetWorldRequest,
 *   !proto.pb.ResetWorldResult>}
 */
const methodInfo_Simulation_ResetWorld = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.ResetWorldResult,
  /** @param {!proto.pb.ResetWorldRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.ResetWorldResult.deserializeBinary
);


/**
 * @param {!proto.pb.ResetWorldRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.ResetWorldResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.ResetWorldResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationClient.prototype.resetWorld =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.Simulation/ResetWorld',
      request,
      metadata,
      methodInfo_Simulation_ResetWorld,
      callback);
};


/**
 * @param {!proto.pb.ResetWorldRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.ResetWorldResult>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationPromiseClient.prototype.resetWorld =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.resetWorld(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.SpectateRequest,
 *   !proto.pb.CellUpdate>}
 */
const methodInfo_Simulation_Spectate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.CellUpdate,
  /** @param {!proto.pb.SpectateRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.CellUpdate.deserializeBinary
);


/**
 * @param {!proto.pb.SpectateRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CellUpdate>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationClient.prototype.spectate =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/pb.Simulation/Spectate',
      request,
      metadata,
      methodInfo_Simulation_Spectate);
};


/**
 * @param {!proto.pb.SpectateRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CellUpdate>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationPromiseClient.prototype.spectate =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/pb.Simulation/Spectate',
      request,
      metadata,
      methodInfo_Simulation_Spectate);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.SubscribeToRegionRequest,
 *   !proto.pb.SubscribeToRegionResult>}
 */
const methodInfo_Simulation_SubscribeToRegion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.SubscribeToRegionResult,
  /** @param {!proto.pb.SubscribeToRegionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.SubscribeToRegionResult.deserializeBinary
);


/**
 * @param {!proto.pb.SubscribeToRegionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.SubscribeToRegionResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.SubscribeToRegionResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationClient.prototype.subscribeToRegion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.Simulation/SubscribeToRegion',
      request,
      metadata,
      methodInfo_Simulation_SubscribeToRegion,
      callback);
};


/**
 * @param {!proto.pb.SubscribeToRegionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.SubscribeToRegionResult>}
 *     The XHR Node Readable Stream
 */
proto.pb.SimulationPromiseClient.prototype.subscribeToRegion =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.subscribeToRegion(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.pb;

