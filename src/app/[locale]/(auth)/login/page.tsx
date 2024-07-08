"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  password: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
  username: "",
  password: "",
};
const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Login() {
  const locale = useLocale();
  const router = useRouter();
  const [isOtp, setIsOtp] = useState<boolean>(false);

  const axiosAuth = useApiAuth();
  const onSubmit = async (data: LoginFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    const res = axiosAuth
      .post("Authentication/login", {
        userName: btoa(data.username),
        password: btoa(data.password),
      })
      .then((res) => {
        console.log({ res });
        axiosAuth.post(`Authentication/otp?userId=${res.data}`, {});
        setIsOtp(true);
      });
  };
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  async function onSubmitOTP(data: z.infer<typeof FormSchema>) {
    try {
      // Wait for the signIn function to resolve
      const dataSignIn = await signIn("credentials", {
        otp: data.otp,
        redirect: false,
      });

      // Display the toast notification with the submitted values
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      dataSignIn?.url && router.push("/" + locale);
    } catch (error) {
      // Handle any errors that occur during the sign-in process
      console.error(error);
    }
  }

  const formOTP = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  return (
    <div className="container md:h-[800px]">
      <div className="lg:p-8 h-full flex flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center  space-y-6 sm:w-[350px]">
          {isOtp ? (
            <Card className="border-none shadow-lg bg-white md:min-w-[30rem]">
              <Form {...formOTP}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl ">Verification Code</CardTitle>
                </CardHeader>

                <form
                  onSubmit={formOTP.handleSubmit(onSubmitOTP)}
                  className="p-6 pt-0 grid gap-4"
                >
                  <div className="grid gap-2">
                    <FormField
                      control={formOTP.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OTP</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <div className="flex justify-start items-center gap-1">
                            <span>Didn’t receive the code in mailbox?</span>
                            <Button variant="link" className="h-0 p-0">
                              Resend code
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Button type="submit">Verify</Button>
                    <Button variant="link">Back</Button>
                  </div>
                </form>
              </Form>
            </Card>
          ) : (
            <Form {...form}>
              <Card className="border-none shadow-lg bg-white md:min-w-[30rem]">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader className="pt-[48px] px-[32px]">
                    <span className="text-[20px] text-[#101828] font-semibold">
                      Login
                    </span>
                  </CardHeader>
                  <CardContent className="grid gap-4 px-[32px]">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Your password"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="pb-[48px] px-[32px] flex flex-col gap-[32px]">
                    <Button className="w-full" type="submit">
                      Login
                    </Button>
                    <Button variant="link">
                      Forget password for Internet account?
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
