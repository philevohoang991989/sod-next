"use client";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LayoutDashboard, User2Icon } from "lucide-react";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  const t = useTranslations("IndexPage");

  return (
    <div className="lg:p-8 h-full flex flex-col items-center justify-center">
      <Card className="mx-auto flex w-full h-[15rem] shadow-lg border-none bg-white flex-col justify-center space-y-6 sm:w-[350px]">
        <CardHeader>
          <CardTitle>Portal Selection</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
            <a href="/create">
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <LayoutDashboard className="mb-2" />
                Admin
              </Label>
            </a>
            <a>
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
              />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <User2Icon className="mb-2" />
                User
              </Label>
            </a>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
