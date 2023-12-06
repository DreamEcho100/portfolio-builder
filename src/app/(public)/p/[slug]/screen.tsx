// "use client";

import Intro from "./_components/Intro";

import Bio from "./_components/Bio";
import SocialLinks from "./_components/SocialLinks";
import type { CustomPage } from "./page";

/**
 * 1) Enter form inputs
 * 2) on submit
 * 	1) Save the data to a DB
 * 	2) Generate `slug`
 * 	3) Send the data as a feedback to the front
 * 3) `http:[origin]/p/:slug`
 */

const getUrls = (socialLinks: CustomPage["socialLinks"]) => {
  return socialLinks.reduce(
    (urls, link) => {
      switch (link.type) {
        case "FACEBOOK":
          urls.facebook = link.url;
          break;
        case "LINKEDIN":
          urls.linkedin = link.url;
          break;
        case "WEBSITE":
          urls.website = link.url;
          break;
      }

      return urls;
    },
    {
      facebook: "",
      linkedin: "",
      website: "",
    },
  );
};

export default function CustomPageScreen(props: { data: CustomPage }) {
  const { facebook, linkedin, website } = getUrls(props.data.socialLinks);

  return (
    <div className="flex h-full w-full flex-col gap-2">
      {props.data.profileImage && (
        <Intro
          name={props.data.fullName}
          job="software engineer"
          image={props.data.profileImage.url}
        />
      )}
      {props.data.bio && <Bio bio={props.data.bio} />}
      <SocialLinks
        facebook={facebook}
        linkedIn={linkedin}
        twitter={website}
      ></SocialLinks>
    </div>
  );
}
