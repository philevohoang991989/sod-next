'use client'
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import useApiAuth from '@/lib/hook/useAxiosAuth';

type Props = {
  params: {locale: string};
};

export default  function  IndexPage({params: {locale}}: Props) {
  const [posts, setPosts] = useState();
  const { data: session, status } = useSession();
  const axiosAuth = useApiAuth();

  const fetchPost = async () => {
    try {
      const res = await axiosAuth.get("Course");
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchPost();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div >
      {/* <pre>{JSON.stringify(se)}</pre> */}
      <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
    </div>
  );
}
