'use client'

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, JSX } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ComputerIcon, Mic2Icon, MicIcon, ProjectorIcon, X, SpeakerIcon, PrinterIcon } from 'lucide-react'
type Request = {
  id: number
  faculty_name: string
  resource_type: string
  time_slot: string
  branch: string
  status: number
  created_at: string
}

type Classroom = {
  id: number
  name: string
  subject: string
  faculty: string
  time_slot: string
  occupied: boolean
}

type Equipment = {
  id: number
  name: string
  icon: JSX.Element
  count: number
}

export default function InventoryDashboard() {
  const [requests, setRequests] = useState<Request[]>([])
  const [error, setError] = useState<string | null>(null)

  const classrooms: Classroom[] = [
    { id: 1, name: 'LH 101', subject: 'DSA', faculty: 'Dr. Rajesh Khanna ', time_slot: '10am to 11am', occupied: true },
    { id: 2, name: 'LH 102', subject: 'AI', faculty: 'Dr. Meera Sharma', time_slot: '11am to 12pm', occupied: false },
    { id: 3, name: 'LH 103', subject: 'OS', faculty: 'Dr. Amit Patel', time_slot: '12pm to 1pm', occupied: true },
    { id: 4, name: 'LH 104', subject: 'DBMS', faculty: 'Dr. Kavita Nair', time_slot: '1pm to 2pm', occupied: false },
    { id: 5, name: 'LH 105', subject: 'Networks', faculty: 'Dr. Ramesh Gupta', time_slot: '9am to 10am', occupied: true },
    { id: 6, name: 'LH 106', subject: 'Mathematics', faculty: 'Dr. Sarah Johnson', time_slot: '2pm to 3pm', occupied: false },
    { id: 7, name: 'LH 107', subject: 'Applied Mechanics', faculty: 'Dr. Sushmita Rao', time_slot: '3pm to 4pm', occupied: true },
    { id: 8, name: 'LH 108', subject: 'ML', faculty: 'Dr. Alok Jain', time_slot: '4pm to 5pm', occupied: false },
    { id: 9, name: 'LH 109', subject: 'DL', faculty: 'Prof. Swati Desai', time_slot: '3pm to 4pm', occupied: false },
    { id: 10, name: 'LH 110', subject: 'CRYPTO', faculty: 'Dr. Vishal', time_slot: '4pm to 5pm', occupied: true },
    { id: 11, name: 'LH 111', subject: 'DL', faculty: 'prof Swathi Desai', time_slot: '5pm to 6pm', occupied: true },
    { id: 12, name: 'LH 112', subject: 'LLM', faculty: 'DR Khan sir', time_slot: '5pm to 6pm', occupied: true }
  ];
  
  const equipment: Equipment[] = [
    { id: 1, name: 'Projectors', icon: <ProjectorIcon />, count: 12 },
    { id: 2, name: 'Mics', icon: <Mic2Icon />, count: 20 },
    { id: 3, name: 'Computers', icon: <ComputerIcon />, count: 15 },
    { id: 4, name: 'Speakers', icon: <SpeakerIcon />, count: 10 },
    { id: 5, name: 'Printers', icon: <PrinterIcon />, count: 5 }
  ]

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
        setRequests(data.requests.filter((request: Request) => request.status === 1 || request.status === 2 || request.status == 3))
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
      console.error('Failed to update request status:', error)
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
            {/* Equipment Section */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Equipment</h2>
              <div className="flex gap-4 flex-wrap">
                {equipment.map((item) => (
                  <Card key={item.id} className="w-[140px]">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        {item.icon}
                      </div>
                      <p className="text-sm mt-2 font-medium">{item.name}</p>
                      <p className="text-sm mt-1">{item.count}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>


            <section>
              <h2 className="text-lg font-semibold mb-4">Classrooms</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {classrooms.map((classroom) => (
                  <Card
                    key={classroom.id}
                    className={
                      classroom.occupied
                        ? "bg-orange-100"
                        : "bg-green-100"
                    }
                  >
                    <CardContent className="p-4">
                      {/* Classroom name at the top */}
                      <p className="font-bold text-lg">{classroom.name}</p>

                      {/* Subject below the name */}
                      <p className="text-sm text-muted-foreground mb-2">
                        {classroom.subject}
                      </p>

                      {/* Faculty name on the left and time slot on the right */}
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>{classroom.faculty}</p>
                        <p>{classroom.time_slot}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>


            {/* Active Requests Section */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Active Requests</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {Request.length > 0 ? (
                <div className="grid gap-4">
                  {requests.map((request: Request) => (
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