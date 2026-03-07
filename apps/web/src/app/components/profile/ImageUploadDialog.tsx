import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
interface ImageUploadDialogProps {
  open: boolean;
  type: "Cover" | "Profile";
  loading: boolean;
  onCancel: () => void;
  onSuccess: (file: File) => void;
}
function ImageUploadDialog({
  open,
  type,
  loading,
  onCancel,
  onSuccess,
}: ImageUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };
  const handleSave = () => {
    if (!preview || !file) return;
    onSuccess(file);
    setFile(null)
    setPreview(null)
  };
  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        className="bg-transparent border-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md "
        >
          <Card className="rounded-2xl shadow-xl">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-semibold">Upload {type} Image</h2>
                <p className="text-sm text-muted-foreground">
                  Choose an image to preview before saving.
                </p>
              </div>

              <div className="flex justify-center">
                <div
                  className={`relative overflow-hidden border bg-muted flex items-center justify-center cursor-pointer transition hover:opacity-90 ${
                    type === "Profile"
                      ? "w-40 h-40 rounded-full"
                      : "w-full h-40 rounded-xl"
                  }`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <UploadCloud className="w-6 h-6" />
                      <span className="text-xs">Click to upload</span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onCancel} disabled={loading}>
                  Cancel
                </Button>
                <Button disabled={!preview || loading} onClick={handleSave}>
                  {loading && <LoaderCircle className="animate-spin" />}
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageUploadDialog;
