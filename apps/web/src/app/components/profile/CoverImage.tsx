import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { useState } from "react";
import ImageUploadDialog from "./ImageUploadDialog";

interface CoverImageProps {
  src: string;
  onEdit: (newSrc: string) => void;
}
function CoverImage({ src, onEdit }: CoverImageProps) {
  const [openImageChangeDialog, setOpenImageChangeDialog] = useState(false);
  const handleEdit = (fileURL: string) => onEdit(fileURL);
  return (
    <div className="relative mb-4">
      <img
        src={src}
        alt="Cover"
        className="w-full h-56 object-cover rounded-lg"
      />
      <Button
        className={`absolute top-2 right-2 cursor-pointer`}
        data-editType="Cover"
        onClick={() => setOpenImageChangeDialog(true)}
      >
        Edit <PenLine />
      </Button>
      <ImageUploadDialog
        open={openImageChangeDialog}
        type="Cover"
        onCancel={() => setOpenImageChangeDialog(false)}
        onSuccess={handleEdit}
      />
    </div>
  );
}

export default CoverImage;
