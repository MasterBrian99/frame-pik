import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MediaT } from "@/types/media-type";

const MediaCard = ({ id, type, url, username }: MediaT) => {
  return (
    <div className="mb-8 overflow-hidden rounded-lg ">
      <div className="relative aspect-[4/3]">
        <img
          src={url}
          alt={`Image by ${username}`}
          className="object-cover w-full "
        />
      </div>
      <div className="p-4 ">
        <a href={`/media/${id}`} className="flex items-center" target="_blank">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <p className="ml-2 text-sm font-semibold text-gray-700">{username}</p>
        </a>
      </div>
    </div>
  );
};

export default MediaCard;
