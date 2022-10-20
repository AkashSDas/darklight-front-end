import { useFormik } from "formik";
import moment from "moment";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

import IconButton from "@components/buttons/icon-button";
import TextButton from "@components/buttons/text-button";
import OptionsInput from "@components/dropdown/options-input";
import Divider from "@components/editor/divider";
import Spacer from "@components/editor/space";
import Text from "@components/editor/text";
import { ArrowDownIcon, MenuIcon, MultiplyIcon, SearchIcon, SettingsIcon } from "@components/icons";
import { useOutsideAlerter } from "@hooks/outsider-alerter";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { addTag, removeTag, selectEditableCourse } from "@store/editable-course/slice";
import { getCourseThunk, updateCourseInfoThunk } from "@store/editable-course/thunk";

function CourseNavName() {
  var { course, isUpdating } = useAppSelector(selectEditableCourse);

  return (
    <div className="flex gap-4">
      <span className="flex items-center gap-2">
        <span>🗃</span>
        {course?.title ? (
          <span className="text-grey8">{course.title}</span>
        ) : (
          <span className="text-grey6">Untitled</span>
        )}
      </span>

      {isUpdating && <span className="text-grey6">Updating...</span>}
    </div>
  );
}

function CourseInfoAndActions() {
  var { course } = useAppSelector(selectEditableCourse);

  return (
    <div className="flex gap-2 items-center">
      <span className="text-grey6 -text-cap">
        Edited{" "}
        {moment(course?.lastEditedOn).startOf("hour").fromNow().toString()}
      </span>

      <TextButton label="Modules" />
      <button className="h-7 w-7 flex items-center justify-center hover:bg-grey2 active:bg-grey3 rounded-[4px]">
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.947 15.3864C15.6541 15.0935 15.1792 15.0935 14.8863 15.3864C14.5934 15.6793 14.5934 16.1542 14.8863 16.4471L15.947 15.3864ZM17.803 19.3637C18.0959 19.6566 18.5708 19.6566 18.8637 19.3637C19.1566 19.0709 19.1566 18.596 18.8637 18.3031L17.803 19.3637ZM18.25 10.0834C18.25 5.29695 14.3698 1.41675 9.58334 1.41675V2.91675C13.5414 2.91675 16.75 6.12537 16.75 10.0834H18.25ZM9.58334 1.41675C4.79687 1.41675 0.916672 5.29695 0.916672 10.0834H2.41667C2.41667 6.12537 5.6253 2.91675 9.58334 2.91675V1.41675ZM0.916672 10.0834C0.916672 14.8699 4.79687 18.7501 9.58334 18.7501V17.2501C5.6253 17.2501 2.41667 14.0415 2.41667 10.0834H0.916672ZM9.58334 18.7501C14.3698 18.7501 18.25 14.8699 18.25 10.0834H16.75C16.75 14.0415 13.5414 17.2501 9.58334 17.2501V18.7501ZM14.8863 16.4471L17.803 19.3637L18.8637 18.3031L15.947 15.3864L14.8863 16.4471Z"
            fill="#494C53"
          />
        </svg>
      </button>

      <button className="h-7 w-7 flex items-center justify-center hover:bg-grey2 active:bg-grey3 rounded-[4px]">
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2866 13.6005L16.647 13.2088L16.647 13.2088L17.2866 13.6005ZM16.4911 14.8995L17.1307 15.2912L17.1307 15.2912L16.4911 14.8995ZM2.7134 7.39951L2.07379 7.00785L2.07379 7.00785L2.7134 7.39951ZM3.50886 6.10048L4.14847 6.49214L4.14847 6.49214L3.50886 6.10048ZM5.68209 5.55144L6.04067 4.89271L6.04067 4.89271L5.68209 5.55144ZM3.29572 9.44855L2.93713 10.1073L2.93713 10.1073L3.29572 9.44855ZM14.3179 15.4486L13.9593 16.1073L13.9593 16.1073L14.3179 15.4486ZM16.7043 11.5514L16.3457 12.2102L16.3457 12.2102L16.7043 11.5514ZM3.50886 14.8995L2.86925 15.2912L2.86925 15.2912L3.50886 14.8995ZM2.7134 13.6005L3.35301 13.2088L3.35301 13.2088L2.7134 13.6005ZM16.4911 6.10049L17.1307 5.70883L17.1307 5.70882L16.4911 6.10049ZM17.2866 7.39952L16.647 7.79119L16.647 7.79119L17.2866 7.39952ZM16.7043 9.44856L17.0628 10.1073L17.0628 10.1073L16.7043 9.44856ZM14.3179 5.55145L14.6765 6.21017L14.6765 6.21017L14.3179 5.55145ZM3.29572 11.5514L3.6543 12.2102L3.6543 12.2102L3.29572 11.5514ZM5.68209 15.4486L5.32351 14.7898L5.32351 14.7898L5.68209 15.4486ZM14.2333 5.59748L13.8748 4.93876L13.8748 4.93876L14.2333 5.59748ZM5.76666 5.59747L5.40808 6.2562L5.40808 6.2562L5.76666 5.59747ZM14.2333 15.4025L14.5919 14.7438L14.5919 14.7438L14.2333 15.4025ZM5.76666 15.4025L6.12524 16.0613L6.12524 16.0613L5.76666 15.4025ZM9.20453 3.75H10.7954V2.25H9.20453V3.75ZM10.7954 17.25H9.20453V18.75H10.7954V17.25ZM9.20453 17.25C8.69792 17.25 8.36362 16.8732 8.36362 16.5H6.86362C6.86362 17.7836 7.95387 18.75 9.20453 18.75V17.25ZM11.6364 16.5C11.6364 16.8732 11.3021 17.25 10.7954 17.25V18.75C12.0461 18.75 13.1364 17.7836 13.1364 16.5H11.6364ZM10.7954 3.75C11.3021 3.75 11.6364 4.12675 11.6364 4.5H13.1364C13.1364 3.21639 12.0461 2.25 10.7954 2.25V3.75ZM9.20453 2.25C7.95387 2.25 6.86362 3.21639 6.86362 4.5H8.36362C8.36362 4.12675 8.69792 3.75 9.20453 3.75V2.25ZM16.647 13.2088L15.8515 14.5079L17.1307 15.2912L17.9262 13.9921L16.647 13.2088ZM3.35301 7.79117L4.14847 6.49214L2.86925 5.70881L2.07379 7.00785L3.35301 7.79117ZM4.14847 6.49214C4.36924 6.13159 4.8963 5.97761 5.32351 6.21016L6.04067 4.89271C4.94603 4.29684 3.52711 4.63448 2.86925 5.70881L4.14847 6.49214ZM3.6543 8.78983C3.25049 8.57001 3.14947 8.12357 3.35301 7.79117L2.07379 7.00785C1.39869 8.11034 1.81909 9.49866 2.93713 10.1073L3.6543 8.78983ZM15.8515 14.5079C15.6307 14.8684 15.1037 15.0224 14.6765 14.7898L13.9593 16.1073C15.054 16.7032 16.4729 16.3655 17.1307 15.2912L15.8515 14.5079ZM17.9262 13.9921C18.6013 12.8897 18.1809 11.5013 17.0628 10.8927L16.3457 12.2102C16.7495 12.43 16.8505 12.8764 16.647 13.2088L17.9262 13.9921ZM4.14847 14.5079L3.35301 13.2088L2.07379 13.9921L2.86925 15.2912L4.14847 14.5079ZM15.8515 6.49215L16.647 7.79119L17.9262 7.00786L17.1307 5.70883L15.8515 6.49215ZM16.647 7.79119C16.8505 8.12358 16.7495 8.57002 16.3457 8.78984L17.0628 10.1073C18.1809 9.49867 18.6013 8.11035 17.9262 7.00786L16.647 7.79119ZM14.6765 6.21017C15.1037 5.97762 15.6307 6.13161 15.8515 6.49215L17.1307 5.70882C16.4729 4.63449 15.054 4.29685 13.9593 4.89272L14.6765 6.21017ZM3.35301 13.2088C3.14947 12.8764 3.25049 12.43 3.6543 12.2102L2.93713 10.8927C1.81909 11.5013 1.39869 12.8897 2.07379 13.9921L3.35301 13.2088ZM2.86925 15.2912C3.52711 16.3655 4.94603 16.7032 6.04067 16.1073L5.32351 14.7898C4.8963 15.0224 4.36924 14.8684 4.14847 14.5079L2.86925 15.2912ZM14.5919 6.25621L14.6765 6.21017L13.9593 4.89272L13.8748 4.93876L14.5919 6.25621ZM5.32351 6.21016L5.40808 6.2562L6.12524 4.93875L6.04067 4.89271L5.32351 6.21016ZM14.6765 14.7898L14.5919 14.7438L13.8748 16.0612L13.9593 16.1073L14.6765 14.7898ZM5.40808 14.7438L5.32351 14.7898L6.04067 16.1073L6.12524 16.0613L5.40808 14.7438ZM2.93713 10.1073C3.24828 10.2766 3.24828 10.7233 2.93713 10.8927L3.6543 12.2102C5.00922 11.4726 5.00923 9.52739 3.6543 8.78983L2.93713 10.1073ZM6.12524 16.0613C6.45811 15.88 6.86362 16.121 6.86362 16.5H8.36362C8.36362 14.983 6.74048 14.0185 5.40808 14.7438L6.12524 16.0613ZM13.1364 16.5C13.1364 16.121 13.5419 15.88 13.8748 16.0612L14.5919 14.7438C13.2595 14.0185 11.6364 14.983 11.6364 16.5H13.1364ZM17.0628 10.8927C16.7517 10.7233 16.7517 10.2767 17.0628 10.1073L16.3457 8.78984C14.9908 9.5274 14.9908 11.4726 16.3457 12.2102L17.0628 10.8927ZM5.40808 6.2562C6.74048 6.9815 8.36362 6.01702 8.36362 4.5H6.86362C6.86362 4.879 6.45811 5.11995 6.12524 4.93875L5.40808 6.2562ZM13.8748 4.93876C13.5419 5.11996 13.1364 4.879 13.1364 4.5H11.6364C11.6364 6.01703 13.2595 6.98151 14.5919 6.25621L13.8748 4.93876ZM11.75 10.5C11.75 11.4665 10.9665 12.25 10 12.25V13.75C11.7949 13.75 13.25 12.2949 13.25 10.5H11.75ZM10 12.25C9.0335 12.25 8.25 11.4665 8.25 10.5H6.75C6.75 12.2949 8.20507 13.75 10 13.75V12.25ZM8.25 10.5C8.25 9.5335 9.0335 8.75 10 8.75V7.25C8.20507 7.25 6.75 8.70507 6.75 10.5H8.25ZM10 8.75C10.9665 8.75 11.75 9.5335 11.75 10.5H13.25C13.25 8.70507 11.7949 7.25 10 7.25V8.75Z"
            fill="#494C53"
          />
        </svg>
      </button>
      <button className="h-7 w-7 flex items-center justify-center hover:bg-grey2 active:bg-grey3 rounded-[4px]">
        <svg
          width="20"
          height="25"
          viewBox="0 0 20 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 13.75C9.61597 13.75 9.08333 13.3242 9.08333 12.5L7.58333 12.5C7.58333 13.8849 8.54308 15.25 10 15.25L10 13.75ZM9.08333 12.5C9.08333 11.6758 9.61597 11.25 10 11.25L10 9.75C8.54308 9.75 7.58333 11.1151 7.58333 12.5L9.08333 12.5ZM10 11.25C10.384 11.25 10.9167 11.6758 10.9167 12.5L12.4167 12.5C12.4167 11.1151 11.4569 9.75 10 9.75L10 11.25ZM10.9167 12.5C10.9167 13.3242 10.384 13.75 10 13.75L10 15.25C11.4569 15.25 12.4167 13.8849 12.4167 12.5L10.9167 12.5ZM16.6667 13.75C16.2826 13.75 15.75 13.3242 15.75 12.5L14.25 12.5C14.25 13.8849 15.2098 15.25 16.6667 15.25L16.6667 13.75ZM15.75 12.5C15.75 11.6758 16.2826 11.25 16.6667 11.25L16.6667 9.75C15.2098 9.75 14.25 11.1151 14.25 12.5L15.75 12.5ZM16.6667 11.25C17.0507 11.25 17.5833 11.6758 17.5833 12.5L19.0833 12.5C19.0833 11.1151 18.1236 9.75 16.6667 9.75L16.6667 11.25ZM17.5833 12.5C17.5833 13.3242 17.0507 13.75 16.6667 13.75L16.6667 15.25C18.1236 15.25 19.0833 13.8849 19.0833 12.5L17.5833 12.5ZM3.33333 13.75C2.9493 13.75 2.41667 13.3242 2.41667 12.5L0.916668 12.5C0.916668 13.8849 1.87642 15.25 3.33333 15.25L3.33333 13.75ZM2.41667 12.5C2.41667 11.6758 2.9493 11.25 3.33333 11.25L3.33333 9.75C1.87642 9.75 0.916668 11.1151 0.916668 12.5L2.41667 12.5ZM3.33333 11.25C3.71737 11.25 4.25 11.6758 4.25 12.5L5.75 12.5C5.75 11.1151 4.79025 9.75 3.33333 9.75L3.33333 11.25ZM4.25 12.5C4.25 13.3242 3.71737 13.75 3.33333 13.75L3.33333 15.25C4.79025 15.25 5.75 13.8849 5.75 12.5L4.25 12.5Z"
            fill="#131313"
          />
        </svg>
      </button>
    </div>
  );
}

