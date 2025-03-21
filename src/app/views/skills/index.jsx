import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardCloseButton,
  CardFooter
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Tag} from "@/components/ui/tag";
import EventSystem from "@/app/events";

const skillsData = [
  {
    category: "💻 Languages & Frameworks",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "Java", "Node.js", "React", "Redux"],
    colors: ["#FFD87280", "#3178c680", "#FF72727F", "#00599c80", "#b0721980", "#68a06380", "#61dafb80", "#764abc80"]
  },
  {
    category: "🌐 Web Development",
    skills: ["HTML & CSS", "SCSS/SASS", "Tailwind CSS", "shadcn/ui", "Webpack", "Git", "SQL"],
    colors: ["#e34c2680", "#cd679980", "#38bdf880", "#6366f180", "#8ed6fb80", "#f0503280", "#00758f80"]
  },
  {
    category: "🛠️ Tools & Platforms",
    skills: ["🐳 Docker", "🚀️ GitHub Actions", "⚡ Redis"],
    colors: ["#0db7ed80", "#FFB69A7F", "#9FD4007F"]
  },
  {
    category: "🤝 Soft Skills",
    skills: ["👥 Team Leadership", "🔍 Code Review", "🚦 Agile Methodology"],
    colors: ["#45CE5D80", "#9c27b080", "#ff980080"]
  },
  {
    category: "🧩 Architecture & Practices",
    skills: ["🧹 Clean Code", "🔗 System Integration"],
    colors: ["#607d8b80", "#3f51b580"]
  }
];


const Skills = ({ onClose }) => {
  return (
    <Card
      className="relative w-full max-w-2xl mx-4"
    >
      <CardCloseButton onClick={onClose}/>
    
      <CardHeader>
        <CardTitle>Skills 🛠️</CardTitle>
        <CardDescription>My technical stack and capabilities across development, integration, and leadership.</CardDescription>
      </CardHeader>
    
      <CardContent className="space-y-4">
        {skillsData.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-medium text-foreground mb-2">{section.category}</h3>
            <div className="flex flex-wrap justify-start gap-2">
              {section.skills.map((skill, i) => (
                <Tag text={skill} color={section.colors[i]} />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="pt-4 gap-2">
        <Button onClick={() => EventSystem.trigger('navigate-to', '/contacts')}>
          Contacts
        </Button>
        <Button variant="text" onClick={() => EventSystem.trigger('navigate-to', '/hobbies')}>
          Hobbies
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Skills;
