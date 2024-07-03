import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
// import { ApiAuth } from "../axios";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const useApiAuth = () => {
  const { data: session } = useSession();
  const { toast } = useToast()
 
  const ApiAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
 
  ApiAuth.interceptors.request.use(
    (config) => {
      if (session?.token) {
        config.headers['Authorization'] = `Bearer ${session.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  ApiAuth.interceptors.response.use(
    (response) => {
      // Handle successful responses globally if needed
      return response;
    },
    async (error) => {
      // Handle errors globally if needed
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        prevRequest.headers["Authorization"] = `Bearer ${session?.token}`;
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
        signOut()
        return ApiAuth(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return ApiAuth;
};

export default useApiAuth;
