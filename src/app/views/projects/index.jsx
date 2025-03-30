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
    date: "March 2023 - Current",
    project: "FastReport Online Designer",
    colors: ["#2a8d8d", "#22674a", "#9d8545"],
  },
  {
    logo: FppLogo,
    tags: ["Frontend Developer", "JavaScript", "Python"],
    date: "January 2020 - February 2022",
    project: "FairPlayPay Banking System",
    colors: ["#2a8d8d", "#9d8545", "#cc4f22"],
  },
  {
    logo: IkeaLogo,
    tags: ["Fullstack Developer", "JavaScript", "ABAP"],
    date: "January 2018 - March 2019",
    project: "Loyalty System / Hybris Marketing",
    colors: ["#9d2c88", "#bb7256", "#bb7256"],
  },
  {
    logo: GlobusLogo,
    tags: ["Fullstack Developer", "JavaScript", "ABAP"],
    date: "December 2017 - January 2018",
    project: "CRM System / Hybris Marketing",
    colors: ["#9d2c88", "#9d8545", "#bb7256"],
  },
  {
    logo: EfesLogo,
    tags: ["Backend Developer", "ABAP"],
    date: "February 2017 - December 2017",
    project: "CRM System",
    colors: ["#3250b2", "#bb7256"],
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
                style={{ minHeight: '170px' }}
                className="flex flex-col items-center space-y-3 text-center"
              >
                <div className="h-16 flex items-center justify-center">
                  <Logo width={180} height={50} />
                </div>
                <div className="flex text-sm items-center text-teal-100 justify-center">{data.date}</div>
                <div className="flex text-md items-center text-teal-50 justify-center">{data.project}</div>
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