// import React, { useState } from "react";
// import ModalWrapper from "../ModalWrapper";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import { useForm } from "react-hook-form";
// import UserList from "./UserList";
// import SelectList from "../SelectList";
// import { BiImages } from "react-icons/bi";
// import Button from "../Button";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../../utils/firebase";
// import {
//   useCreateTaskMutation,
//   useGetAllTaskQuery,
//   useUpdateTaskMutation,
// } from "../../redux/slices/api/taskApiSlice";
// import { toast } from "sonner";
// import { dateFormatter } from "../../utils";
// import Loading from "../Loader";

// const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
// const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// const uploadedFileURLs = [];

// const AddTask = ({ open, setOpen, task }) => {
//   let defaultValues = {
//     title: task?.title || "",
//     date: dateFormatter(task?.date || new Date()),
//     team: [],
//     stage: "",
//     priority: "",
//     assets: [],
//   };

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({ defaultValues });
//   const [team, setTeam] = useState(task?.team || []);
//   const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
//   const [priority, setPriority] = useState(
//     task?.priority?.toUpperCase() || PRIORIRY[2]
//   );
//   // const [assets, setAssets] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const [createTask, { isLoading }] = useCreateTaskMutation();
//   const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
//   const URLS = task?.assets?.url ? [...task.assets] : [];

//   // const submitHandler = async (data) => {
//   //   // for (const file of assets) {
//   //   //   setUploading(true);
//   //   //   try {
//   //   //     // await uploadFile(file);
//   //   //   } catch (error) {
//   //   //     console.log("Error uploading file", error.message);
//   //   //     return;
//   //   //   } finally {
//   //   //     setUploading(false);
//   //   //   }
//   //   // }

//   //   if(data?.images && data?.images.length > 0) {

//   //   }

//   //   try {
//   //     const newData = {
//   //       ...data,
//   //       // missing assests here
//   //       team,
//   //       stage,
//   //       priority,
//   //     };

//   //     const res = task?._id
//   //       ? await updateTask({ ...newData, _id: task._id }).unwrap()
//   //       : await createTask(newData).unwrap();

//   //     toast.success(res.message);

//   //     setTimeout(() => {
//   //       setOpen(false);
//   //       window.location.reload();
//   //     }, 500);
//   //   } catch (err) {
//   //     console.log(err);
//   //     toast.error(err.data?.message || err.error);
//   //   }
//   // };
//   console.log(task);

//   const submitHandler = async (data) => {
//     const formData = new FormData();
//     console.log(JSON.stringify(data));
//     formData.append("title", data.title);
//     formData.append("date", data.date);
//     formData.append("stage", stage);
//     formData.append("priority", priority);
//     team.forEach((member, i) => formData.append(`team[${i}]`, member._id));
//     // if (URLS.length) {
//     //   URLS.forEach((member, i) =>
//     //     formData.append(`assets[${i}]`, JSON.stringify(member))
//     //   );
//     // }

//     if (data?.images && data?.images.length > 0) {
//       for (let i = 0; i < data.images.length; i++) {
//         formData.append("images", data.images[i]);
//       }
//     }

//     try {
//       setUploading(true);
//       const res = task?._id
//         ? await updateTask({
//             id: task._id,
//             data: formData,
//           }).unwrap()
//         : await createTask(formData).unwrap();

//       setUploading(false);
//       toast.success(res.message);

//       setTimeout(() => {
//         setOpen(false);
//         // defaultValues = {
//         //   title: task?.title || "",
//         //   date: dateFormatter(task?.date || new Date()),
//         //   team: [],
//         //   stage: "",
//         //   priority: "",
//         //   assets: [],
//         // };
//         // reset();
//         window.location.reload();
//       }, 500);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.data?.message || err.error || "Upload failed");
//     }
//   };

//   const handleSelect = (e) => {
//     setAssets(e.target.files);
//   };

//   // const uploadFile = async (file) => {
//   //   const storage = getStorage();

//   //   const name = new Date().getTime() + file.name;
//   //   const storageRef = ref(storage, name);
//   //   const uploadTask = uploadBytesResumable(storageRef, file);

//   //   return new Promise((resolve, reject) => {
//   //     uploadTask.on(
//   //       "state.changed",
//   //       (snapshot) => {
//   //         console.log("Uploading");
//   //       },
//   //       (error) => {
//   //         reject(error);
//   //       },
//   //       () => {
//   //         getDownloadURL(uploadTask.snapshot.ref)
//   //           .then((downloadURL) => {
//   //             uploadedFileURLs.push(downloadURL);
//   //             resolve();
//   //           })
//   //           .catch((error) => {
//   //             reject(error);
//   //           });
//   //       }
//   //     );
//   //   });
//   // };

