
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ComputerIcon, Mic2Icon, MicIcon, ProjectorIcon, X } from 'lucide-react'

interface Request {
  id: number
  faculty_name: string
  resource_type: string
  time_slot: string
  branch: string
  status: number
  created_at: string
}

export default function InventoryDashboard() {
  const [requests, setRequests] = useState<Request[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchRequests = async () => {
    try {
      const response = await fetch('https://david-backend-production.up.railway.app/admin/get-all-requests', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.status && Array.isArray(data.requests)) {
        setRequests(data.requests.filter((request: Request) => request.status === 1))
      } else {
        throw new Error('Invalid data structure received from API')
      }
      setError(null)
    } catch (error) {
      console.error('Error details:', error)
      setError('Failed to fetch requests. Please try again later.')
      setRequests([])
    }
  }

  const updateRequestStatus = async (id: number, status: number) => {
    try {
      const response = await fetch(`https://david-backend-production.up.railway.app/admin/update-request-status?id=${id}&status=${status}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id))
    } catch (error) {
      console.error(`Failed to update request status:, error`)
      setError('Failed to update request. Please try again.')
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex flex-col min-h-screen overflow-auto">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Manage Inventory</h1>
          </div>

          <div className="grid gap-6">
            {/* Inventory Section with Action Buttons */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Equipment</h2>
              <div className="flex gap-4">
                {[
                  { id: 1, name: <ProjectorIcon />, count: 12 },
                  { id: 2, name: <Mic2Icon />, count: 20 },
                  { id: 3, name: <ComputerIcon />, count: 15 },
                ].map((item) => (
                  <Card key={item.id} className="w-[140px]">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <span className="text-xl font-bold">{item.name}</span>
                      </div>
                      <p className="text-sm mt-2">{item.count}</p>
                      <div className="flex gap-2 mt-4">
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Classrooms</h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {Array.from({ length: 18 }).map((_, i) => (
                  <Card key={i} className={i < 3 ? "bg-primary/5" : ""}>
                    <CardContent className="p-4 aspect-square flex items-center justify-center">
                      {i < 3 ? <span className="text-primary font-bold">LH{i + 1}</span> : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            {/* Active Requests Section */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Active Requests</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {requests.length > 0 ? (
                <div className="grid gap-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{request.resource_type}</p>
                          <p className="text-sm text-muted-foreground">
                            by {request.faculty_name} for {request.branch}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Requested on: {new Date(request.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-500 hover:text-green-700 hover:bg-green-100"
                            onClick={() => updateRequestStatus(request.id, 2)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => updateRequestStatus(request.id, 3)}
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
                <p>{error ? 'Unable to load requests.' : 'No active requests at the moment.'}</p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
