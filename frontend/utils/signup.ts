import { SignupFormData } from "@/types/signup/types";


const signup = async (formData: SignupFormData) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/users';

  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  if(!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      message: Array.isArray(errorData.errors) ? errorData.errors[0] : errorData.errors,
    };
  }

  return {
    success: true,
  };
}

export default signup;