import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Image } from "react-bootstrap";
import defaultUser from "../Assets/images/default-image-png.png";
import "../styles/components/ProfileMenu.scss";
import { Link } from "react-router-dom";

type ProfileMenuProps = {
    username: string | null     
    firstName: string | null
    lastName: string | null
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({username, firstName, lastName}) => {
  return (
    <Dropdown drop="down" align={"end"}>
      <Dropdown.Toggle
        id="dropdown-basic"
        className="p-0 m-0 bg-transparent border-0"
      >
        <Image
          className="profile-icon"
          src={defaultUser}
          thumbnail
          roundedCircle
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="profile-menu-wrapper">
        <Dropdown.Header>
          <div className="profile-menu-header d-flex">
            <div className="profile-menu-image col d-flex align-items-center justify-content-start">
              <Image
                className="profile-menu-icon"
                src={defaultUser}
                thumbnail
                roundedCircle
                alt="profile_icon"
              />
            </div>
            <div className="profile-menu-text col d-felx">
                <div className="text-name">{firstName} {lastName}</div>
                <div className="text-username ">@{username}</div>
            </div>
          </div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item><Link to={`/profile/${username}`}>View Profile</Link>  </Dropdown.Item>
        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
        <Dropdown.Divider />
        <Dropdown.Item>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;
