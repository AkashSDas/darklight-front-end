import toast from "react-hot-toast";
import { CourseInfoPayload, createCourseService, createLessonService, createModuleService, getCourseService, getLessonService, getModuleService, updateCourseInfoService, updateModuleService } from "services/_course";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { Module, updateActiveLessonId, updateActiveModuleId, updateCourse } from "./slice";

export var getCourseThunk = createAsyncThunk(
  "_course/get",
  async function getCourse(courseId: string, { getState, dispatch }) {
    var course = await getCourseService(courseId);
    dispatch(updateCourse(course as any));
    return course?.id;
  }
);

export var createCourseThunk = createAsyncThunk(
  "_course/create",
  async function createCourse(_, { getState, dispatch }) {
    var { accessToken } = (getState() as RootState)._auth;
    if (accessToken) {
      var res = await createCourseService(accessToken);
      if (res.success && res.course) {
        dispatch(updateCourse(res.course as any));
        toast.success("Course created");
        return res.course.id;
      } else toast.error(res.msg);
    } else toast.error("You are not logged in");
    return null;
  }
);

export var updateCourseInfoThunk = createAsyncThunk(
  "_course/update-info",
  async function updateCourseInfo(
    { courseId, payload }: { courseId: string; payload: CourseInfoPayload },
    { getState, dispatch }
  ) {
    var { accessToken } = (getState() as RootState)._auth;
    if (accessToken) {
      var res = await updateCourseInfoService(accessToken, courseId, payload);
      if (res.success && res.course) {
        dispatch(updateCourse(res.course as any));
      } else toast.error(res.msg);
    } else toast.error("You are not logged in");
  }
);

export var getModuleThunk = createAsyncThunk(
  "_course/get-module",
  async function getModule(
    { courseId, moduleId }: { courseId: string; moduleId: string },
    { getState, dispatch }
  ) {
    var moduleData = await getModuleService(courseId, moduleId);
    dispatch(updateActiveModuleId(moduleData?.id ?? null));
    return moduleData?.id;
  }
);

export var createModuleThunk = createAsyncThunk(
  "_course/create-module",
  async function createModule(courseId: string, { getState, dispatch }) {
    var { accessToken } = (getState() as RootState)._auth;
    if (accessToken) {
      var res = await createModuleService(accessToken, courseId);
      if (res.success && res.module) {
        toast.success("Module created");
        return res.module.id;
      } else toast.error(res.msg);
    } else toast.error("You are not logged in");
    return null;
  }
);

export var updateModuleThunk = createAsyncThunk(
  "_course/update-module",
  async function updateModule(
    {
      courseId,
      moduleId,
      payload,
    }: { courseId: string; moduleId: string; payload: Module },
    { getState, dispatch }
  ) {
    var { accessToken } = (getState() as RootState)._auth;
    await updateModuleService(accessToken, courseId, moduleId, payload);
  }
);

export var createLessonThunk = createAsyncThunk(
  "_course/create-lesson",
  async function createLesson(
    { courseId, moduleId }: { courseId: string; moduleId: string },
    { getState, dispatch }
  ) {
    var { accessToken } = (getState() as RootState)._auth;
    if (accessToken) {
      var res = await createLessonService(accessToken, courseId, moduleId);
      if (res.success && res.lesson) {
        toast.success("Lesson created");
        return res.lesson.id;
      } else toast.error(res.msg);
    } else toast.error("You are not logged in");
    return null;
  }
);

export var getLessonThunk = createAsyncThunk(
  "_course/get-lesson",
  async function getLesson(
    {
      courseId,
      moduleId,
      lessonId,
    }: { courseId: string; moduleId: string; lessonId: string },
    { getState, dispatch }
  ) {
    var lesson = await getLessonService(courseId, moduleId, lessonId);
    dispatch(updateActiveLessonId(lesson?.id ?? null));
    return lesson?.id;
  }
);