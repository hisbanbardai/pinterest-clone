import { useState } from "react";
import AuthComponent from "../components/AuthComponent";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useAuthentication from "../hooks/useAuthentication";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuthentication();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { status, data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/signin`,
        { email, password },
        { withCredentials: true }
        //we need to add withCredentials: true otherwise it will not send the cookie
      );

      if (status === 200) {
        setIsSubmitting(false);
        handleLogin(data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Unable to login");
      } else if (error instanceof Error) {
        toast.error("Unable to login");
      }
    }
  }

  return (
    <AuthComponent
      title={"Login to your account"}
      bottomText={"Don't have an account?"}
      linkTo={"/signup"}
      linkText={"Register"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="johndoe@test.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="123456"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="text-white bg-red-600 py-3 px-4 rounded-full cursor-pointer disabled:bg-red-200"
        >
          Login
        </button>
      </form>
    </AuthComponent>
  );
}
