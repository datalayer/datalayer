import * as validator from "validator";

/**	
 * Handle form validation for the login form≥	
 * 	
 * @param email - user's auth email	
 * @param password - user's auth password	
 * @param setError - function that handles updating error state value	
 */	
export const validateLoginForm = (	
  email: string,	
  password: string,	
  setError: (error: string | null) => void	
): boolean => {	
  // Check for undefined or empty input fields.
  if (!email || !password) {	
    setError("Please enter a valid email and password.");	
    return false;	
  }	
  // Validate email.
  if (!validator.isEmail(email)) {	
    setError("Please enter a valid email address.");	
    return false;	
  }	
  return true;	
}

export const verifyEmail = value => {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

// function that verifies if a string has a given length or not
export const validateLength = (value, length) => {
  if (value.length >= length) {
    return true;
  }
  return false;
};

