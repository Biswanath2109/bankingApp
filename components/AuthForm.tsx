"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signUp } from "@/lib/actions/user.actions";
import signIn from "@/app/(auth)/sign-in/page";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          email:  data.email,
    password:  data.password,
    firstName:  data.firstName!,
    lastName:  data.lastName!,
    address1:  data.address1!,
    city: data.city!,
    state:  data.state!,
    postalCode:  data.postalCode!,
    dateOfBirth:  data.dateOfBirth!,
    ssn: data.ssn!,
        }
        const newUser = await signUp(userData);
        setUser(newUser);
        console.log(newUser);
      }
      if (type === "sign-in") {
        const response = signIn({
          email: data.email,
          password: data.password,
        });
        if (response) {
          console.log(response);
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
          
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please Enter your details"}
          </p>
          </h1>
        </div>
      </header>
      {user ? ( 
        <div className="flex flex-col gap-4">
        <PlaidLink user={user} variant="primary" />
        </div>)
       : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      id="firstname"
                      control={form.control}
                      placeholder="Enter your First Name"
                      name="firstName"
                      label="First Name"
                    />
                    <CustomInput
                      id="lastname"
                      control={form.control}
                      placeholder="Enter your Last Name"
                      name="lastName"
                      label="Last Name"
                    />
                  </div>

                  <CustomInput
                    id="address"
                    control={form.control}
                    placeholder="Enter your specific Address"
                    name="address1"
                    label="Address"
                  />
                  <CustomInput
                    id="city"
                    control={form.control}
                    placeholder="Enter your City"
                    name="city"
                    label="City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      id="state"
                      control={form.control}
                      placeholder="Ex: Uttar Pradesh"
                      name="state"
                      label="State"
                    />
                    <CustomInput
                      id="postalcode"
                      control={form.control}
                      placeholder="Ex: 201009"
                      name="postalCode"
                      label="Postal Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      id="dateOfBirth"
                      control={form.control}
                      placeholder="DD-MM-YYYY"
                      name="dateOfBirth"
                      label="Date of Birth"
                    />
                    <CustomInput
                      id="ssn"
                      control={form.control}
                      placeholder="ssn"
                      name="ssn"
                      label="SSN"
                    />
                  </div>
                </>
              )}
              <CustomInput
                id="email"
                control={form.control}
                placeholder="Enter your Email"
                name="email"
                label="Email"
              />
              <CustomInput
                id="password"
                control={form.control}
                placeholder="Enter your Password"
                name="password"
                label="Password"
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" disabled={isLoading} type="submit">
                  {isLoading ? (
                    <>
                      Loading...
                      <Loader2 size={20} className="animate-spin" />
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an Account?"
                : "Already have an Account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )} 
    </section>
  );
};

export default AuthForm;