//   const uploadFile = () => {};

//   return (
//     <>
//       <ModalWrapper open={open} setOpen={setOpen}>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <Dialog.Title
//             as="h2"
//             className="text-base font-bold leading-6 text-gray-900 mb-4"
//           >
//             {task ? "UPDATE TASK" : "ADD TASK"}
//           </Dialog.Title>

//           <div className="mt-2 flex flex-col gap-6">
//             <Textbox
//               placeholder="Task Title"
//               type="text"
//               name="title"
//               label="Task Title"
//               className="w-full rounded"
//               register={register("title", { required: "Title is required" })}
//               error={errors.title ? errors.title.message : ""}
//             />

//             <UserList setTeam={setTeam} team={team} />

//             <div className="flex gap-4">
//               <SelectList
//                 label="Task Stage"
//                 lists={LISTS}
//                 selected={stage}
//                 setSelected={setStage}
//               />

//               <div className="w-full">
//                 <Textbox
//                   placeholder="Date"
//                   type="date"
//                   name="date"
//                   label="Task Date"
//                   className="w-full rounded"
//                   register={register("date", {
//                     required: "Date is required!",
//                   })}
//                   error={errors.date ? errors.date.message : ""}
//                 />
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <SelectList
//                 label="Priority Level"
//                 lists={PRIORIRY}
//                 selected={priority}
//                 setSelected={setPriority}
//               />

//               <div className="w-full flex items-center justify-center mt-4">
//                 <div>count: {task?.assets.length}</div>
//                 <label
//                   className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
//                   htmlFor="imgUpload"
//                 >
//                   <input
//                     type="file"
//                     className="hidden"
//                     id="imgUpload"
//                     // onChange={(e) => handleSelect(e)}
//                     {...register("images")}
//                     accept=".jpg, .png, .jpeg"
//                     multiple={true}
//                   />
//                   {/* <input
//                     type="file"
//                     className="hidden"
//                     id="imgUpload"
//                     onChange={(e) => handleSelect(e)}
//                     accept=".jpg, .png, .jpeg"
//                     multiple={true}
//                   /> */}
//                   <BiImages />
//                   <span>Add Assets</span>
//                 </label>
//               </div>
//             </div>

//             <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//               {uploading ? (
//                 <span className="text-sm py-2">
//                   <Loading />
//                 </span>
//               ) : (
//                 <Button
//                   label="Submit"
//                   type="submit"
//                   className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
//                 />
//               )}

//               <Button
//                 type="button"
//                 className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
//                 onClick={() => setOpen(false)}
//                 label="Cancel"
//               />
//             </div>
//           </div>
//         </form>
//       </ModalWrapper>
//     </>
//   );
// };

// export default AddTask;

// ✅ Enhanced AddTask.jsx

import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import {
  useCreateTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import { dateFormatter } from "../../utils";
import Loading from "../Loader";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );
  const [uploading, setUploading] = useState(false);

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const submitHandler = async (data) => {
    const formData = new FormData();

    // Form values
    formData.append("title", data.title);
    formData.append("date", data.date);
    formData.append("stage", stage);
    formData.append("priority", priority);

    // Team Members
    team.forEach((member, i) => {
      formData.append(`team[${i}]`, member);
    });

    // New Images
    if (data?.images?.length) {
      [...data.images].forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      setUploading(true);
      const response = task?._id
        ? await updateTask({ id: task._id, data: formData }).unwrap()
        : await createTask(formData).unwrap();

      toast.success(response.message);
      if (!task?._id) reset();

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  // console.log(team);

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <UserList setTeam={setTeam} team={team} />

          <div className="flex gap-4">
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", { required: "Date is required" })}
              error={errors.date?.message}
            />
          </div>

          <div className="flex gap-4">
            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />
            <div className="w-full flex flex-col items-start mt-2">
              <div className="mb-2">
                Existing Assets: {task?.assets?.length || 0}
              </div>
              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"
                  {...register("images")}
                  accept=".jpg,.jpeg,.png"
                  multiple
                />
                <BiImages />
                <span>Add Assets</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            {uploading ? (
              <Loading />
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
              />
            )}
            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
