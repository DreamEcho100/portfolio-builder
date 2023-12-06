import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLinkedin, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

function Facebook({ url }: { url: string }) {
  return (
    <a
      href={url}
      className="flex items-center justify-center rounded-full p-3 text-blue-500 hover:bg-blue-100"
    >
      {/* <FontAwesomeIcon icon={faFacebook} className="w-5 h-5"/> */}
      Facebook
    </a>
  );
}

// Twitter component
function Twitter({ url }: { url: string }) {
  return (
    <a
      href={url}
      className="flex items-center justify-center rounded-full p-3 text-blue-400 hover:bg-blue-100"
    >
      <TwitterLogoIcon className="h-5 w-5" />
    </a>
  );
}

// LinkedIn component
function LinkedIn({ url }: { url: string }) {
  return (
    <a
      href={url}
      className="flex items-center justify-center rounded-full p-3 text-blue-600 hover:bg-blue-100"
    >
      <LinkedInLogoIcon />
    </a>
  );
}

const SocialLinks = ({
  facebook,
  twitter,
  linkedIn,
}: {
  facebook: string;
  twitter: string;
  linkedIn: string;
}) => (
  <div className="flex h-1/3 w-full flex-row justify-around">
    <Facebook url={facebook}></Facebook>
    <Twitter url={twitter}></Twitter>
    <LinkedIn url={linkedIn}></LinkedIn>
  </div>
);

export default SocialLinks;
