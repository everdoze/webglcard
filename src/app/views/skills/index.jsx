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
    colors: [
      "#9d8545", "#3178c6", "#984545", "#00599c",
      "#966214", "#68a063", "#3b8da1", "#643f9f"
    ]
  },
  {
    category: "🌐 Web Development",
    skills: ["HTML & CSS", "SCSS/SASS", "Tailwind CSS", "shadcn/ui", "Webpack", "Git", "SQL"],
    colors: [
      "#8c3118", "#814160", "#1e6585", "#4a4cb7",
      "#537e8f", "#f0503280", "#005c72"
    ]
  },
  {
    category: "🛠️ Tools & Platforms",
    skills: ["🐳 Docker", "🚀️ GitHub Actions", "⚡ Redis", "🔧 Make"],
    colors: ["#08779a", "#916758", "#5e8300", "#694ca6"]
  },
  {
    category: "🤝 Soft Skills",
    skills: ["👥 Team Leadership", "🔍 Code Review", "🚦 Agile Methodology"],
    colors: ["#22674a", "#6e1b7c", "#9a5a00"]
  },
  {
    category: "🧩 Architecture & Practices",
    skills: ["🧹 Clean Code", "🔗 System Integration", "🧱 12-Factor App"],
    colors: ["#455a64", "#232e69", "#3e4935"]
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
                <Tag key={i} text={skill} color={section.colors[i]} />
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
