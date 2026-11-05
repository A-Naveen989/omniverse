
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";

const ADMIN_EMAIL = "admin@omniverse.com";
const ADMIN_PASSWORD = "Admin@123";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("omniverse-admin-auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08080d] px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12121a] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400">
            <Sparkles size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-black">
            OMNI<span className="text-purple-500">VERSE</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Administrator Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-4">
              <Mail size={18} className="text-gray-500" />

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="admin@omniverse.com"
                required
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-4">
              <LockKeyhole size={18} className="text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent py-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold transition hover:bg-purple-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Demo Credentials
          </p>
          <p className="mt-2 text-sm text-gray-300">
            Email: admin@omniverse.com
          </p>
          <p className="mt-1 text-sm text-gray-300">
            Password: Admin@123
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-gray-400 transition hover:text-purple-400"
        >
          ← Return to Website
        </Link>
      </div>
    </main>
  );
}
