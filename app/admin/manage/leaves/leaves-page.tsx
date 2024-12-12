'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from 'lucide-react';

interface LeaveRequest {
  id: number;
  name: string;
  branch: string;
  roll: string;
  class_incharge: string;
  admin_name: string;
  subject: string;
  reason: string;
  status: number;
  created_at: string;
}

export default function LeavePageDashboard() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch leave requests
  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://david-backend-production.up.railway.app/admin/fetch-leave-requests', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data.data)) {
        setLeaveRequests(data.data.filter((request: LeaveRequest) => request.status === 1));
      } else {
        throw new Error('Invalid data structure received from API');
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      setError('Failed to fetch leave requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update leave request status
  const updateLeaveRequestStatus = async (id: number, status: number) => {
    try {
      const response = await fetch(`https://david-backend-production.up.railway.app/user/update-leave-request?id=${id}&status=${status}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove updated request from the list
      setLeaveRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error updating leave request:', error);
      setError('Failed to update leave request. Please try again.');
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex flex-col min-h-screen overflow-auto">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-7xl mx-auto w-full">
          <h2 className="text-lg font-semibold mb-4">Active Leave Requests</h2>
          {loading && <p className="text-blue-500 mb-4">Loading leave requests...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!loading && leaveRequests.length > 0 ? (
            <div className="grid gap-4">
              {leaveRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4 flex flex-col">
                    <div>
                      <p className="font-semibold">{request.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ({request.roll}) from {request.branch}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Reason: {request.reason}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Requested on: {new Date(request.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-500 hover:text-green-700 hover:bg-green-100"
                        onClick={() => updateLeaveRequestStatus(request.id, 2)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => updateLeaveRequestStatus(request.id, 3)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            !loading && <p>No active leave requests at the moment.</p>
          )}
        </main>
      </div>
    </div>
  );
}
