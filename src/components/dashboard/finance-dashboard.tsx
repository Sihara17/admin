import {
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts"
import Link from "next/link"
import { StatsCard } from "./stats-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const financialData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 5000, profit: 3800 },
  { month: "Apr", revenue: 4780, profit: 2908 },
  { month: "May", revenue: 6890, profit: 4800 },
  { month: "Jun", revenue: 5390, profit: 3800 },
];

export function FinanceDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$128,483.21"
          description="+18.7% from last month"
          icon={DollarSign}
        />
        <StatsCard
          title="Net Profit"
          value="$46,921.45"
          description="+22.3% from last month"
          icon={TrendingUp}
        />
        <StatsCard
          title="Operating Costs"
          value="$81,561.76"
          description="+15.1% from last month"
          icon={TrendingDown}
        />
        <StatsCard
          title="Avg. Transaction"
          value="$212.80"
          description="-1.2% from last month"
          icon={DollarSign}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs. Profit</CardTitle>
            <CardDescription>First half of the year.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted))" }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Legend iconSize={10} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              A log of recent financial transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium"><code className="font-code">INV-0005</code></TableCell>
                  <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><code className="font-code">INV-0004</code></TableCell>
                  <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><code className="font-code">INV-0003</code></TableCell>
                  <TableCell><Badge variant="destructive">Unpaid</Badge></TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><code className="font-code">INV-0002</code></TableCell>
                  <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$450.00</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell className="font-medium"><code className="font-code">INV-0001</code></TableCell>
                  <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$550.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
