"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar, BarChart } from "recharts"

const salesReportData = [
  { date: "2024-07-01", orders: 15, revenue: 1500 },
  { date: "2024-07-02", orders: 20, revenue: 2200 },
  { date: "2024-07-03", orders: 18, revenue: 1900 },
  { date: "2024-07-04", orders: 25, revenue: 2800 },
  { date: "2024-07-05", orders: 22, revenue: 2500 },
];

const financeReportData = [
  { category: "Product Sales", amount: 75000 },
  { category: "Salaries", amount: -25000 },
  { category: "Marketing", amount: -10000 },
  { category: "Software", amount: -5000 },
  { category: "Other Income", amount: 2000 },
]

function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: addDays(new Date(2024, 6, 1), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default function ReportsPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="sales">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DatePickerWithRange />
            <Button>Export</Button>
          </div>
        </div>
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
              <CardDescription>
                An overview of sales within the selected date range.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesReportData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis yAxisId="left" stroke="hsl(var(--primary))" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                    }}
                  />
                  <Legend iconSize={10} />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="hsl(var(--primary))" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="hsl(var(--accent))" />
                </LineChart>
              </ResponsiveContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReportData.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.orders}</TableCell>
                      <TableCell className="text-right">${row.revenue.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Finance Report</CardTitle>
              <CardDescription>
                A summary of financial inflows and outflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financeReportData} layout="vertical">
                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                   <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                   <YAxis type="category" dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                   <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                    }}
                  />
                  <Bar dataKey="amount" name="Amount ($)">
                    {financeReportData.map((entry, index) => (
                       <div key={`cell-${index}`} fill={entry.amount > 0 ? "hsl(var(--accent))" : "hsl(var(--primary))"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financeReportData.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell>{row.category}</TableCell>
                      <TableCell className={cn("text-right", row.amount > 0 ? "text-green-500" : "text-red-500")}>
                        {row.amount > 0 ? '+' : ''}${Math.abs(row.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
