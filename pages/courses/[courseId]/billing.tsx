import { ReactElement } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function CourseBillingPage(): JSX.Element {
  return (
    <div>
      <h1>Services & Billings for the Course</h1>
    </div>
  );
}

CourseBillingPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
