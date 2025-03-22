import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardCloseButton,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";
import EventSystem from "@/app/events";

const contacts = [
  {
    label: "Email",
    value: "andrey.aulov@example.com",
    icon: Mail,
    href: "mailto:andrey.aulov@outlook.com",
  },
  {
    label: "GitHub",
    value: "github.com/everdoze",
    icon: Github,
    href: "https://github.com/everdoze",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/andrey-aulov",
    icon: Linkedin,
    href: "https://linkedin.com/in/andrey-aulov-71224121a",
  },
];

const Contacts = ({ onClose }) => {
  return (
    <Card
      className="relative w-full max-w-lg mx-4"
    >
      <CardCloseButton onClick={onClose}/>
    
      <CardHeader>
        <CardTitle>Contact Me 📬</CardTitle>
        <CardDescription>Reach out through any of the following channels:</CardDescription>
      </CardHeader>
    
      <CardContent className="space-y-4">
        {contacts.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded hover:bg-teal-500/10 transition-colors"
          >
            <item.icon className="w-5 h-5 text-teal-400" />
            <div className="text-foreground text-sm">
              <div className="font-medium">{item.label}</div>
              <div className="text-muted-foreground text-xs">{item.value}</div>
            </div>
          </a>
        ))}
      </CardContent>
  
      <CardFooter className="gap-2">
        <Button onClick={() => EventSystem.trigger('navigate-to', '/about')}>
          About me
        </Button>
        <Button variant="text" onClick={() => EventSystem.trigger('navigate-to', '/projects')}>
          Projects
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Contacts;
