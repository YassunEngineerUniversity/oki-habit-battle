import { cookies } from 'next/headers';

export const getCurrentUser = async () => {
  const cookieStore = await cookies(); 
  const session = cookieStore.get('_habitbattle_session');
  if (!session) return null;
   
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/me';
  const response = await fetch(endpoint, {
    headers: {
      method: 'GET',
      Cookie: cookieStore.toString(),
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();
    return{
      success: false,
      message: Array.isArray(data.errors) ? data.errors[0] : data.errors,
    };
  }

  const data = await response.json();
  return {
    success: true,
    data
  };
};
