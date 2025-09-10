"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const returnFormSchema = z.object({
  orderId: z.string().min(1, { message: "Order ID is required." }),
  product: z.string().min(1, { message: "Please select a product." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  reason: z.string().min(10, { message: "Reason must be at least 10 characters." }),
  invoiceStatus: z.enum(["paid", "unpaid"], {
    required_error: "You need to select the invoice status.",
  }),
})

export default function ReturnsPage() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof returnFormSchema>>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      orderId: "",
      product: "",
      quantity: 1,
      reason: "",
    },
  })

  function onSubmit(values: z.infer<typeof returnFormSchema>) {
    console.log(values)
    toast({
      title: "Return Processed",
      description: `Return for Order ID ${values.orderId} has been successfully submitted.`,
    })
    form.reset()
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Refund / Return Goods</CardTitle>
          <CardDescription>Process refunds and returns for goods.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., ORD-2024-00123" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the original order identification number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product to Return</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="prod-001">Laptop Pro 15-inch</SelectItem>
                        <SelectItem value="prod-002">Wireless Mouse</SelectItem>
                        <SelectItem value="prod-003">Mechanical Keyboard</SelectItem>
                        <SelectItem value="prod-004">4K Monitor 27-inch</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Return</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the reason for the return..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoiceStatus"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Original Invoice Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="paid" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Invoice Already Paid
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="unpaid" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Invoice Not Yet Paid
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Process Return</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
