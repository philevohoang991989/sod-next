'use client'

import { SessionProvider, getSession, useSession } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const [token, setToken] = useState<string | null>(null);

  // Fetch session and extract token if needed
  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      if (session && session.token) {
        setToken(session.token as string);
      }
    };

    fetchToken();
  }, []);

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default Providers;