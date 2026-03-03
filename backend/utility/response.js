import { validationResult } from "express-validator";

const formatResponse = (statusCode, message, data) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,x-api-key,x-requested-with",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message,
    ...(data !== undefined && { data }),
  }),
});

// Success responses (unchanged)
export const SuccessResponse = (data, statusCode = 200) => {
  return formatResponse(statusCode, "Success", data);
};

export const CreatedResponse = (data) => SuccessResponse(data, 201);

// Error responses — updated
export const ErrorResponse = (statusCode, error) => {
  // Handle express-validator errors
  if (Array.isArray(error) && error.every((e) => e?.msg && e?.path)) {
    const formattedErrors = error.map((err) => ({
      field: err.path,
      value: err.value, // may or may not exist
      message: err.msg,
      // location: err.location   // body / query / params — optional
    }));

    return formatResponse(statusCode, "Validation failed", formattedErrors);
  }

  // Handle regular Error objects
  if (error instanceof Error) {
    return formatResponse(statusCode, error.message);
  }

  // Fallback
  const message =
    typeof error === "string" ? error : "An unexpected error occurred";
  return formatResponse(statusCode, message);
};

// Convenience wrappers (unchanged)
export const BadRequest = (error) => {
  console.log("Bad request error:", error);
  return ErrorResponse(400, error);
};

export const NotFound = (message = "Resource not found") =>
  ErrorResponse(404, message);

export const Unauthorized = (message = "Unauthorized") =>
  ErrorResponse(401, message);

export const InternalError = (error) => {
  console.log("Internal server error:", error);
  return ErrorResponse(500, error || "Internal server error");
};
