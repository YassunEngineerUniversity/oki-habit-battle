import { cookies } from 'next/headers';

export const callApi = async (url:string, options: any) => {
  const cookieStore = await cookies();
  const session = cookieStore.get('_habitbattle_session');
  if (!session) return null;
   
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + url;

  const headers = {
    Cookie: cookieStore.toString(),
    ...options.headers,
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...headers,
    },
    credentials: 'include',
  });
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(data.errors) ? data.errors[0] : data.errors
    return{
      success: false,
      message: errorMessage ? errorMessage : "エラーが発生しました",
    };
  }
  
  return {
    success: true,
    data
  };
};
