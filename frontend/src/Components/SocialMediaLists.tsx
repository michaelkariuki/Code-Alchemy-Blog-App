import React from "react";
import config from "../config";
import { Image } from "react-bootstrap";
import { SidePanelSocialIcons } from "../Interfaces/BlogTypes";
import "../styles/components/SocialMediaLists.scss";
interface Props extends SidePanelSocialIcons {
    marginRight?: boolean
}

const SocialMediaLists: React.FC<Props> = (props) => {
  const renderContentList = (type: string = "default") => {
    const { SocialMediaIconsConfig: socials } = config;
    let theme: Record<string, any> | null = null;

    if (type === "default") {
      theme = socials.default;
    } else if (type === "pink") {
      theme = socials.pink;
    }

    if (theme) {
      return Object.keys(theme).map((key, idx) => {
        return (
          <div key={idx} className={`icon-item ${props.marginRight? "margin-right" : ""}`}>
            <Image src={theme?.[key]} alt={key} />
          </div>
        );
      });
    }
  };

  return (
    <div className="icon-wrapper d-flex justify-content-between">
      {renderContentList(props.type)}
    </div>
  );
};

export default SocialMediaLists;
