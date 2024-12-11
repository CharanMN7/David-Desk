"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";

export default function InventoryDashboard() {
  // const [isManaging, setIsManaging] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col min-h-screen overflow-auto">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">
              Manage Inventory
            </h1>
            {/* <Switch checked={isManaging} onCheckedChange={setIsManaging} /> */}
          </div>

          <div className="grid gap-6">
            <section>
              <h2 className="text-lg font-semibold mb-4">Equipment</h2>
              <div className="flex gap-4">
                {[
                  { name: "Projector", count: 12 },
                  { name: "Mic", count: 20 },
                  { name: "Computers", count: 15 },
                ].map((item) => (
                  <Card key={item.name} className="w-[100px]">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <span className="text-xl font-bold">{item.count}</span>
                      </div>
                      <p className="text-sm mt-2">{item.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Classrooms</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Request</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Equipment</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Button>Send Request</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {Array.from({ length: 18 }).map((_, i) => (
                  <Card key={i} className={i < 3 ? "bg-primary/5" : ""}>
                    <CardContent className="p-4 aspect-square flex items-center justify-center">
                      {i < 3 ? (
                        <span className="text-primary font-bold">
                          LH{i + 1}
                        </span>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Active Requests</h2>
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Requirement for MIC</p>
                      <p className="text-sm text-muted-foreground">
                        by SomyaGupta for MECH (2023-2024)
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Projector</p>
                      <p className="text-sm text-muted-foreground">
                        by SomyaJohn for CSE(2023-2024)
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
