import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileAvatar from "./components/avatar";
const ProfilePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <ProfileAvatar />
        <p className="mb-4 text-3xl font-bold">Jhon Doe</p>
        <div className="flex flex-col justify-center space-y-2 text-center">
          <p className="">john.doe@example.com</p>
          <p className="">url</p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="inline-flex items-center justify-start w-full p-0 bg-transparent border-b rounded-none h-9 text-muted-foreground">
            <TabsTrigger
              value="account"
              className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              value="password"
            >
              Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
