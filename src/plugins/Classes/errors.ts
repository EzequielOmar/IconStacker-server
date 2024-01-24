export const Errors = {
  AuthorizationProcessFailed: {
    status: 500,
    message: "Authorization process failed, please check later.",
  },
  IncorrectInformation: {
    status: 401,
    message: "Information is invalid.",
  },
  InvalidTokenFormat: {
    status: 400,
    message: "Token sent in an invalid format, please use Bearer Token.",
  },
  MissingObligatoryParameter: {
    status: 400,
    message: "Missing obligatory parameter, please verify and try again.",
  },
	PasswordNotStrongEnough: {
		status: 400, field: 'password', message: 'Password is not strong enough, please include at least 6 characters, a letter, a number and a special character.'
	},
  TokenExpired: {
    status: 401,
    message: "Token has expired.",
  },
  TokenInvalid: {
    status: 401,
    message: "Token is invalid.",
  },
  TokenTypeInvalid: {
    status: 403,
    message: "The token you sent is valid but not the correct type.",
  },
  TokenRevoked: {
    status: 401,
    message: "Session was closed, please log in again.",
  },
};
