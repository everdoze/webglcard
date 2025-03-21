import React from "react";
import { cn } from "@/lib/utils";
import {X} from "lucide-react";
import {Button} from "@/components/ui/button";

/**
 * Card — базовый контейнер с тенью, скруглением и цветом фона.
 */
export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-xl border backdrop-blur-xl border-teal-200/50 bg-teal-900/70 text-foreground",
      className
    )}
    {...props}
  />
);

/**
 * CardHeader — верхняя часть карточки (заголовок, иконка).
 */
export const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6 mb-6 border-b border-b-teal-200/50 bg-teal-200/10 text-teal-50", className)} {...props} />
);

/**
 * CardTitle — заголовок карточки.
 */
export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props} />
);

/**
 * CardDescription — описание под заголовком.
 */
export const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-md text-muted-foreground italic", className)} {...props} />
);

/**
 * CardContent — основное содержимое.
 */
export const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0 text-teal-100", className)} {...props} />
);

/**
 * CardFooter — нижняя часть карточки (действия).
 */
export const CardFooter = ({ className, ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

/**
 * CardCloseButton — кнопка закрытия карточки.
 */
export const CardCloseButton = ({className, ...props}) => (
  <Button
    variant="ghost"
    size="icon"
    className={cn("absolute top-4 right-4 text-muted-foreground hover:text-foreground", className)}
    {...props}
  >
    <X className="w-4 h-4 text-teal-50" />
  </Button>
);