"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { FormError } from "./form-error";
import { LoginSchema } from "../../../schemas";
import { FormSuccess } from "./form-success";
import { login } from "../../../actions/login";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    login(data).then((res) => {
      if (res?.error) {
        setError(res?.error);
        setIsLoading(false);
      } else {
        setError("");
        setIsLoading(false);
      }
    });
  };
  return (
    <div>
      <CardWrapper
        headerLabel="Log in to your account"
        title="Login"
        backButtonHref="/register"
        backButtonLabel="Don't have an account? Register here"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johndoe@email.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link href="reset">Forgot Password?</Link>
              </Button>
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
        {/* <GoogleLogin /> */}
      </CardWrapper>
    </div>
  );
};

export default LoginPage;
