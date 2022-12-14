import Link from "next/link";
import { ReactElement } from "react";

import { AuthGif } from "@components/auth/auth-gifs";
import ForgotPasswordForm from "@components/auth/forgot-password-form";
import BaseLayout from "@components/shared/base-layout";
import { TextBadge } from "@components/shared/text-badge";

export default function ForgotPasswordPage(): JSX.Element {
  return (
    <div className="w-full flex justify-center font-urbanist font-medium">
      <div className="mt-16 flex gap-8 items-center">
        <SidePromotion />
        <ForgotPasswordSection />
      </div>
    </div>
  );
}

function ForgotPasswordSection(): JSX.Element {
  return (
    <main className="w-[600px] px-8 overflow-hidden flex gap-6 items-center flex-col">
      <section>
        <h1 className="h2 text-center mb-3">Reset your Password</h1>

        <p className="max-w-[450px] leading-[140%] text-center">
          Enter the email address you used when you joined and {"we'll"} send
          you <TextBadge variant="regular">📜</TextBadge> instructions to reset
          your password
        </p>
      </section>

      <ForgotPasswordForm />

      <section>
        Already have an account? <TextBadge variant="regular">🤦🏽‍♂️</TextBadge>{" "}
        <Link href="/auth/login" className="text-link">
          Login
        </Link>
      </section>
    </main>
  );
}

function SidePromotion(): JSX.Element {
  return (
    <aside className="w-[600px] overflow-hidden">
      <AuthGif src="https://media.giphy.com/media/CpI5CkrkmNjDG/giphy.gif" />
    </aside>
  );
}

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
