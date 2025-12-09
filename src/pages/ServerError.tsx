import { AlertCircle } from "lucide-react";

const ServerError = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="flex items-start gap-4 mb-6">
          <AlertCircle className="w-12 h-12 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-2">500</h1>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Internal Server Error</h2>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 mb-4">
            The server encountered an internal error or misconfiguration and was unable to complete your request.
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Please contact the server administrator to inform them of the time this error occurred, and the actions you performed just before this error.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-900 mb-3">Error Details:</h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex">
              <span className="text-red-700 font-semibold min-w-[120px]">Error Code:</span>
              <span className="text-red-600">ERR_CONNECTION_REFUSED</span>
            </div>
            <div className="flex">
              <span className="text-red-700 font-semibold min-w-[120px]">Time:</span>
              <span className="text-red-600">{new Date().toUTCString()}</span>
            </div>
            <div className="flex">
              <span className="text-red-700 font-semibold min-w-[120px]">Server:</span>
              <span className="text-red-600">Apache/2.4.52 (Ubuntu)</span>
            </div>
            <div className="flex">
              <span className="text-red-700 font-semibold min-w-[120px]">Reference:</span>
              <span className="text-red-600">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>If you are the administrator of this website, please check your server logs for more information.</p>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
