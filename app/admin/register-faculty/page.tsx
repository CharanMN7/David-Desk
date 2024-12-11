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
  photo: z.any(), // Changed from z.string() to z.any() to handle File object
});

export default function MyForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: null,
    },
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
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0);
        const jpegImage = canvas.toDataURL("image/jpeg");
        setImagePreview(jpegImage);
        form.setValue("photo", jpegImage); // Set the form value

        // Stop camera stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
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
      const base64Data = imagePreview.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      // Create FormData
      const formData = new FormData();
      formData.append("photo", blob, "photo.jpg");

      // Send to API
      const response = await fetch(
        "https://7a9d-103-177-203-130.ngrok-free.app/add-faculty",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
            "Access-Control-Allow-Headers":
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
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