function MainContent() {
  var { course } = useAppSelector(selectEditableCourse);

  return (
    <main className="w-full flex flex-col py-2 px-[96px] max-w-[900px]">
      <div className="h-8 w-full"></div>
      <h3 className="-text-h4">Settings</h3>
      <div className="h-4 w-full"></div>
      <div className="h-[1px] w-full bg-grey5 rounded-full"></div>
      <div className="h-4 w-full"></div>
      <div className="flex justify-between gap-2">
        <div className="flex-grow">
          <div>Tags</div>
          <div className="mt-[2px] -text-cap text-grey6">
            Explain your course using tags
          </div>
        </div>

        <div className="hover:bg-grey2 p-1 rounded-md cursor-pointer w-[300px] gap-1 flex flex-wrap h-[70px] overflow-clip">
          {course?.tags.map((tag) => (
            <span
              key={tag}
              className="p-1 rounded-md bg-grey1 text-grey7 text-[14px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

function EditableCoursePage({}) {
  var [isLoading, setIsLoading] = useState(true);
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { course } = useAppSelector(selectEditableCourse);

  useEffect(
    function fetchCourse() {
      if (router.query?.id) {
        dispatch(getCourseThunk(router.query.id as string));
      }
    },
    [router.query, dispatch]
  );

  useEffect(() => {
    if (router.query?.id) setIsLoading(false);
  }, [router.query]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="w-[240px] bg-grey1 h-screen fixed pt-[61px] pb-3">
        Sidebar
      </div>

      <div className="w-full">
        <nav className="ml-[240px] w-[calc(100vw-240px)] h-[45px] flex items-center justify-between px-4 py-[18px] border-b border-b-grey5">
          <CourseNavName />
          <CourseInfoAndActions />
        </nav>

        <div className="ml-[240px] mt-4 flex flex-col justify-center items-center">
          <main className="w-full flex flex-col py-2 px-[96px] max-w-[900px]">
            <Text size="h2" placeholder="Untitled" />
            <div className="w-full h-[6px]"></div>
            <Text size="intro" placeholder="Add a description" />
            <div className="w-full h-8"></div>
            <div>
              <div className="-text-intro mb-1">Settings</div>
              <Divider height={1} />
              <div className="w-full h-3"></div>
              <SettingItem
                title="Tags"
                description="Explain your course using tags"
              >
                <CourseTagsOptionsInput />
              </SettingItem>
              <div className="w-full h-4"></div>
              <SettingItem
                title="Price"
                description="How much to charge students"
              >
                <CoursePriceInput />
              </SettingItem>
              <div className="w-full h-4"></div>
              <SettingItem
                title="Difficulty level"
                description="What is the difficulty level of this course"
              >
                <CourseDifficultyOptionsInput />
              </SettingItem>
              <div className="w-full h-4"></div>
              <SettingItem
                title="Publish"
                description="Publish your course for people to see"
              >
                <PublishCourseInput />
              </SettingItem>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function PublishCourseInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var [active, setActive] = useState(course?.stage == "published" ?? false);
  var dispatch = useAppDispatch();
  useEffect(() => {
    setActive(course?.stage == "published" ?? false);
  }, [course?.stage]);

  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={async () => {
        setActive(!active);
        await dispatch(
          updateCourseInfoThunk({
            courseId: course?.id,
            payload: { stage: !active ? "published" : "draft" },
          })
        );
      }}
    >
      <div
        className={`w-14 h-8 ${
          !active ? "bg-gray-300" : "bg-blue2"
        }  rounded-full flex-shrink-0 p-1`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform ${
            active ? "translate-x-6" : ""
          } duration-300 ease-in-out`}
        ></div>
      </div>
    </div>
  );
}

function SettingItem({ children, title, description }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col flex-grow">
        <div className="-text-body1 text-grey7">{title}</div>
        <div className="-text-cap text-grey6">{description}</div>
      </div>

      <div className="w-[300px]">{children}</div>
    </div>
  );
}

function CoursePriceInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var formik = useFormik({
    initialValues: { price: course?.price },
    onSubmit: async (values) => {
      await dispatch(
        updateCourseInfoThunk({
          courseId: course?.id,
          payload: { price: values.price },
        })
      );
    },
  });

  useEffect(() => {
    formik.setFieldValue("price", course?.price);
  }, [course?.price]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        className="w-full px-3 py-2 border border-grey3 rounded-md text-grey8"
        name="price"
        type="number"
        placeholder="₹0"
        autoComplete="off"
        value={formik.values.price}
        onChange={formik.handleChange}
        min={0}
      />
    </form>
  );
}

function CourseTagsOptionsInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var wrapperRef = useRef(null);
  var [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsOpen(true)}
      className="relative w-[300px] p-1 rounded-md min-h-[44px] bg-grey0 cursor-pointer hover:bg-grey1 active:bg-grey2 flex flex-wrap gap-1"
    >
      {(course?.tags ?? [])
        .map((t) => ({
          value: t,
          id: nanoid(),
        }))
        .map((t) => (
          <span
            key={t.id}
            className="h-7 w-max rounded-[4px] flex-shrink px-[6px] py-1 flex items-center bg-grey2 min-w-0"
          >
            <div className="flex-shrink text-[14px] text-grey7 whitespace-nowrap overflow-hidden text-ellipsis">
              {t.value}
            </div>
          </span>
        ))}

      {isOpen && (
        <OptionsInput
          opts={course?.tags ?? []}
          handleAdd={(v) => addTag(v)}
          handleRemove={(v) => removeTag(v)}
          onUnmount={async (values) =>
            await dispatch(
              updateCourseInfoThunk({
                courseId: course?.id,
                payload: { tags: values },
              })
            )
          }
        />
      )}
    </div>
  );
}

function CourseDifficultyOptionsInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var wrapperRef = useRef(null);
  var [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });

  return (
    <div
      ref={wrapperRef}
      className="relative w-[300px] p-1 rounded-md min-h-[44px] flex flex-wrap gap-1"
    >
      {course?.difficulty && (
        <span
          onClick={() => setIsOpen(true)}
          className="flex gap-2 items-center cursor-pointer h-8 rounded-[4px] px-[6px] py-1 bg-grey0 hover:bg-grey2 active:bg-grey3"
        >
          <div className="-text-body1 text-grey7 ">{course?.difficulty}</div>
          <div className="w-6 h-6">
            <ArrowDownIcon className="stroke-grey7" />
          </div>
        </span>
      )}

      {isOpen && (
        <div className="w-[300px] absolute top-0 left-0 shadow-lg rounded-md">
          <div className="flex flex-col max-w-[calc(-24px+100vw)] min-w-[180px] h-full max-h-[70vh">
            <div className="rounded-md flex flex-col flex-wrap p-1 gap-1 bg-grey1 flex-shrink-0 max-h-[240px] overflow-x-hidden overflow-y-auto">
              {["beginner", "intermediate", "advanced"].map((difficulty) => (
                <div
                  key={difficulty}
                  onClick={async () => {
                    if (course?.difficulty != difficulty) {
                      await dispatch(
                        updateCourseInfoThunk({
                          courseId: course?.id,
                          payload: { difficulty } as any,
                        })
                      );
                    }
                    setIsOpen(false);
                  }}
                  className={`${
                    course?.difficulty == difficulty ? "bg-grey2" : ""
                  } cursor-pointer active:bg-grey3 rounded-[4px] flex-shrink px-[6px] py-1 flex items-center hover:bg-grey2 min-w-0`}
                >
                  <div
                    className={` flex-shrink -text-body2 text-grey7 whitespace-nowrap overflow-hidden text-ellipsis`}
                  >
                    {difficulty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditableCoursePage;
