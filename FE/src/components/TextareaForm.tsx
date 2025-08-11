"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useDialog } from "@/contexts/DialogContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    reason: z
        .string()
        .min(1, { message: "Reason must be required" })
});

export function TextareaForm({ onSubmitForm }: { onSubmitForm?: (data: z.infer<typeof FormSchema>) => void }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            reason: ''
        }
    });

    const { hideDialog } = useDialog();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (onSubmitForm) onSubmitForm(data);
        hideDialog();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lý do hủy</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Nhập lý do hủy đơn hàng..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-4 items-center *:cursor-pointer">
                    <div
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border px-3 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                        onClick={() => hideDialog()}
                    >
                        Hủy
                    </div>
                    <Button type="submit">Gửi</Button>
                </div>
            </form>
        </Form>
    );
}
