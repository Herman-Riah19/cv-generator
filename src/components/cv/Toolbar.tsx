"use client";

import { Settings } from "lucide-react";
import { CVData } from "@/types/cv";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { LanguageToggle } from "./LanguageToggle";
import { AiConfig } from "./AiConfig";
import { ThemeSelector } from "./ThemeSelector";
import { JsonImportExport } from "./JsonImportExport";

interface ToolbarProps {
  data: CVData;
  onThemeChange?: (theme: string) => void;
  onImport?: (data: CVData) => void;
}

export function Toolbar({ data, onThemeChange, onImport }: ToolbarProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Settings className="h-4 w-4" />
          Outils
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Outils CV</DrawerTitle>
          <DrawerDescription>
            Configuration, thème, export et import
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6 overflow-y-auto">
          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="language" className="border rounded-lg px-4">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Langue</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <LanguageToggle />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai" className="border rounded-lg px-4">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Configuration IA</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AiConfig />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="theme" className="border rounded-lg px-4">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Thème</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ThemeSelector onThemeChange={onThemeChange} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="json" className="border rounded-lg px-4">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Export / Import JSON</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <JsonImportExport data={data} onImport={onImport} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
