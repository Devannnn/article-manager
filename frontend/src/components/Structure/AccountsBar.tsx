import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCube } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faFacebookMessenger,
    faLinkedin,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
    {
        icon: faFacebook,
        url: "https://www.facebook.com/",
        color: "Dodgerblue",
    },
    {
        icon: faFacebookMessenger,
        url: "https://www.messenger.com/",
        color: "Dodgerblue",
    },
    {
        icon: faInstagram,
        url: "https://www.instagram.com/",
        color: "#C13584",
    },
    {
        icon: faLinkedin,
        url: "https://www.linkedin.com",
        color: "Dodgerblue",
    },
    {
        icon: faEnvelope,
        url: "https://mail.google.com/mail/u/0/#inbox",
        color: "#FCAF45",
    },
    {
        icon: faEnvelope,
        url: "https://z.imt.fr/zimbra/#1",
        color: "#FCAF45",
    },
    {
        icon: faCube,
        url: "https://www.notion.so/",
        color: "#000000",
    },
];

function Accounts() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center border">
            <h2 className="text-center"><b>Comptes</b></h2>
            {socials.map((social) => (
                <a key={social.url} href={social.url}>
                    <FontAwesomeIcon icon={social.icon} color={social.color} size="3x" style={{ margin: '0.5rem' }} />
                </a>
            ))}
        </div>
    );
}

export default Accounts;
