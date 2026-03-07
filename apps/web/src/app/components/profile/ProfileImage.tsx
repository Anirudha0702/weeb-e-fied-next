import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import ImageUploadDialog from "./ImageUploadDialog";
import { useContext, useState } from "react";
import { ProfileContext } from "@/app/context/ProfileContext";

interface ProfileImageProps {
  src: string;
}
function ProfileImage({ src }: ProfileImageProps) {
  const context = useContext(ProfileContext);
  const [openImageChangeDialog, setOpenImageChangeDialog] = useState(false);
  if (!context || !context?.profile) return null;
  const handleEdit = async (file: File) => {
    try {
      await context.updateProfile({ profilePicture: file });
      setOpenImageChangeDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-52 shrink-0 order-1 sm:order-2 mx-auto sm:mx-0 p-4">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted/60 border cursor-pointer mx-auto">
        <img
          src={src}
          alt="profile"
          className="object-cover absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div className="flex justify-center mt-2">
        <Button
          className="h-7 flex items-center gap-2 cursor-pointer"
          data-edittype="Profile"
          onClick={() => setOpenImageChangeDialog(true)}
        >
          Edit <PenLine />
        </Button>
      </div>
      <ImageUploadDialog
        open={openImageChangeDialog}
        loading={context.loading}
        type="Profile"
        onCancel={() => setOpenImageChangeDialog(false)}
        onSuccess={handleEdit}
      />
    </div>
  );
}

export default ProfileImage;
