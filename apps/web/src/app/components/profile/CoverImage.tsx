import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { useContext, useState } from "react";
import ImageUploadDialog from "./ImageUploadDialog";
import { ProfileContext } from "@/app/context/ProfileContext";

interface CoverImageProps {
  src: string;
}
function CoverImage({ src}: CoverImageProps) {
  const [openImageChangeDialog, setOpenImageChangeDialog] = useState(false);
  const context = useContext(ProfileContext);
  if (!context || !context?.profile) return null;
  const handleEdit = async (file: File) => {
    try {
      await context.updateProfile({ coverPicture: file });
      setOpenImageChangeDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative mb-4">
      <img
        src={src}
        alt="Cover"
        className="w-full h-56 object-cover rounded-lg"
      />
      <Button
        className={`absolute top-2 right-2 cursor-pointer`}
        data-edittype="Cover"
        onClick={() => setOpenImageChangeDialog(true)}
      >
        Edit <PenLine />
      </Button>
      <ImageUploadDialog
        open={openImageChangeDialog}
        type="Cover"
        onCancel={() => setOpenImageChangeDialog(false)}
        loading={context.loading}
        onSuccess={handleEdit}
      />
    </div>
  );
}

export default CoverImage;
