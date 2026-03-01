import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import ImageUploadDialog from "./ImageUploadDialog";
import { useState } from "react";

interface ProfileImageProps {
  src: string;
  onEdit: (newSrc: string) => void;
}
function ProfileImage({ src, onEdit }: ProfileImageProps) {
  const [openImageChangeDialog, setOpenImageChangeDialog] = useState(false);
  const handleEdit = (fileURL: string) => onEdit(fileURL);
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
          data-editType="Profile"
          onClick={() => setOpenImageChangeDialog(true)}
        >
          Edit <PenLine />
        </Button>
      </div>
       <ImageUploadDialog
        open={openImageChangeDialog}
        type="Profile"
        onCancel={() => setOpenImageChangeDialog(false)}
        onSuccess={handleEdit}
      />
    </div>
  );
}

export default ProfileImage;
