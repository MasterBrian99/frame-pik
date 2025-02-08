import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "@tanstack/react-router";
import { useUserProfile } from "@/services/hooks/use-user";
const Header = () => {
  const navigate = useNavigate();
  const profileImage = useUserProfile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 max-w-6xl px-4 mx-auto md:px-6">
        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Create
          </a>
        </nav>
        <div className="items-center hidden w-full gap-6 px-12 text-sm font-medium md:flex">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search..."
              className="w-full pl-8 rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <Search className="h-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
          {/* ///awatar  */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 ">
                <AvatarImage
                  src={
                    profileImage.isSuccess
                      ? URL.createObjectURL(profileImage.data)
                      : ""
                  }
                  alt="profile-image"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    navigate({
                      to: "/profile",
                    });
                  }}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ">
                        <AvatarImage
                          src={
                            profileImage.isSuccess
                              ? URL.createObjectURL(profileImage.data)
                              : ""
                          }
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 rounded-full shadow-inner"></div>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Jane Doe
                      </h2>
                      <p className="text-gray-600">Software Engineer</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
