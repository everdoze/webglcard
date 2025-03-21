import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardCloseButton,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Gamepad, Music, Github } from "lucide-react";
import {Button} from "@/components/ui/button";
import EventSystem from "@/app/events";

const hobbies = [
  {
    label: "Music Production",
    description: "I create downtempo and electronic music.",
    icon: Music,
    linkLabel: "SoundCloud",
    href: "https://soundcloud.com/peach_formant",
  },
  {
    label: "Game Engine Development",
    description: "Building a custom 3D engine in C++.",
    icon: Github,
    linkLabel: "GitHub Repository",
    href: "https://github.com/everdoze/VulkanEngine",
  },
  {
    label: "Gaming",
    description: "I enjoy immersive games and game design.",
    icon: Gamepad,
    linkLabel: null,
    href: null,
  },
];

const Hobbies = ({ onClose }) => {
  return (
    <Card
      className="relative w-full max-w-xl mx-4"
    >
      <CardCloseButton onClick={onClose}/>
    
      <CardHeader>
        <CardTitle>Hobbies & Projects 🎮</CardTitle>
        <CardDescription>Creative and technical activities beyond work.</CardDescription>
      </CardHeader>
    
      <CardContent className="space-y-4">
        {hobbies.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-4 p-3 rounded hover:bg-teal-500/10 transition-colors"
          >
            <item.icon className="w-6 h-6 text-teal-400 mt-1" />
            <div className="text-foreground text-sm">
              <div className="font-medium text-base mb-1">{item.label}</div>
              <div className="text-muted-foreground mb-1">{item.description}</div>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:underline text-sm"
                >
                  {item.linkLabel}
                </a>
              )}
            </div>
          </div>
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

export default Hobbies;
