/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_api_annotations_pb = require('./google/api/annotations_pb.js')

var protoc$gen$swagger_options_annotations_pb = require('./protoc-gen-swagger/options/annotations_pb.js')
const proto = {};
proto.v1 = require('./simulation-service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.v1.SimulationServiceClient =
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
proto.v1.SimulationServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.v1.SimulationServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.v1.SimulationServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.CreateEntityRequest,
 *   !proto.v1.CreateEntityResponse>}
 */
const methodInfo_SimulationService_CreateEntity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.CreateEntityResponse,
  /** @param {!proto.v1.CreateEntityRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.CreateEntityResponse.deserializeBinary
);


/**
 * @param {!proto.v1.CreateEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.CreateEntityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.CreateEntityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServiceClient.prototype.createEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.SimulationService/CreateEntity',
      request,
      metadata,
      methodInfo_SimulationService_CreateEntity,
      callback);
};


/**
 * @param {!proto.v1.CreateEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.CreateEntityResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServicePromiseClient.prototype.createEntity =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createEntity(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.GetEntityRequest,
 *   !proto.v1.GetEntityResponse>}
 */
const methodInfo_SimulationService_GetEntity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.GetEntityResponse,
  /** @param {!proto.v1.GetEntityRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.GetEntityResponse.deserializeBinary
);


/**
 * @param {!proto.v1.GetEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.GetEntityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.GetEntityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServiceClient.prototype.getEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.SimulationService/GetEntity',
      request,
      metadata,
      methodInfo_SimulationService_GetEntity,
      callback);
};


/**
 * @param {!proto.v1.GetEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.GetEntityResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServicePromiseClient.prototype.getEntity =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getEntity(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.DeleteEntityRequest,
 *   !proto.v1.DeleteEntityResponse>}
 */
const methodInfo_SimulationService_DeleteEntity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.DeleteEntityResponse,
  /** @param {!proto.v1.DeleteEntityRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.DeleteEntityResponse.deserializeBinary
);


/**
 * @param {!proto.v1.DeleteEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.DeleteEntityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.DeleteEntityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServiceClient.prototype.deleteEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.SimulationService/DeleteEntity',
      request,
      metadata,
      methodInfo_SimulationService_DeleteEntity,
      callback);
};


/**
 * @param {!proto.v1.DeleteEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.DeleteEntityResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServicePromiseClient.prototype.deleteEntity =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteEntity(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.ExecuteAgentActionRequest,
 *   !proto.v1.ExecuteAgentActionResponse>}
 */
const methodInfo_SimulationService_ExecuteAgentAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.ExecuteAgentActionResponse,
  /** @param {!proto.v1.ExecuteAgentActionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.ExecuteAgentActionResponse.deserializeBinary
);


/**
 * @param {!proto.v1.ExecuteAgentActionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.ExecuteAgentActionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.ExecuteAgentActionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServiceClient.prototype.executeAgentAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.SimulationService/ExecuteAgentAction',
      request,
      metadata,
      methodInfo_SimulationService_ExecuteAgentAction,
      callback);
};


/**
 * @param {!proto.v1.ExecuteAgentActionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.ExecuteAgentActionResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServicePromiseClient.prototype.executeAgentAction =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.executeAgentAction(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.ResetWorldRequest,
 *   !proto.v1.ResetWorldResponse>}
 */
const methodInfo_SimulationService_ResetWorld = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.ResetWorldResponse,
  /** @param {!proto.v1.ResetWorldRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.ResetWorldResponse.deserializeBinary
);


/**
 * @param {!proto.v1.ResetWorldRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.ResetWorldResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.ResetWorldResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServiceClient.prototype.resetWorld =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.SimulationService/ResetWorld',
      request,
      metadata,
      methodInfo_SimulationService_ResetWorld,
      callback);
};


/**
 * @param {!proto.v1.ResetWorldRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.ResetWorldResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.SimulationServicePromiseClient.prototype.resetWorld =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.resetWorld(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.v1;

