// utils/withAuth.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          router.replace('/auth/login');
        } else {
          setLoading(false);
        }
      };

      checkUser();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
