"use client";
import { Fragment, Suspense } from "react";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { HeadingText } from "../component/Heading";
import { useRouter } from "next/navigation";

const PrivacyPage = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Header />
      <main className="">
        <div className=" bg-[#F6F6F6] py-4">
          <div className="">
            <p
              onClick={() => router.back()}
              className="text-[#F25E26] underline "
              style={{
                margin: "0 auto",
                width: "90%",
                maxWidth: "100%",
              }}
            >
              Back
            </p>
            <div className="text-center">
              <HeadingText title="Privacy Policy" />
            </div>
          </div>
        </div>
        <h1 className="flex justify-center items-center text-center mt-4 font-semibold font-Poppins">Privacy Policy for Ajiroba Ecommerce Platform</h1>
        <section
          className="container "
          style={{
            margin: "0 auto",
            width: "94%",
            maxWidth: "100%",
          }}
        >
          <div className=" py-12">
            <p className="font-Poppins  text-black text-base">
              {" "}
              At Ajiroba Technologies Ltd (&ldquo;Ajiroba&ldquo;), we are
              committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy outlines how we
              collect, use, disclose, and protect the information you provide
              when using our ecommerce platform.
            </p>

            <h1 className="font-semibold font-Poppins text-lg py-4">
              1. Information We Collect
            </h1>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline">
                1.1. Personal Information.
              </span>{" "}
              When you create an account or make a purchase on our platform, we
              may collect personal information such as your name, email address,
              shipping address, phone number, and payment details.
            </p>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline">
                1.2. Browsing Information:
              </span> We may automatically collect certain information when you
              visit our website, including your IP address, browser type, device
              identifiers, and cookies.
            </p>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline">1.3. Communication Data:</span> We
              may collect information about your interactions with us, including
              emails, live chats, and customer support inquiries.
            </p>

            <h1 className="font-semibold font-Poppins text-lg py-4">
              2. How We Use Your Information
            </h1>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 2.1. Order Processing:.</span>
              We use your personal information to process orders, fulfill
              purchases, and provide customer support related to your
              transactions.
            </p>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 2.2. Personalization:</span>
              We may use your information to personalize your shopping
              experience, recommend products, and tailor promotional offers
              based on your preferences.
            </p>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 2.3. Communication:</span>
              We may use your contact information to send you transactional
              emails, updates about your orders, and marketing communications
              with your consent.
            </p>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 2.4. Analytics:</span>
              We may use browsing information and cookies to analyze website
              usage, monitor traffic patterns, and improve our platform&lsquo;s
              performance and user experience
            </p>


             <h1 className="font-semibold font-Poppins text-lg py-4">
             3. Information Sharing and Disclosure
            </h1>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 3.1. Service Providers:</span>
           We may share your information with trusted third-party service providers who assist us in operating our platform, processing payments, and delivering orders.
            </p>

               <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 3.2. Legal Compliance:</span>
                  We may disclose your information if required by law, to respond to legal requests, enforce our terms of service,
                  or protect the rights, property, or safety of Ajiroba, our users, or others.
            </p>



             <h1 className="font-semibold font-Poppins text-lg py-4">
            4. Data Security
            </h1>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline">4.1.</span>
 We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, misuse, or alteration.
            </p>

               <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 4.2.</span>

 We use secure encryption protocols, firewalls, and access controls to safeguard your data during transmission and storage.
            </p>


               <h1 className="font-semibold font-Poppins text-lg py-4">
        5. Your Rights and Choices:
            </h1>


               <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 5.1.</span>

You have the right to access, update, or delete your personal information by contacting us directly.
            </p>

            <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 5.2.</span>

 You may opt-out of receiving marketing communications from us at any time by following
 the unsubscribe instructions provided in our emails or contacting our customer support.
            </p>



               <h1 className="font-semibold font-Poppins text-lg py-4">
         6. Children&apos;s Privacy
            </h1>


             <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 6.1.</span>

              Our platform is not intended for children under the age of 13, and we do not knowingly collect personal information from children without parental consent.
            </p>



               <h1 className="font-semibold font-Poppins text-lg py-4">
          7. Changes to This Privacy Policy
            </h1>


             <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 7.1.</span>

           We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the revised policy on our website or contacting you directly.
            </p>


 <h1 className="font-semibold font-Poppins text-lg py-4">
          8. Contact Us
            </h1>


             <p className="font-Poppins  text-black text-base py-2">
              {" "}
              <span className=" underline"> 8.1.</span>

If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at info@ajiroba.com
            </p>


            <h1 className=" font-Poppins text-lg py-4">By using the Ajiroba ecommerce platform, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy.</h1>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

// export default Page

export default function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <PrivacyPage />
    </Suspense>
  );
}
