import { LoginFormData } from "@/types/login/types";

const login = async (formData: LoginFormData) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/login';

  const payload = {
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

export default login;