import ProfileBanner from "@/components/profile-banner/profile-banner";
import "../profile.styles.css";
import Navbar from "@/components/navbar/navbar";
import ProfileInfo from "@/components/profile-info/profile-info";
import ProfileButton from "@/components/profile-button/profile-button";
import InfoBoard from "@/components/info-board/info-board";
import Feed from "@/components/feed/feed";
import Shoutbox from "@/components/shoutbox/shoutbox";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="profile">
      <Navbar />
      <ProfileBanner />
      <div className="profile-details">
        <ProfileInfo
          username={slug}
          bio={"I play video games"}
          location={"Los Angeles, CA"}
        />

        <div className="profile-buttons">
          <ProfileButton>Following</ProfileButton>
          <ProfileButton>Message</ProfileButton>
          <ProfileButton>Donate</ProfileButton>
        </div>
      </div>
      <div className="profile-content">
        <Shoutbox />
        <div className="profile-info-section">
          <InfoBoard title="Config" body="I like to play video games." />
          <InfoBoard title="Uploads" body="0" />
          <InfoBoard title="Achievements" body="120" />
        </div>

      </div>
    </div>
  );
}
