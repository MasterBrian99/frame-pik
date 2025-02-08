import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-xs">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
