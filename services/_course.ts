import { AxiosRequestConfig } from "axios";
import fetchAPI from "services";

import { Module } from "@store/_course/slice";

function fetchFromCourse(endpoint: string, opts: AxiosRequestConfig) {
  const BASE_URL = "/course";
  return fetchAPI(`${BASE_URL}/${endpoint}`, opts);
}

export async function getCourseService(courseId: string) {
  var res = await fetchFromCourse(courseId, { method: "get" });
  return res.data;
}

export async function createCourseService(token: string) {
  var res = await fetchFromCourse("", {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg, course: res.data };
}

export interface CourseInfoPayload {
  emoji?: string;
  title?: string;
  description?: string;
  tags?: string[];
  stage?: "draft" | "published";
  price?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
}
export async function updateCourseInfoService(
  token: string,
  courseId: string,
  data: CourseInfoPayload
) {
  var res = await fetchFromCourse(`${courseId}/info`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });

  return { success: res.status < 300, msg: res.msg, course: res.data?.course };
}

export async function getModuleService(courseId: string, moduleId: string) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}`, { method: "get" });
  return res.data;
}

export async function createModuleService(token: string, courseId: string) {
  var res = await fetchFromCourse(courseId, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg, module: res.data };
}

export interface ModuleInfoPayload {
  emoji?: string;
  title?: string;
  description?: string;
  lessons?: string[];
}
export async function updateModuleService(
  token: string,
  courseId: string,
  moduleId: string,
  data: ModuleInfoPayload
) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return { success: res.status < 300, msg: res.msg, module: res.data };
}

export async function reorderModulesService(
  token: string,
  courseId: string,
  data: Module[]
) {
  var res = await fetchFromCourse(`${courseId}/reorder`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data: { modules: data },
  });
  return { success: res.status < 300, msg: res.msg, course: res.data };
}

export async function createLessonService(
  token: string,
  courseId: string,
  moduleId: string
) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}`, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg, lesson: res.data };
}

export async function getLessonService(
  courseId: string,
  moduleId: string,
  lessonId: string
) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}/${lessonId}`, {
    method: "get",
  });
  return res.data;
}

export interface ContentPayload {
  courseId: string;
  moduleId: string;
  lessonId: string;
  token: string;
  payload: { type: string; data: any; addAt: number };
}
export async function addContentService(data: ContentPayload) {
  console.log(data);
  var { payload, token, courseId, moduleId, lessonId } = data;
  var res = await fetchFromCourse(`${courseId}/${moduleId}/${lessonId}`, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
    data: { type: payload.type, data: payload.data, addAt: payload.addAt },
  });

  return { success: res.status < 300, msg: res.msg, lesson: res.data };
}

export interface UpdateContentPayload {
  courseId: string;
  moduleId: string;
  lessonId: string;
  token: string;
  payload: { data: any; updateAt: number };
}
export async function updateContentService(data: UpdateContentPayload) {
  var { payload, token, courseId, moduleId, lessonId } = data;
  var res = await fetchFromCourse(`${courseId}/${moduleId}/${lessonId}`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data: { data: payload.data, updateAt: payload.updateAt },
  });

  return { success: res.status < 300, msg: res.msg, lesson: res.data };
}

export interface UpdateLessonMetadataPayload {
  courseId: string;
  moduleId: string;
  lessonId: string;
  token: string;
  payload: {
    title: string;
    description: string;
    isFree: boolean;
    emoji: string;
  };
}
export async function updateLessonMetadataService(
  data: UpdateLessonMetadataPayload
) {
  var { payload, token, courseId, moduleId, lessonId } = data;
  var res = await fetchFromCourse(
    `${courseId}/${moduleId}/${lessonId}/metadata`,
    {
      method: "put",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    }
  );

  return { success: res.status < 300, msg: res.msg, lesson: res.data };
}

export interface DeleteContentPayload {
  courseId: string;
  moduleId: string;
  lessonId: string;
  token: string;
  payload: {
    deleteAt: number;
  };
}
export async function deleteContentService(data: DeleteContentPayload) {
  var { payload, token, courseId, moduleId, lessonId } = data;
  var res = await fetchFromCourse(`${courseId}/${moduleId}/${lessonId}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
  });

  return { success: res.status < 300, msg: res.msg, lesson: res.data };
}

export interface ReorderContentPayload {
  courseId: string;
  moduleId: string;
  lessonId: string;
  token: string;
  payload: { content };
}
export async function reorderContentService(data: ReorderContentPayload) {
  var { payload, token, courseId, moduleId, lessonId } = data;
  var res = await fetchFromCourse(
    `${courseId}/${moduleId}/${lessonId}/reorder`,
    {
      method: "put",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    }
  );

  return { success: res.status < 300, msg: res.msg, lesson: res.data };
}

export interface DeleteLessonPayload {
  courseId: string;
  moduleId: string;
  lessonId: string;
  token: string;
}
export async function deleteLessonService(data: DeleteLessonPayload) {
  var { token, courseId, moduleId, lessonId } = data;
  var res = await fetchFromCourse(
    `${courseId}/${moduleId}/${lessonId}/delete`,
    {
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return { success: res.status < 300, msg: res.msg };
}

export interface DeleteModulePayload {
  courseId: string;
  moduleId: string;
  token: string;
}
export async function deleteModuleService(data: DeleteModulePayload) {
  var { token, courseId, moduleId } = data;
  var res = await fetchFromCourse(`${courseId}/${moduleId}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg };
}

export interface DeleteCoursePayload {
  courseId: string;
  token: string;
}
export async function deleteCourseService(data: DeleteCoursePayload) {
  var { token, courseId } = data;
  var res = await fetchFromCourse(`${courseId}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg };
}
