/* eslint-disable @typescript-eslint/no-unused-vars */
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
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Camera } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const formSchema = z.object({
  face: z.any(), // Changed from z.string() to z.any() to handle File object
});

export default function MyForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      face: null,
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
      console.log(error);
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
        form.setValue("face", jpegImage); // Set the form value

        // Stop camera stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      }
    }
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(false);
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
      formData.append("face", blob, "face.jpg");

      // console.log(
      //   "Sending request to:",
      //   "https://f793-103-177-203-130.ngrok-free.app/add-faculty/",
      // );
      console.log("Request payload:", formData);

      const response = await fetch(
        "https://1147-103-177-203-130.ngrok-free.app/add-faculty/",
        {
          method: "POST",
          body: formData,
          credentials: "include",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        },
      );

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const data = await response.json();
      console.log("Success response:", data);
      toast.success("Faculty registered successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload: ${error}`);
    }
  };

  return (
    <ContentLayout title="Register Faculty">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10 text-center"
        >
          <FormField
            control={form.control}
            name="face"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Take Photo</FormLabel> */}
                <FormControl>
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg max-h-[50vh]"
                      style={{ display: imagePreview ? "none" : "block" }}
                    />
                    {imagePreview && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreview}
                        alt="Captured photo"
                        className="w-full rounded-lg"
                      />
                    )}
                    <div className="flex gap-2 justify-center">
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
                <FormDescription className="text-center">
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
