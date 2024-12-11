"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Camera } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const formSchema = z.object({
  photo: z.string(),
});

export default function MyForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      toast.error("Failed to access camera");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      // Convert to JPEG format
      const jpegImage = canvas.toDataURL("image/jpeg");
      setImagePreview(jpegImage);

      // Stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!imagePreview) {
        toast.error("Please capture a photo first");
        return;
      }

      // Convert base64 to blob
      const base64Response = await fetch(imagePreview);
      const blob = await base64Response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append("photo", blob, "photo.jpg");

      // Send to API
      const response = await fetch("https://google.com/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Photo uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload photo");
    }
  };

  return (
    <ContentLayout title="Register Faculty">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Take Photo</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                      style={{ display: imagePreview ? "none" : "block" }}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Captured photo"
                        className="w-full rounded-lg"
                      />
                    )}
                    <div className="flex gap-2">
                      {!imagePreview ? (
                        <>
                          <Button type="button" onClick={startCamera}>
                            <Camera className="mr-2 h-4 w-4" />
                            Start Camera
                          </Button>
                          <Button type="button" onClick={capturePhoto}>
                            Capture
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            startCamera();
                          }}
                        >
                          Retake
                        </Button>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Use your camera to take a photo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!imagePreview}>
            Submit Photo
          </Button>
        </form>
      </Form>
    </ContentLayout>
  );
}
