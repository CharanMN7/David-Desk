'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const fetchLeaveRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
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
      console.log('Raw API response:', data);

      if (!Array.isArray(data.data)) {
        throw new Error('Invalid data structure received from API');
      }

      // Log all requests and their statuses
      data.data.forEach((request: any) => {
        console.log(`Request ID: ${request.id}, Status: ${request.status}, Type of status: ${typeof request.status}`);
      });

      // Filter requests with status 1, with extra logging
      const pendingRequests = data.data.filter((request: any) => {
        const hasStatus1 = request.status === 1;
        console.log(`Request ${request.id}: status=${request.status}, matches status 1? ${hasStatus1}`);
        return hasStatus1;
      });

      console.log('Pending requests:', pendingRequests);
      
      if (pendingRequests.length === 0) {
        console.log('No requests with status 1 found in:', data.data);
      }

      setLeaveRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      setError('Failed to fetch leave requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update leave request status
  const updateLeaveRequestStatus = useCallback(async (id: number, status: number) => {
    try {
      console.log(`Attempting to update request - ID: ${id}, Status: ${status}`);
      if (!id) {
        console.error('Invalid request ID:', id);
        setError('Invalid request ID');
        return;
      }

      console.log(`Attempting to update request - ID: ${id}, Status: ${status}`);

      const response = await fetch(
        `https://david-backend-production.up.railway.app/user/update-leave-request?id=${id}&status=${status}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      const result = await response.json();
      console.log('Update response:', result);

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      if (result.status === true) {
        setLeaveRequests(prevRequests => prevRequests.filter(request => request.id !== id));
        setError(null);
        
        const statusText = status === 2 ? 'Accepted' : 'Rejected';
        console.log(`Request ${statusText} successfully`);
        
        fetchLeaveRequests();
      } else {
        throw new Error('Failed to update request status');
      }
    } catch (error) {
      console.error('Error updating leave request:', error);
      setError('Failed to update leave request. Please try again.');
    }
  }, [fetchLeaveRequests]);

  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex flex-col min-h-screen overflow-auto">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Active Leave Requests ({leaveRequests.length})</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fetchLeaveRequests()}
            >
              Refresh
            </Button>
          </div>
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
                      <p className="text-sm text-muted-foreground mt-2">
                        Subject: {request.subject}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Reason: {request.reason}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Status: {request.status}
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