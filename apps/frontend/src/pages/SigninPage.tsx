import AuthComponent from "../components/AuthComponent";

export default function SigninPage() {
  return (
    <AuthComponent
      title={"Login to your account"}
      bottomText={"Don't have an account?"}
      linkTo={"/signup"}
      linkText={"Register"}
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="johndoe@test.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="123456"
          />
        </div>

        <button className="text-white bg-red-600 py-3 px-4 rounded-full cursor-pointer">
          Login
        </button>
      </form>
    </AuthComponent>
  );
}
