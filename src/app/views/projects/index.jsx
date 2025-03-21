import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
  CardCloseButton
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Tag } from "@/components/ui/tag";

import FrLogo from "@/components/logos/fr-logo";
import FppLogo from "@/components/logos/fpp-logo";
import GlobusLogo from "@/components/logos/globus-logo";
import EfesLogo from "@/components/logos/efes-logo";
import IkeaLogo from "@/components/logos/ikea-logo";
import EventSystem from "@/app/events";

const panelData = [
  {
    logo: FrLogo,
    tags: ["Frontend Developer", "Team Lead", "JavaScript"],
    colors: ["#32b2b280", "#45CE5D80", "#FFD87280"],
  },
  {
    logo: FppLogo,
    tags: ["Frontend Developer", "JavaScript", "Python"],
    colors: ["#32b2b280", "#FFD87280", "#FF72727F"],
  },
  {
    logo: GlobusLogo,
    tags: ["Fullstack Developer", "JavaScript", "ABAP"],
    colors: ["#B232947F", "#FFD87280", "#FFB69A7F"],
  },
  {
    logo: EfesLogo,
    tags: ["Backend Developer", "ABAP"],
    colors: ["#3250B27F", "#FFB69A7F"],
  },
  {
    logo: IkeaLogo,
    tags: ["Fullstack Developer", "JavaScript", "ABAP"],
    colors: ["#B232677F", "#FFD87280", "#FFB69A7F"],
  },
];

const Projects = ({ onClose }) => {
  return (
    <Card
      className={"relative w-full max-w-2xl mx-4"}
    >
      <CardCloseButton onClick={onClose}/>
    
      <CardHeader>
        <CardTitle>
          Projects I&apos;ve Worked On 📁
        </CardTitle>
        <CardDescription>
          Impactful contributions across frontend, backend, and full-stack development.
        </CardDescription>
      </CardHeader>
    
      <CardContent>
        <Carousel className="mt-4">
          {panelData.map((data, index) => {
            const Logo = data.logo;
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="h-16 flex items-center justify-center">
                  <Logo width={180} height={50} />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {data.tags.map((tag, i) => (
                    <Tag text={tag} color={data.colors[i]} />
                  ))}
                </div>
              </div>
            );
          })}
        </Carousel>
      </CardContent>
  
      <CardFooter className="gap-2">
        <Button onClick={() => EventSystem.trigger('navigate-to', '/skills')}>
          My skills
        </Button>
        <Button variant="text" onClick={() => EventSystem.trigger('navigate-to', '/hobbies')}>
          Hobbies
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Projects;