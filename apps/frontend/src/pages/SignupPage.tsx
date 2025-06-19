import AuthComponent from "../components/AuthComponent";

export default function SignupPage() {
  return (
    <AuthComponent
      title={"Create an account"}
      bottomText={"Do you have an account?"}
      linkTo={"/signin"}
      linkText={"Login"}
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="john"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="border-black/15 rounded-xl border-2 text-xs py-2 px-3"
            placeholder="John Doe"
          />
        </div>

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
          Register
        </button>
      </form>
    </AuthComponent>
  );
}
