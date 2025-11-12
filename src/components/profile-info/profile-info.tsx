import Avatar from "../avatar/avatar";
import "./profile-info.styles.css";

interface ProfileInfoProps {
  username: String;
  bio: String;
  location: String;
}

export default function ProfileInfo({
  username,
  bio,
  location,
}: ProfileInfoProps) {
  return (
    <div className="profile-info">
      <Avatar />
      <div className="profile-info-details">
        <p className="username-title">{username}</p>
        {bio}
        {location}
      </div>
    </div>
  );
}
