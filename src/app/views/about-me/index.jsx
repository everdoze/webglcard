import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardCloseButton
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventSystem from 'app/events';

const AboutMe = ({ onClose }) => {
  return (
    <Card className={`relative w-full max-w-2xl origin-center mx-4`}>
      <CardCloseButton onClick={onClose}/>
    
      <CardHeader>
        <CardTitle>Hi, my name is Andrew 👨‍💻</CardTitle>
        <CardDescription>Software Developer — Frontend & Backend</CardDescription>
      </CardHeader>
    
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-base">
          I'm a highly skilled Software Developer with wide experience in frontend and backend development.
        </p>
        <p className="text-muted-foreground text-base">
          I maintain exceptional development quality from conception through distribution and care deeply about code readability and maintainability.
        </p>
        <p className="text-muted-foreground text-base">
          I work alongside clients and colleagues through all stages of development to produce exceptional final products.
        </p>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Button onClick={() => EventSystem.trigger('navigate-to', '/projects')}>
          Projects
        </Button>
        <Button variant="text" onClick={() => EventSystem.trigger('navigate-to', '/contacts')}>
          Contacts
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AboutMe;
