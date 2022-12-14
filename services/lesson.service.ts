import { AxiosRequestConfig } from "axios";

import { UpdateLessonSettings } from "@lib/course.lib";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromLesson(
  courseId: string,
  groupId: string,
  URL: string,
  config: AxiosRequestConfig
) {
  return fetchFromAPI(
    `/course/${courseId}/group/${groupId}/lesson/${URL}`,
    config
  );
}

export async function addLesson(
  courseId: string,
  groupId: string,
  accessToken: string
) {
  var response = await fetchFromLesson(courseId, groupId, "", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return { success: response.success, lesson: response.data };
  }
  return { success: false };
}

export async function getLesson(
  courseId: string,
  groupId: string,
  lessonId: string,
  accessToken: string
) {
  var response = await fetchFromLesson(courseId, groupId, `${lessonId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return { success: response.success, lesson: response.data.lesson };
  }
  return { success: false };
}

export async function updateLessonSettings(
  courseId: string,
  groupId: string,
  lessonId: string,
  input: UpdateLessonSettings,
  accessToken: string
) {
  var response = await fetchFromLesson(
    courseId,
    groupId,
    `${lessonId}/settings`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      data: input,
    }
  );

  console.log(response);
  if (response.statusCode == 200) {
    return { success: response.success, lesson: response.data };
  }
  return { success: false };
}

export async function deleteLesson(
  courseId: string,
  groupId: string,
  lessonId: string,
  accessToken: string
) {
  var response = await fetchFromLesson(courseId, groupId, `${lessonId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return { success: response.success };
  }
  return { success: false };
}

export async function updateLessonVideo(
  courseId: string,
  groupId: string,
  lessonId: string,
  accessToken: string,
  data: FormData
) {
  var response = await fetchFromLesson(courseId, groupId, `${lessonId}/video`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: response.success,
      videoURL: response.data?.videoURL,
    };
  }

  return { success: false };
}
