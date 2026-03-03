/**
 * Unified response sender
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {object} body
 */
export function sendResponse(res, statusCode, body) {
  res.status(statusCode).json(body);
}

// Success helpers
export function ok(res, data = null, message = "Success") {
  return sendResponse(res, 200, { status: "success", message, data });
}

export function created(res, data = null, message = "Resource created") {
  return sendResponse(res, 201, { status: "success", message, data });
}

export function noContent(res) {
  return res.sendStatus(204);
}

// Error helpers
export function errorResponse(res, statusCode, message, error = null) {
  const body = {
    status: "error",
    message,
  };

  // Include error detail in development or when explicitly wanted
  if (process.env.NODE_ENV !== "production" && error) {
    body.error = error instanceof Error ? error.message : String(error);
    body.stack = error?.stack;
  }

  // Always log real errors (4xx usually not)
  if (statusCode >= 500) {
    console.error(`[${statusCode}] ${message}`, error);
  }

  return sendResponse(res, statusCode, body);
}

// Convenience wrappers (keep only the ones you actually use)
export function badRequest(res, message = "Bad Request", error = null) {
  return errorResponse(res, 400, message, error);
}

export function unauthorized(res, message = "Unauthorized", error = null) {
  return errorResponse(res, 401, message, error);
}

export function forbidden(res, message = "Forbidden", error = null) {
  return errorResponse(res, 403, message, error);
}

export function notFound(res, message = "Not Found", error = null) {
  return errorResponse(res, 404, message, error);
}

export function serverError(
  res,
  message = "Internal Server Error",
  error = null,
) {
  return errorResponse(res, 500, message, error ?? new Error(message));
}
