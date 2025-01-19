"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  notification_type: z.string().min(1, "Notification type is required"),
  creator: z.string().min(1, "Creator name is required"),
  creator_image: z.string().optional(),
});

export default function AnnouncementForm() {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      notification_type: "",
      creator: "",
      creator_image: "image",
    },
  });

  async function sendNotification(title: string, description: string) {
    try {
      const notificationData = {
        title,
        description,
        topic: "alert",
      };

      const response = await fetch("https://david-backend-production.up.railway.app/send-notification", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });

      if (response.ok) {
        console.log("Notification sent successfully");
      } else {
        console.error("Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const submissionData = {
        ...values,
        status: "ACTIVE",
      };

      console.log("Submitting data:", submissionData);

      const response = await fetch("https://david-backend-production.up.railway.app/admin/create-notification", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.ok) {
        setSuccessMessage("Form submitted successfully");
        toast.success("Notification successfully created");
        
        // Send notification after successful form submission
        await sendNotification(values.title, values.description);
        
        form.reset();
      } else {
        toast.error(`Error: ${responseData.message || "Failed to submit the form."}`);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g. Python Programming Workshop for beginners this weekend." 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notification_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g. WORKSHOP, ANNOUNCEMENT, EVENT" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Technical Club Head" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creator_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator Image URL (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/images/creator.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

