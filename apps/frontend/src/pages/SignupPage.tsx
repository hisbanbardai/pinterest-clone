import { useForm } from "react-hook-form";
import AuthComponent from "../components/AuthComponent";
import { signupSchema, type signupSchemaType } from "@repo/zod/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  async function handleFormSubmit(formData: signupSchemaType) {
    try {
      const { status } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/signup`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Unable to create a user");
      } else if (error instanceof Error) {
        toast.error("Unable to create a user");
      }
    }
  }

  return (
    <AuthComponent
      title={"Create an account"}
      bottomText={"Do you have an account?"}
      linkTo={"/signin"}
      linkText={"Login"}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="firstname">Name</label>
          <input
            type="text"
            {...register("name")}
            name="name"
            id="name"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastname">Username</label>
          <input
            type="text"
            {...register("username")}
            name="username"
            id="username"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="john_12"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="text"
            name="email"
            id="email"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="johndoe@test.com"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="123456"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="text-white bg-red-600 py-3 px-4 rounded-full cursor-pointer disabled:bg-red-200"
        >
          Register
        </button>
      </form>
    </AuthComponent>
  );
}
