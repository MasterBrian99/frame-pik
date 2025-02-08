import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dropzone,
  DropZoneArea,
  DropzoneTrigger,
  DropzoneMessage,
  useDropzone,
} from "@/components/ui/dropzone";
import {
  useUploadProfileImage,
  useUserProfile,
} from "@/services/hooks/use-user";
const ProfileAvatar = () => {
  const profileImage = useUserProfile();
  const uploadProfileImage = useUploadProfileImage();
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      const data = new FormData();
      data.append("file", file);
      await uploadProfileImage.mutateAsync(data, {
        onSuccess: async () => {
          await profileImage.refetch();
        },
      });
      return {
        status: "success",
        result: URL.createObjectURL(
          profileImage.data ? profileImage.data : file
        ),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  });

  return (
    <Dropzone {...dropzone}>
      <div className="flex justify-between">
        <DropzoneMessage />
      </div>
      <DropZoneArea className="border-none">
        <DropzoneTrigger className="flex gap-8 text-sm bg-transparent border-none hover:bg-transparent">
          <Avatar className="w-32 h-32 transition-all border border-blue-400 hover:cursor-pointer hover:scale-105">
            <AvatarImage
              src={
                profileImage.isSuccess
                  ? URL.createObjectURL(profileImage.data)
                  : ""
              }
              alt="User's profile picture"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </DropzoneTrigger>
      </DropZoneArea>
    </Dropzone>
  );
};

export default ProfileAvatar;
