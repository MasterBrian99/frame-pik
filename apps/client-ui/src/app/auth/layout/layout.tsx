import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center flex-1 h-full mx-3 mt-12">
      <div className="w-full max-w-xs">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
