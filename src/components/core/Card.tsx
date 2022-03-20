import Link from "next/link";
import React from "react";
import type { IconType } from "react-icons";

const Card: React.FC<{ title: string; Icon: IconType; theme: string }> = ({
  title,
  Icon,
  theme
}) => {
  const textColor = () => {
    switch (theme) {
      case "primary":
        return "accent";
      case "secondary":
        return "primary";
      case "accent":
        return "base-200";
    }
  };
  return (
    <div
      className={`card transition duration-500 ease-in-out hover:scale-105 active:scale-100 cursor-pointer lg:max-w-sm sm:max-w-[280px] max-w-sm w-full bg-${theme} shadow-xl`}
    >
      <div className={`card-body text-${textColor()}`}>
        <Icon size={96} className="mx-auto" />
        <h2 className="card-title mx-auto">{title}</h2>
      </div>
      <Link href="/yolo">
        <a className="inset-0 absolute"></a>
      </Link>
    </div>
  );
};

export default Card;
