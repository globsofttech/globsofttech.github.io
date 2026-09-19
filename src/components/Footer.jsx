import { useEffect, useState } from "react";
import Section from "./Section";
import { socials } from "../constants";
import { brainwave } from "../assets";
import { curve } from "../assets";

const Footer = () => {
  const [systemStatus, setSystemStatus] = useState({
    status: "running",
    message: "All Systems Operational",
  });

  const statusType = ["degraded", "maintenance", "warning"].includes(systemStatus.status)
    ? "warning"
    : ["down", "outage", "error"].includes(systemStatus.status)
      ? "error"
      : "running";

  useEffect(() => {
    let isMounted = true;

    const updateSystemStatus = async () => {
      try {
        const response = await fetch("https://admin-portal-alpha-snowy.vercel.app/api/system-status");

        if (!response.ok) {
          throw new Error(`System status request failed: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted && data.status && data.message) {
          setSystemStatus({ status: data.status, message: data.message });
        }
      } catch (error) {
        console.warn("Failed to fetch system status from API, using fallback");
      }
    };

    updateSystemStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container">
        {/* Top Row - Logo, Moto, and Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          {/* Logo and Moto */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-7">
            <img src={brainwave} className="w-[4rem]" height={50} alt="Brainwave" />
              
            </div>
            <span className="inline-block relative">

            Your Vision, Our Code  ! {" "}
             <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-1"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
            <br />

            <p className="caption text-n-0 text-center md:text-left">
            Bharatpur - 7 Chitwan, 44200 <br />
            Madi Thori Street, Nepal<br />
            Phone: +977 9802922270 <br />
            Mail: info.globsoft@gmail.com
           
            
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:flex gap-8 md:gap-15">
            <a href="#" className="caption text-n-4 hover:text-n-1 transition-colors">
              Home
            </a>
            <a href="#clients" className="caption text-n-4 hover:text-n-1 transition-colors">
              Our Clients
            </a>
            <a href="#features" className="caption text-n-4 hover:text-n-1 transition-colors">
              Services
            </a>
            <a href="#contact" className="caption text-n-4 hover:text-n-1 transition-colors">
            Contact
            </a>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2754.7586488080283!2d84.41410959010135!3d27.65677122757285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ab68267f444e727%3A0x2000fd86632d5c28!2sGlobSoft%20Inc!5e0!3m2!1sen!2snp!4v1747718940093!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Globsoft Tech Location"
          ></iframe>
        </div>

        {/* Bottom Row - Copyright, status, admin, and socials */}
        <div className="flex sm:justify-between justify-center items-center gap-6 max-sm:flex-col">
          <p className="caption text-n-4 text-center lg:text-left">
            Globsoft Tech © {new Date().getFullYear()} All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 caption text-n-4" aria-label={systemStatus.message}>
              <span className={`status-dot status-dot-${statusType} h-2 w-2 rounded-full`} aria-hidden="true" />
              <span>{systemStatus.message}</span>
            </div>

            <a
              href="https://admin-portal-alpha-snowy.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 caption text-n-4 transition-colors hover:text-n-1"
            >
              <i className="ri-shield-keyhole-line" aria-hidden="true" />
              Are you the admin?
            </a>

            <ul className="flex gap-5 flex-wrap">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              >
                <img src={item.iconUrl} width={16} height={16} alt={item.title} />
              </a>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;