import { useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "../components/forms";
import { useRouter } from "next/router";
import { withSessionSsr } from "../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Google from "../assets/google.svg";
import Github from "../assets/github.svg";
import Image from "next/image";
/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const loginform = useRef(null);

  const notify = () => toast("Wow so easy !");

  const formSubmit = async (data) => {
    if (data) {
      const { email, password } = data;
      const response = await toast.promise(
        axios.post("/api/login", { email, password }),
        {
          pending: "login processing...",
          error: "Please provide a valid email address and password.",
        }
      );
      if (response.status === 200) {
        router.push("/dashboard");
      }
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="hidden h-full flex-1 lg:flex"></div>
      <div className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-[#e0ecf8d4] via-[#eff7ff] to-[#fafbfd] px-6">
        <img
          src="https://play.tailwindcss.com/img/beams.jpg"
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40"
        />
        <div className="relative h-auto w-full flex-none space-y-4 rounded-md border bg-white py-10 px-8 shadow-lg md:w-[500px]">
          {isLoading ? (
            <div className="absolute inset-0 flex animate-pulse overflow-hidden rounded-t-md">
              <div className="h-2 flex-1 animate-waving-hand rounded bg-indigo-500"></div>
            </div>
          ) : null}
          <h1 className="text-center align-middle text-4xl font-semibold">
            Log in
          </h1>
          <ToastContainer autoClose={2000} />
          <form
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
            action="/api/login"
            className="flex flex-col space-y-2"
            ref={loginform}
          >
            <Input
              label="email"
              register={register}
              errors={errors}
              required={{
                required: true,
                pattern: /\S+@\S+\.\S+/i,
              }}
              errMessage={{
                required: "Email is required",
                pattern: "Email is invalid",
              }}
            />
            <Input
              label="password"
              register={register}
              errors={errors}
              required={{
                required: true,
                minLength: 4,
              }}
              errMessage={{
                required: "This field is required",
                minLength: "Password must be at least 4 characters",
              }}
            />
            <div className="flex w-full">
              <button
                type="submit"
                className="mt-10 w-full rounded-md border-2 border-[#78a2b5] bg-[#03A9F4] py-3 font-bold text-white shadow-md"
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="flex-grow border-2 border-t border-slate-100"></div>
              <span className="text-md flex-shrink font-semibold text-slate-400/80">
                OR
              </span>
              <div className="flex-grow border-2 border-t border-slate-100"></div>
            </div>
            <button
              type="submit"
              className="flex w-full items-center gap-4 rounded-md border-2 border-slate-300 p-3 text-slate-800 shadow-md"
            >
              <Image width={24} height={24} alt="" src={Github} />
              Continue With GitHub
            </button>
            <button
              type="submit"
              className="mt-10 flex w-full items-center gap-4 rounded-md border-2 border-slate-300 p-3 text-slate-800 shadow-md"
            >
              <Image src={Google} width={24} height={24} alt="" />
              Continue With Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(({ req }) => {
  const { passport } = req.session;
  if (passport?.user) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {
      data: null,
    },
  };
});

export default Home;
